import { Droppable } from 'react-beautiful-dnd';

import { Flex, Text } from '@chakra-ui/react';

import Data, { Column, Task } from '../types';

import AddTask from './AddTask';
import TaskUI from './Task';

function ColumnUI({
  column,
  tasks,
  state,
  setState,
}: {
  column: Column;
  tasks: Task[];
  state: Data;
  setState: (value: Data) => void;
}) {
  return (
    <Flex rounded="3px" bg="column-bg" w="300px" h="620px" flexDir="column">
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

      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <Flex
            px="1.5rem"
            flex={1}
            flexDir="column"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskUI task={task} key={task.id} index={index} />
            ))}
            <AddTask columnId={column.id} state={state} setState={setState} />
          </Flex>
        )}
      </Droppable>
    </Flex>
  );
}

export default ColumnUI;
