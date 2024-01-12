import axios from 'axios';

import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';

import { LoginData } from '../types';
import reorderColumnList from '../utils/reorder';

import { RootState } from './store';

let initData: LoginData = {
  status: '',
  id: 0,
  userName: '',
  board_data: [
    {
      tasks: {},
      columns: {},
      columnOrder: [],
    },
  ],
};

if (import.meta.env.DEV && import.meta.env.VITE_AUTH_TOKEN) {
  initData = {
    status: 'success',
    id: 1,
    userName: 'user1',
    board_data: [
      {
        tasks: {},
        columns: {},
        columnOrder: [],
      },
    ],
  };
}

export const login = createAsyncThunk(
  'board/login',
  async (loginData: { email: string; password: string }) => {
    const data = await axios.post(
      `${import.meta.env.VITE_SERVER}/users/login`,
      loginData
    );
    if (!data.data.board_data) {
      data.data.board_data.push({
        tasks: {},
        columns: {},
        columnOrder: [],
      });
    }
    return data.data;
  }
);

export const signup = createAsyncThunk(
  'board/signup',
  async (signupData: { email: string; password: string; userName: string }) => {
    const data = await axios.post(
      `${import.meta.env.VITE_SERVER}/users/signup`,
      signupData
    );
    data.data.board_data.push({
      tasks: {},
      columns: {},
      columnOrder: [],
    });
    return data.data;
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState: initData,
  reducers: {
    updateColumn: (state, action) => {
      const { source, destination } = action.payload;

      const sourceCol = state.board_data[0].columns[source.droppableId];

      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      // eslint-disable-next-line no-param-reassign
      state.board_data[0].columns[newColumn.id] = newColumn;
    },
    moveTask: (state, action) => {
      const { source, destination } = action.payload;

      const sourceCol = state.board_data[0].columns[source.droppableId];
      const [removed] = sourceCol.taskIds.splice(source.index, 1);

      const destinationCol =
        state.board_data[0].columns[destination.droppableId];
      destinationCol.taskIds.splice(destination.index, 0, removed);
    },
    deleteTask: (
      state,
      action: PayloadAction<{
        curColumnId: string;
        delIndex: number;
        taskId: string;
      }>
    ) => {
      const { curColumnId, delIndex, taskId } = action.payload;

      state.board_data[0].columns[curColumnId].taskIds.splice(delIndex, 1);
      // eslint-disable-next-line no-param-reassign
      delete state.board_data[0].tasks[taskId];
    },
    updateTask: (state, action) => {
      const { taskId, content } = action.payload;

      // eslint-disable-next-line no-param-reassign
      state.board_data[0].tasks[taskId].content = content;
    },
    addColumn: {
      reducer(
        state,
        action: PayloadAction<{ title: string; id: string; taskIds: string[] }>
      ) {
        console.log('payload', action.payload);

        // eslint-disable-next-line no-param-reassign
        state.board_data[0].columns[action.payload.id] = action.payload;
        state.board_data[0].columnOrder.push(action.payload.id);
      },
      prepare(title: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            taskIds: [],
          },
        };
      },
    },
    addTask: (state, action) => {
      const { content, columnId } = action.payload;

      const newTask = {
        id: nanoid(),
        content,
      };
      // eslint-disable-next-line no-param-reassign
      state.board_data[0].tasks[newTask.id] = newTask;
      state.board_data[0].columns[columnId].taskIds.push(newTask.id);
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => action.payload);
    builder.addCase(signup.fulfilled, (state, action) => action.payload);
  },
});

export const {
  deleteTask,
  updateColumn,
  moveTask,
  updateTask,
  addColumn,
  addTask,
} = boardSlice.actions;

export default boardSlice.reducer;

export const boardSelector = (state: RootState) => state.board_data[0];

export const statusSelector = (state: RootState) => state.status;

export const userSelector = (state: RootState) => state.userName;
