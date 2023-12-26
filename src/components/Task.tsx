import { Draggable } from 'react-beautiful-dnd';

import { Flex, Text } from '@chakra-ui/react';

import { Task } from '../types';

export default function TaskUI({ task, index }: { task: Task; index: number }) {
  return (
    <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <Flex
          mb="1rem"
          h="72px"
          bg="card-bg"
          rounded="3px"
          p="1.5rem"
          outline="2px solid"
          outlineColor={
            draggableSnapshot.isDragging ? 'card-border' : 'transparent'
          }
          boxShadow={
            draggableSnapshot.isDragging
              ? '0 5px 10px rgba(0, 0, 0, 0.6)'
              : 'unset'
          }
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
        >
          <Text>{task.content}</Text>
        </Flex>
      )}
    </Draggable>
  );
}
