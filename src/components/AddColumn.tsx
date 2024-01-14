import React, { useState } from 'react';

import { AddIcon } from '@chakra-ui/icons';
import { Button, Input } from '@chakra-ui/react';

import { useAppDispatch } from '../hooks';
import { addColumn } from '../store/boardSlice';
import store from '../store/store';
import saveBoard from '../utils/saveBoard';

function AddColumn() {
  const [showNewColumnButton, setShowNewColumnButton] = useState(true);
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

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
    dispatch(addColumn(value));
    saveBoard(store.getState().board_data[0]);
    setValue('');
  };

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
