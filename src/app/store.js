import { configureStore } from "@reduxjs/toolkit";
import application from "../features/applicationSlice";
import room from "../features/roomSlice";
import file from "../features/fileSlice";

export const store = configureStore({
  reducer: {
    application,
    room,
    file,
  },
});
