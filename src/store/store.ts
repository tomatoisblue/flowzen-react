import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import boardReducer from "../features/boardSlice";
import taskReducer from "../features/taskSlice";


const store: any = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer,
    task: taskReducer,
  }
});

export default store;