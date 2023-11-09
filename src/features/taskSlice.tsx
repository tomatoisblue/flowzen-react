import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { TaskStatus } from "../types/TaskStatus";
import Task from "../types/Task";

// export type GroupedTasks = Map<TaskStatus, Task[]>;

const initialState = {
  tasks: [] as Task[],
  currentTaskID: -1 as number
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addAllTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    removeAllTasks: (state) => {
      state.tasks = []
    },
    setCurrentTaskID: (state, action: PayloadAction<number>) => {
      state.currentTaskID = action.payload;
    }
  }
})

export const { addAllTasks, removeAllTasks, setCurrentTaskID } = taskSlice.actions;

export default taskSlice.reducer;