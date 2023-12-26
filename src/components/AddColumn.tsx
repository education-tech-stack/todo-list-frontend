import React, { useState } from 'react';

import { AddIcon } from '@chakra-ui/icons';
import { Button, Input } from '@chakra-ui/react';
import saveBoard from '../utils/saveBoard';

function AddColumn(props) {
  const [showNewColumnButton, setShowNewColumnButton] = useState(true);
  const [value, setValue] = useState('');

  function handleInputChange(event) {
    setValue(event.target.value);
  }

  function onNewColumnButtonClick() {
    setShowNewColumnButton(false);
  }

  function onNewColumnInputComplete() {
    setShowNewColumnButton(true);
    addNewColumn(value);
    setValue('');
  }

  function addNewColumn(title) {
    const newColumnOrder = Array.from(props.state.columnOrder);
    const newColumnId = 'column-' + Math.floor(Math.random() * 100000);
    newColumnOrder.push(newColumnId);

    const newColumn = {
      id: newColumnId,
      title: title,
      taskIds: [],
    };

    const tempState = {
      ...props.state,
      columnOrder: newColumnOrder,
      columns: {
        ...props.state.columns,
        [newColumnId]: newColumn,
      },
    };
    props.setState(tempState);
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
          onBlur={onNewColumnInputComplete}
        />
      )}
    </div>
  );
}

export default AddColumn;
