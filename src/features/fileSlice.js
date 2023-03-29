import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  currentDir: [],
  modal: false,
};

export const fetchFile = createAsyncThunk(
  "fetch/files",
  async ({ parent, room }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3001/api/files?room=${room}${
          parent ? "&parent=" + parent : ""
        }`,
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
  "add/files",
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

export const uploadFile = createAsyncThunk(
  "files/upload",
  async ({ file, parent, room }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("room", room);
      if (parent) {
        formData.append("parent", parent);
      }
      const response = await fetch("http://localhost:3001/api/files/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        return rejectWithValue(errorMessage.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    modalTrigger(state, action) {
      state.modal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFile.fulfilled, (state, action) => {
        state.currentDir = action.payload.file;
        state.files = action.payload;
      })
      .addCase(addDir.fulfilled, (state, action) => {
        state.files.file.push(action.payload);
        state.currentDir.push(action.payload);
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.files.file.push(action.payload);
        state.currentDir.push(action.payload);
      });
  },
});

export const { modalTrigger } = fileSlice.actions;
export default fileSlice.reducer;
