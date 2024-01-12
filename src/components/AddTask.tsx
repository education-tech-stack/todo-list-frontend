import React, { useState } from 'react';

import { AddIcon } from '@chakra-ui/icons';
import { Button, Flex, Input } from '@chakra-ui/react';

import { useAppDispatch } from '../hooks';
import { addTask } from '../store/boardSlice';
import store from '../store/store';
import saveBoard from '../utils/saveBoard';

function AddTask({ columnId }: { columnId: string }) {
  const [showNewTaskButton, setShowNewTaskButton] = useState(true);
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const onNewTaskButtonClick = () => {
    setShowNewTaskButton(false);
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

    setShowNewTaskButton(true);
    dispatch(addTask({ columnId, content: value }));
    saveBoard(store.getState().board_data[0]);
    setValue('');
  };

  return (
    <div>
      {showNewTaskButton ? (
        <Flex
          mb="1rem"
          h="72px"
          bg="card-bg"
          rounded="3px"
          p="1.5rem"
          outline="2px solid"
          outlineColor={onmouseenter ? 'card-border' : 'transparent'}
        >
          <Button onClick={onNewTaskButtonClick} leftIcon={<AddIcon />}>
            New
          </Button>
        </Flex>
      ) : (
        <Flex
          mb="1rem"
          h="72px"
          bg="card-bg"
          rounded="3px"
          p="1.5rem"
          outline="2px solid"
          outlineColor={onmouseenter ? 'card-border' : 'transparent'}
        >
          <Input
            id="new-task"
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onBlur={onNewTaskInputComplete}
            placeholder="Enter task description"
            autoFocus
          />
        </Flex>
      )}
    </div>
  );
}

export default AddTask;
