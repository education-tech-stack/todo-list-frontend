import React, { useState } from 'react';

import { Button, Flex, Input } from '@chakra-ui/react';

import Data, { Task } from '../types';
import saveBoard from '../utils/saveBoard';

function AddTask({
  columnId,
  state,
  setState,
}: {
  columnId: string;
  state: Data;
  setState: (value: Data) => void;
}) {
  const [showNewTaskButton, setShowNewTaskButton] = useState(true);
  const [value, setValue] = useState('');

  const onNewTaskButtonClick = () => {
    setShowNewTaskButton(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onNewTaskInputComplete = () => {
    setShowNewTaskButton(true);
    addNewTask(columnId, value);
    setValue('');
  };

  function addNewTask(newColumnId: string, content: string) {
    const newTaskId = `task-${Math.floor(Math.random() * 100000)}`;

    const column = state.columns[newColumnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.push(newTaskId);

    const newTask: Task = {
      id: newTaskId,
      content,
    };

    const tempState: Data = {
      ...state,
      tasks: {
        ...state.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...state.columns,
        [newColumnId]: {
          ...state.columns[newColumnId],
          taskIds: newTaskIds,
        },
      },
    };
    setState(tempState);
    saveBoard(tempState);
  }

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
          <Button onClick={onNewTaskButtonClick}>New</Button>
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
            type="text"
            value={value}
            onChange={handleInputChange}
            onBlur={onNewTaskInputComplete}
          />
        </Flex>
      )}
    </div>
  );
}

export default AddTask;
