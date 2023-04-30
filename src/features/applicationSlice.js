import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrl } from "../serverUrl";

const initialState = {
  users: [],
  token: localStorage.getItem("token"),
  userId: localStorage.getItem("id"),
};

export const fetchUsers = createAsyncThunk(
  "fetch/users",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${serverUrl}/api/auth/users`, {
        method: "GET",
      });

      const data = await res.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSignIn = createAsyncThunk(
  "auth/signin",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch(`${serverUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const data = await res.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.user._id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSignUp = createAsyncThunk(
  "auth/signUp",
  async ({ login, password, name, email, avatar }, thunkAPI) => {
    try {
      const res = await fetch(`${serverUrl}/api/auth/registr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password, name, email, avatar }),
      });
      const json = await res.json();

      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }

      return json;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const changeUser = createAsyncThunk(
  "change/user",
  async ({ id, name, email, login }, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${serverUrl}/api/auth/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ name, email, login }),
      });

      return res.json();
    } catch (error) {}
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(changeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        });
      });
  },
});

export default applicationSlice.reducer;
