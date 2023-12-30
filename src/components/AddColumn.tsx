import React, { useState } from 'react';

import { AddIcon } from '@chakra-ui/icons';
import { Button, Input } from '@chakra-ui/react';

import Data, { Column } from '../types';
import saveBoard from '../utils/saveBoard';

function AddColumn({
  state,
  setState,
}: {
  state: Data;
  setState: (value: Data) => void;
}) {
  const [showNewColumnButton, setShowNewColumnButton] = useState(true);
  const [value, setValue] = useState('');

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === 'Enter' ||
      event.key === 'Tab' ||
      event.key === 'Escape'
    ) {
      onNewColumnInputComplete();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onNewColumnButtonClick = () => {
    setShowNewColumnButton(false);
  };

  const onNewColumnInputComplete = () => {
    if (!value) return;

    setShowNewColumnButton(true);
    addNewColumn(value);
    setValue('');
  };

  function addNewColumn(title: string) {
    const newColumnOrder = Array.from(state.columnOrder);
    const newColumnId = `column-${Math.floor(Math.random() * 100000)}`;
    newColumnOrder.push(newColumnId);

    const newColumn: Column = {
      id: newColumnId,
      title,
      taskIds: [],
    };

    const tempState: Data = {
      ...state,
      columnOrder: newColumnOrder,
      columns: {
        ...state.columns,
        [newColumnId]: newColumn,
      },
    };
    setState(tempState);
    saveBoard(tempState);
  }

  return (
    <div>
      {showNewColumnButton ? (
        <Button
          onClick={onNewColumnButtonClick}
          size="lg"
          leftIcon={<AddIcon />}
        >
          {' '}
          Add New Column
        </Button>
      ) : (
        <Input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={onNewColumnInputComplete}
          autoFocus
          placeholder="Enter column title..."
        />
      )}
    </div>
  );
}

export default AddColumn;
