import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Task from "../types/Task";
import sortTasksByUpdatedOn from "../components/sortTasksByUpdatedOn";
import getAllTasksByBoardID from "../components/getAllTasksByBoardID";


export type TaskFormMode = "create" | "edit";

interface TaskSliceState {
  tasks: Task[]
  currentTaskID: number
  currentTask: Task | null
  isTaskCreateFormOpen: boolean
  isTaskEditFormOpen: boolean
  taskFormMode: TaskFormMode
}

const initialState: TaskSliceState = {
  tasks: [],
  currentTaskID: -1,
  currentTask: null,
  isTaskCreateFormOpen: false,
  isTaskEditFormOpen: false,
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
    setCurrentTask: (state, action: PayloadAction<Task>) => {
      console.log("setCurrentTask ... ")
      state.currentTask = action.payload;
      console.log(JSON.stringify(state.currentTask));
    },
    clearCurrentTask: (state) => {
      state.currentTaskID = -1;
      state.currentTask = null;

      console.log("##########clearCurrentTask...")
      console.log("currentTask...")
      console.log(JSON.stringify(state.currentTask))
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasksByBoardID.fulfilled, (state, action) => {
      state.tasks = action.payload;
    })
  }
})

export const {  addAllTasks,
                removeAllTasks,
                setCurrentTaskID,
                setCurrentTask,
                clearCurrentTask,
                toggleTaskCreateFormOpen,
                toggleTaskEditFormOpen,
                changeToCreateMode,
                changeToEditMode, } = taskSlice.actions;

export default taskSlice.reducer;

export const fetchAllTasksByBoardID = createAsyncThunk<Task[], number>(
  "task/fetchByBoadID",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async(boardID: number) => {
    if (boardID < 0) {
      return [];
    }
    try {
      const response = await getAllTasksByBoardID(boardID);
      return response;
    } catch (error) {
      return [];
    }
  }
)