import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { redirect } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';

import AddColumn from '../components/AddColumn';
import ColumnUI from '../components/Column';
import Navbar from '../components/Navbar';
import { useAppDispatch, useAppSelector } from '../hooks';
import { boardSelector, moveTask, updateColumn } from '../store/boardSlice';
import store from '../store/store';
import { Column } from '../types';
import saveBoard from '../utils/saveBoard';

export async function BoardLoader() {
  const { status } = store.getState();

  if (status || (import.meta.env.DEV && import.meta.env.VITE_AUTH_TOKEN)) {
    return status;
  }
  return redirect('/login');
}

function BoardScreen(): JSX.Element {
  const board = useAppSelector(boardSelector);
  const dispatch = useAppDispatch();

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
    if (source.droppableId === destination.droppableId) {
      dispatch(updateColumn({ source, destination }));
      saveBoard(store.getState().board_data[0]);
      return;
    }

    // If the user moves from one column to another
    dispatch(moveTask({ source, destination }));
    saveBoard(store.getState().board_data[0]);
  };

  function renderColumn(columnId: string) {
    const column: Column = board.columns[columnId];
    const tasks = column.taskIds.map((taskId) => board.tasks[taskId]);

    return (
      <ColumnUI key={column.id} column={column} tasks={tasks} state={board} />
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
            {board.columnOrder.map(renderColumn)}
            <AddColumn />
          </Flex>
        </Flex>
      </DragDropContext>
    </>
  );
}

export default BoardScreen;
