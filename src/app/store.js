import { configureStore } from "@reduxjs/toolkit";
import application from  '../features/applicationSlice'
import room from "../features/roomSlice"

export const store = configureStore({
    reducer:{
        application,
        room
    }
})