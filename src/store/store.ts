import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import boardReducer from "../features/boardSlice";
import taskReducer from "../features/taskSlice";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";


const store: ToolkitStore = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer,
    task: taskReducer,
  }
});

export default store;