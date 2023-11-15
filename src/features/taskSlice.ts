import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Task from "../types/Task";
import sortTasksByUpdatedOn from "../components/sortTasksByUpdatedOn";
import getAllTasksByBoardID from "../components/getAllTasksByBoardID";


export type TaskFormMode = "create" | "edit";

export interface TaskFormValidation {
  title: boolean
  status: boolean
  description: boolean
  expirationDate: boolean
  url: boolean
}

interface TaskSliceState {
  tasks: Task[]
  currentTaskID: number
  currentTask: Task | null
  taskFormValidations: TaskFormValidation
  taskFormValidationErrors: TaskValidationError
}

export interface TaskValidationError {
  title?: string
  status?: string
  description?: string
  expirationDate?: string
  url?: string
}


// initial values
export const initialTaskFormValidations: TaskFormValidation = {
  title: false,
  status: false,
  description: false,
  expirationDate: false,
  url: false
}

export const initialTaskFormValidationErrors: TaskValidationError = {
}

const initialState: TaskSliceState = {
  tasks: [],
  currentTaskID: -1,
  currentTask: null,
  taskFormValidations: initialTaskFormValidations,
  taskFormValidationErrors: initialTaskFormValidationErrors
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
    },
    setTaskFormValidations: (state, action: PayloadAction<TaskFormValidation>) => {
      state.taskFormValidations = action.payload;
    },
    setTaskFormValidationErrors: (state, action: PayloadAction<TaskValidationError>) => {
      state.taskFormValidationErrors = action.payload;
      console.log("taskFormValidationErrors changed to")
      console.log(JSON.stringify(state.taskFormValidationErrors))
    },
    unsetTaskFormValidationErrors: (state, action: PayloadAction<keyof TaskValidationError>) => {
      delete state.taskFormValidationErrors[action.payload];
      console.log("taskFormValidationErrors changed to")
      console.log(JSON.stringify(state.taskFormValidationErrors))
    },
    clearTaskFormValidationErrors: (state) => {
      state.taskFormValidationErrors = initialTaskFormValidationErrors;
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
                setTaskFormValidations,
                setTaskFormValidationErrors,
                unsetTaskFormValidationErrors,
                clearTaskFormValidationErrors } = taskSlice.actions;

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