type Data = {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
};

export default Data;

export type Task = {
  id: number;
  content: string;
  order: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  columnId: number;
};

export type Column = {
  id: string;
  title: string;
  order: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  userId: number | null;
  taskIds: number[];
};
