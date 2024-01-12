import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Flex, Input, Text, useColorModeValue } from '@chakra-ui/react';

import { useAppDispatch } from '../hooks';
import { deleteTask, updateTask } from '../store/boardSlice';
import store from '../store/store';
import { Task } from '../types';
import saveBoard from '../utils/saveBoard';

export default function TaskUI({
  task,
  index,
  columnId,
}: {
  task: Task;
  index: number;
  columnId: string;
}) {
  const outlineColor = useColorModeValue('black', 'white');
  const [toEdit, setToEdit] = useState(false);
  const [value, setValue] = useState(task.content);
  const dispatch = useAppDispatch();

  const onTaskDeleteButtonClick = () => {
    dispatch(
      deleteTask({
        curColumnId: columnId,
        delIndex: index,
        taskId: task.id,
      })
    );
    saveBoard(store.getState().board_data[0]);
  };

  const onEditTaskButtonClick = () => {
    setToEdit(true);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === 'Enter' ||
      event.key === 'Tab' ||
      event.key === 'Escape'
    ) {
      onNewTaskInputComplete();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onNewTaskInputComplete = () => {
    if (!value) return;

    setToEdit(false);
    dispatch(updateTask({ taskId: task.id, content: value }));
    saveBoard(store.getState().board_data[0]);
    setValue('');
  };

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
          justify="space-between"
          align="center"
          role="group"
          data-group
          outlineColor={
            draggableSnapshot.isDragging ? 'card-border' : 'transparent'
          }
          _hover={{ outlineColor, boxShadow: '0 5px 10px rgba(0, 0, 0, 0.6)' }}
          boxShadow={
            draggableSnapshot.isDragging || onmouseenter
              ? '0 5px 10px rgba(0, 0, 0, 0.6)'
              : 'unset'
          }
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
        >
          {toEdit ? (
            <Input
              id="edit-task"
              type="text"
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onBlur={onNewTaskInputComplete}
              placeholder="Enter task description"
              autoFocus
            />
          ) : (
            <>
              <Text overflow="hidden" noOfLines={1}>
                {task.content}
              </Text>
              <Flex gap="0.5rem">
                <Button
                  display="none"
                  _groupHover={{ display: 'block' }}
                  size="sm"
                  onClick={onEditTaskButtonClick}
                  bgColor="blackAlpha.700"
                >
                  <EditIcon color="yellow" _dark={{ color: 'yellow.400' }} />
                </Button>
                <Button
                  _groupHover={{ display: 'block' }}
                  display="none"
                  size="sm"
                  onClick={onTaskDeleteButtonClick}
                  bgColor="blackAlpha.700"
                >
                  <DeleteIcon color="red" _dark={{ color: 'red' }} />
                </Button>
              </Flex>
            </>
          )}
        </Flex>
      )}
    </Draggable>
  );
}
