import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: [],
  loader: false,
};

export const fetchRoom = createAsyncThunk("fetch/room", async (_, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:3001/room`);
    const room = await res.json();
    return room;
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

export const createRoom = createAsyncThunk(
  "create/room",
  async ({ id, name }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3001/room/create/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, users: id }),
      });
      const room = await res.json();
      return room;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "delete/room",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3001/room/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const room = await res.json();
      return room;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const addUserRoom = createAsyncThunk(
  "addUser/room",
  async ({ id, userID }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3001/room/delete/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ users: userID }),
      });
      const room = await res.json();
      return userID;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //////////FETCH-ROOM///////////
      .addCase(fetchRoom.fulfilled, (state, action) => {
        state.room = action.payload;
        state.loader = false;
      })
      .addCase(fetchRoom.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(fetchRoom.rejected, (state, action) => {
        state.room = action.payload;
        state.loader = false;
      })
      //////////DELETE-ROOM///////////
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.room = action.payload;
        state.loader = false;
      })
      .addCase(deleteRoom.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.room = action.payload;
        state.loader = false;
      })
      //////////ADD-USER-ROOM///////////
      .addCase(addUserRoom.fulfilled, (state, action) => {
        state.room.users.push(action.payload);
        state.loader = false;
      })
      .addCase(addUserRoom.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(addUserRoom.rejected, (state, action) => {
        state.room.users.push(action.payload);
        state.loader = false;
      })
      //////////ADD-ROOM///////////
      .addCase(createRoom.fulfilled, (state, action) => {
        state.room.push(action.payload);
        state.loader = false;
      })
      .addCase(createRoom.pending, (state, action) => {
        state.loader = true;
      });
  },
});

export default roomSlice.reducer;
