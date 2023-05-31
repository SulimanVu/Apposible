import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrl } from "../serverUrl";

const initialState = {
  tasks: [],
  tasksInRoom: [],
};

export const createTask = createAsyncThunk(
  "create/tasks",
  async (
    { header, title, room, user, startDate, completionDate, solved },
    thunkAPI
  ) => {
    try {
      const res = await fetch(`${serverUrl}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          header,
          title,
          room,
          user,
          startDate,
          completionDate,
          solved,
        }),
      });

      const data = res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const changeTaskSolved = createAsyncThunk(
  "change/solved/tasks",
  async ({ id, solved }, thunkAPI) => {
    try {
      const res = await fetch(`${serverUrl}/task/solved/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ solved }),
      });

      const data = res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchAllTasks = createAsyncThunk(
  "fetch/all/tasks",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${serverUrl}/task`);
      const data = res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchTasksInRoom = createAsyncThunk(
  "fetch/room/tasks",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`${serverUrl}/task/room/${id}`);

      const data = res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "delete/task",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`${serverUrl}/task/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasksInRoom.push(action.payload);
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(fetchTasksInRoom.fulfilled, (state, action) => {
        state.tasksInRoom = action.payload;
      })
      .addCase(changeTaskSolved.fulfilled, (state, action) => {
        state.tasksInRoom = state.tasksInRoom.map((item) => {
          if (item._id === action.payload._id) {
            return (item.solved = action.payload.solved);
          }
          return item;
        });
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasksInRoom = state.tasksInRoom.filter(
          (item) => item._id !== action.payload._id
        );
      }),
});

export default taskSlice.reducer;
