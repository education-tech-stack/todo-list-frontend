export type Data = {
  tasks: Record<number, { id: number; content: string }>;
  columns: Record<string, columnRecord>;
  columnOrder: string[];
};

export type columnRecord = { id: string; title: string; taskIds: number[] };

export type Task = {
  id: number;
  content: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  columnId: number;
};

export type Column = {
  id: number;
  title: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number | null;
  tasks: Task[];
};

export type Board = Column[];
