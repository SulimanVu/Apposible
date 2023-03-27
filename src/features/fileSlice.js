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
  "upload/files",
  async ({ file, parent, room }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);

      if (parent) {
        formData.append("parent", parent);
      }

      const res = await fetch(
        `http://localhost:3001/api/files/upload?room=${room}${
          parent ? "&parent=" + parent : ""
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: formData,
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader("content-length") ||
                progressEvent.target.getResponseHeader(
                  "x-decompressed-content-length"
                );
            if (totalLength) {
              let progress = Math.round(
                (progressEvent.loaded * 100) / totalLength
              );
              console.log(progress);
            }
          },
        }
      );

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
  reducers: {
    modalTrigger(state) {
      state.modal = true;
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
        console.log(action.payload);
        state.files.file.push(action.payload);
        state.currentDir.push(action.payload);
      });
  },
});

export const { modalTrigger } = fileSlice.actions;
export default fileSlice.reducer;
