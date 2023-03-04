import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  currentDir: null,
};

export const fetchFile = createAsyncThunk(
  "fetch/files",
  async ({ dirId, room }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3001/api/files?room=${room}
            ${dirId ? "&parent=" + dirId : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const file = await res.json();
      return { file, room };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addDir = createAsyncThunk(
  "add/dir",
  async ({ name, type, parent, room }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/api/files`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ name, type, parent, room }),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFile.fulfilled, (state, action) => {
        state.currentDir = action.payload.file.find(
          (item) => item.room === action.payload.room
        );
        state.files = action.payload;
      })
      .addCase(addDir.fulfilled, (state, action) => {});
  },
});

export default fileSlice.reducer;
