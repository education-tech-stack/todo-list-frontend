import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { Box, Flex, Heading } from '@chakra-ui/react';

import { Board, Column } from '../types';
import reorderColumnList from '../utils/reorder';

import ColumnUI from './Column';
import ThemeToggleButton from './ThemeToggleButton';

export default function BoardUI({ data }: { data: Board }) {
  const [state, setState] = useState(data);

  const onDragEnd = (result: DropResult) => {
    const tempState = reorderColumnList(
      state,
      result.destination,
      result.source
    );
    if (tempState) setState(tempState);
  };

  function renderColumn(column: Column) {
    return <ColumnUI key={column.id} column={column} tasks={column.tasks} />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex
        flexDir="column"
        bg="main-bg"
        minH="100vh"
        w="full"
        color="white-text"
        pb="2rem"
      >
        <Flex py="4rem" flexDir="column" align="center">
          <Heading fontSize="3xl" fontWeight={600}>
            Task Board
          </Heading>
        </Flex>

        <Flex justify="space-between" px="4rem">
          {state.map(renderColumn)}
        </Flex>
      </Flex>
      <Box>
        <ThemeToggleButton pos="fixed" top="2" right="2" />
      </Box>
    </DragDropContext>
  );
}
