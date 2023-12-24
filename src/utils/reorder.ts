import { DropResult } from 'react-beautiful-dnd';

import { Board } from '../types';

export default function reorderColumnList(
  state: Board,
  destination: DropResult['destination'],
  source: DropResult['source']
): Board | undefined {
  // source.droppableId & destination.droppableId is the id of the column
  // source.index & destination.index is the index of the task
  console.log(destination, source);

  // If user tries to drop in an unknown destination
  if (!destination) return;

  // if the user drags and drops back in the same position
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  // If the user drops within the same column but in a different position
  let tempState = Array.from(state);

  const sourceColumn = tempState.find(
    (col) => parseInt(source.droppableId, 10) === col.order
  );
  const destinationColumn = tempState.find(
    (col) => parseInt(destination.droppableId, 10) === col.order
  );

  if (!sourceColumn || !destinationColumn) return;

  const sourceTask = sourceColumn.tasks[source.index];
  const destinationTask = destinationColumn.tasks[destination.index];

  if (sourceColumn.id === destinationColumn.id) {
    sourceTask.order = destination.index;
    destinationTask.order = source.index;

    sourceColumn.tasks.sort((a, b) => a.order - b.order);
    return tempState;
  }

  // If the user moves from one column to another
  // Remove the task from the source column
  sourceColumn.tasks = sourceColumn.tasks.filter(
    (task) => task.order !== source.index
  );

  // Update the order of the task
  sourceTask.order = destination.index;

  // Insert the task into the destination column at the specified index
  destinationColumn.tasks.splice(destination.index, 0, sourceTask);

  destinationColumn.tasks = destinationColumn.tasks.map((task, index) => {
    if (index > destination.index) {
      return { ...task, order: task.order + 1 };
    }
    return task;
  });

  // Update the state
  tempState = tempState.map((column) => {
    if (column.id === sourceColumn.id) {
      return { ...column, tasks: sourceColumn.tasks };
    }
    if (column.id === destinationColumn.id) {
      return { ...column, tasks: destinationColumn.tasks };
    }
    return column;
  });

  return tempState;
}
