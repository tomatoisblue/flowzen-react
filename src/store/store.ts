import { AnyAction, ThunkAction, ThunkDispatch, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import boardReducer from "../features/boardSlice";
import taskReducer from "../features/taskSlice";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";


const store: ToolkitStore = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunkDispatch = ThunkDispatch<RootState, undefined, AnyAction>;


export default store;