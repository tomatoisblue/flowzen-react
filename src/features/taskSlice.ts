import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Task from "../types/Task";
import sortTasksByUpdatedOn from "../components/sortTasksByUpdatedOn";


export type TaskFormMode = "create" | "edit";

const initialState = {
  tasks: [] as Task[],
  currentTaskID: -1 as number,
  currentTask: null as Task | null,
  isTaskCreateFormOpen: false as boolean,
  isTaskEditFormOpen: false as boolean,
  taskFormMode: "create",
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addAllTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = sortTasksByUpdatedOn(action.payload);
    },
    removeAllTasks: (state) => {
      state.tasks = []
    },
    setCurrentTaskID: (state, action: PayloadAction<number>) => {
      console.log("setCurrentTaskID => " + action.payload);
      state.currentTaskID = action.payload;
      state.currentTask = state.tasks.find((task: Task) => task.taskId === state.currentTaskID)!;
    },
    clearCurrentTask: (state) => {
      state.currentTaskID = -1;
      state.currentTask = null;
    },
    toggleTaskCreateFormOpen: (state) => {
      if (state.isTaskCreateFormOpen) {
        console.log("TaskCreateForm will close");
      } else {
        console.log("TaskCreateForm will open");
      }
      state.isTaskEditFormOpen = false;
      state.isTaskCreateFormOpen = !state.isTaskCreateFormOpen;
    },
    toggleTaskEditFormOpen: (state) => {
      if (state.isTaskEditFormOpen) {
        console.log("TaskEditForm will close");
      } else {
        console.log("TaskEditForm will open");
      }
      state.isTaskCreateFormOpen = false;
      state.isTaskEditFormOpen = !state.isTaskEditFormOpen;
    },
    changeToCreateMode: (state) => {
      console.log("FormMode => create")
      state.taskFormMode = "create";
    },
    changeToEditMode: (state) => {
      console.log("FormMode => edit")
      state.taskFormMode = "edit";
    }
  }
})

export const {  addAllTasks,
                removeAllTasks,
                setCurrentTaskID,
                toggleTaskCreateFormOpen,
                toggleTaskEditFormOpen,
                changeToCreateMode,
                changeToEditMode, } = taskSlice.actions;

export default taskSlice.reducer;