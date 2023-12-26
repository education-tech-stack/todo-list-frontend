import React, { useState } from 'react';

import { Button, Flex, Input } from '@chakra-ui/react';

import Data from '../types';

function AddTask(props: {
  columnId: string;
  state: Data;
  setState: (value: Data) => void;
}) {
  const [showNewTaskButton, setShowNewTaskButton] = useState(true);
  const [value, setValue] = useState('');

  function onNewTaskButtonClick() {
    setShowNewTaskButton(false);
  }

  function handleInputChange(event) {
    setValue(event.target.value);
  }

  function onNewTaskInputComplete() {
    setShowNewTaskButton(true);
    addNewTask(props.columnId, value);
    setValue('');
  }

  function addNewTask(columnId, content) {
    const newTaskId = 'task-' + Math.floor(Math.random() * 100000);

    const column = props.state.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.push(newTaskId);

    const newTask = {
      id: newTaskId,
      content: content,
    };

    props.setState({
      ...props.state,
      tasks: {
        ...props.state.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...props.state.columns,
        [columnId]: {
          ...props.state.columns[columnId],
          taskIds: newTaskIds,
        },
      },
    });
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
