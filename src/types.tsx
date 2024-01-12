export type Task = {
  id: string;
  content: string;
};

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

export type Authentication = {
  data: {
    access_token: string;
  };
};

type Data = {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
};

export default Data;

export type LoginData = {
  status: string;
  id: number;
  userName: string;
  board_data: [Data];
};

export type LoginRequest = {
  data: LoginData;
};
