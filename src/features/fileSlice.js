import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  file: '',
  currentDir: [],
  modal: false,
};

export const fetchFile = createAsyncThunk(
  "fetch/files",
  async ({ parent, room }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3001/api/files?room=${room}${parent ? "&parent=" + parent : ""
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

export const getFile = createAsyncThunk(
  "get/file",
  async ({ name }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/api/files/file?name=${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      });

      const data = await res.json();
      return data;
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

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

export const downloadFile = createAsyncThunk(
  "download/file",
  async ({ file, room }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/files/download?room=${room}&id=${file._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        const blob = await res.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteFile = createAsyncThunk(
  "delete/file",
  async ({ file, room }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/files?room=${room}&id=${file._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        const blob = await res.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }

      return room;
    } catch (error) {
      return rejectWithValue(error);
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
      })
      .addCase(getFile.fulfilled, (state, action) => {
        state.file = action.payload.path
      })
      .addCase(addDir.fulfilled, (state, action) => {
        state.currentDir.push(action.payload);
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.currentDir.push(action.payload);
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.currentDir.filter((item) => item._id === action.payload);
      });
  },
});

export const { modalTrigger } = fileSlice.actions;
export default fileSlice.reducer;
