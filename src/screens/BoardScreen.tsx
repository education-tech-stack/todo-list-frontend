import axios from 'axios';
import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { redirect, useLoaderData } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';

import AddColumn from '../components/AddColumn';
import ColumnUI from '../components/Column';
import Navbar from '../components/Navbar';
import Data from '../types';
import reorderColumnList from '../utils/reorder';
import saveBoard from '../utils/saveBoard';

export async function boardLoader() {
  try {
    let data;
    if (import.meta.env.DEV && import.meta.env.VITE_AUTH_TOKEN) {
      data = await axios.get(`${import.meta.env.VITE_SERVER}/todo/board`, {
        headers: {
          authorization: import.meta.env.VITE_AUTH_TOKEN,
        },
      });
    } else {
      data = await axios.get(`${import.meta.env.VITE_SERVER}/todo/board`);
    }
    return data;
  } catch (error) {
    return redirect('/login');
  }
}

function BoardScreen(): JSX.Element {
  const data = useLoaderData() as { data: Data };

  const [state, setState] = useState(data.data);

  const onDragEnd = (result: DropResult) => {
    // console.log('result', result);

    const { destination, source } = result;

    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different positoin
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      saveBoard(newState);
      setState(newState);
      return;
    }

    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    saveBoard(newState);
    setState(newState);
  };

  function renderColumn(columnId: string) {
    const column = state.columns[columnId];
    const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

    return (
      <ColumnUI
        key={column.id}
        column={column}
        tasks={tasks}
        state={state}
        setState={setState}
      />
    );
  }

  return (
    <>
      <Navbar />
      <DragDropContext onDragEnd={onDragEnd}>
        <Flex
          flexDir="column"
          bg="main-bg"
          minH="100vh"
          w="full"
          color="white-text"
          p="1rem"
        >
          <Flex justify="space-between" px="1rem" w="max">
            {state.columnOrder.map(renderColumn)}
            <AddColumn state={state} setState={setState} />
          </Flex>
        </Flex>
      </DragDropContext>
    </>
  );
}

export default BoardScreen;
