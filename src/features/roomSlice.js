import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: [],
  loader: false,
};

export const fetchRoom = createAsyncThunk("fetch/room", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3001/room`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
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
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/room/create/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ name, access: id }),
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
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/room/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const delRoom = await res.json();
      return id;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const addUserRoom = createAsyncThunk(
  "addUser/room",
  async ({ id, user }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/room/addUser/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ user }),
      });
      const addUser = await res.json();
      return user;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser/room",
  async ({ id, user }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/room/deleteUser/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ user }),
      });
      const delUser = await res.json();
      return user;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
//////ОБЯЗАТЕЛЬНО ПЕРЕДЕЛАТЬ ЭТОТ THUNK///////////
export const addComment = createAsyncThunk(
  "addComment/room",
  async ({ id, user, comment, time }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/room/addComment/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ user, comment, time }),
      });
      const addComment = await res.json();
      return { _id: id, user, comment };
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
        state.loader = false;
        console.log("slice rejected");
      })
      //////////DELETE-ROOM///////////
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.room = state.room.filter((item) => item._id !== action.payload);
        state.loader = false;
      })
      .addCase(deleteRoom.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loader = false;
        console.log("slice rejected");
      })
      //////////ADD-USER-ROOM///////////
      .addCase(addUserRoom.fulfilled, (state, action) => {
        state.room.access.push(action.payload);
        state.loader = false;
      })
      .addCase(addUserRoom.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(addUserRoom.rejected, (state, action) => {
        state.loader = false;
        console.log("slice rejected");
      })
      //////////DELETE-USER-ROOM///////////
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.room.access = state.room.access.filter(
          (item) => item !== action.payload
        );
        state.loader = false;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loader = false;
        console.log("slice rejected");
      })
      //////////ADD-ROOM///////////
      .addCase(createRoom.fulfilled, (state, action) => {
        state.room.push(action.payload);
        state.loader = false;
      })
      .addCase(createRoom.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.loader = false;
        console.log("slice rejected");
      })
      //////////ADD-COMMENT///////////
      // .addCase(addComment.fulfilled, (state, action) => {
      //   state.room = state.room.map((item) => {
      //     if (item._id === action.payload._id) {
      //       item.users.push(action.payload);
      //     }
      //     return item;
      //   });
      //   state.loader = false;
      // })
      // .addCase(addComment.pending, (state, action) => {
      //   state.loader = true;
      // })
      // .addCase(addComment.rejected, (state, action) => {
      //   state.loader = false;
      //   console.log("slice rejected");
      // });
  },
});

export default roomSlice.reducer;
