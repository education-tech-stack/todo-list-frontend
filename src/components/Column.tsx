import { Droppable } from 'react-beautiful-dnd';

import { Flex, Text } from '@chakra-ui/react';

import { Column, Task } from '../types';

import TaskUI from './Task';

function ColumnUI({ column, tasks }: { column: Column; tasks: Task[] }) {
  return (
    <Flex rounded="3px" bg="column-bg" w="400px" h="620px" flexDir="column">
      <Flex
        align="center"
        h="60px"
        bg="column-header-bg"
        rounded="3px 3px 0 0"
        px="1.5rem"
        mb="1.5rem"
      >
        <Text fontSize="17px" fontWeight={600} color="subtle-text">
          {column.title}
        </Text>
      </Flex>

      <Droppable droppableId={`${column.order}`}>
        {(droppableProvided) => (
          <Flex
            px="1.5rem"
            flex={1}
            flexDir="column"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskUI key={task.id} task={task} index={index} />
            ))}
          </Flex>
        )}
      </Droppable>
    </Flex>
  );
}

export default ColumnUI;
