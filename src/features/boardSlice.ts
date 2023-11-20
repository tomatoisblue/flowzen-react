import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Board from "../types/Board";
import sortBoards from "../components/sortBoards";
import getAllBoards from "../components/getAllBoards";

export type BoardFormMode = "create" | "edit";

export interface BoardFormValidation {
  title: boolean
}

const initialBoardFormValidations: BoardFormValidation = {
  title: true,
}

interface BoardSlice {
  boards: Board[]
  currentBoardID: number
  currentBoard: Board | null
  boardFormValidations: BoardFormValidation
}

const initialState: BoardSlice = {
  boards: [],
  currentBoardID: -1,
  currentBoard: null,
  boardFormValidations: initialBoardFormValidations,
}


export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<Board>) => {
      state.boards.push(action.payload);
    },
    addAllBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = sortBoards(action.payload);
    },
    deleteAllBoards: (state) => {
      state.boards = [];
    },
    setCurrentBoardID: (state, action: PayloadAction<number>) => {
      state.currentBoardID = action.payload;
      state.currentBoard = state.boards.find((board) => board.boardId === state.currentBoardID)!;
      console.log("currentBoardID : " + state.currentBoardID)
    },
    setCurrentBoard: (state, action: PayloadAction<Board>) => {
      state.currentBoard = action.payload;
    },
    resetCurrentBoard: (state) => {
      state.currentBoardID = -1;
      state.currentBoard = null;
    },
    setTrueBoardFormValidations: (state, action: PayloadAction<keyof BoardFormValidation>) => {
      state.boardFormValidations[action.payload] = true;
    },
    setFalseBoardFormValidations: (state, action: PayloadAction<keyof BoardFormValidation>) => {
      state.boardFormValidations[action.payload] = false;
    },
    resetBoardFormValidations: (state) => {
      state.boardFormValidations = initialBoardFormValidations;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBoards.fulfilled, (state, action: PayloadAction<Board[]>) => {
      state.boards = sortBoards(action.payload);
    })
  }
})

export const { addBoard,
               addAllBoards,
               deleteAllBoards,
               setCurrentBoardID,
               setCurrentBoard,
               resetCurrentBoard,
               setTrueBoardFormValidations,
               setFalseBoardFormValidations,
               resetBoardFormValidations, } = boardSlice.actions;

export default boardSlice.reducer;

export const fetchAllBoards = createAsyncThunk<Board[], void>(
  "board/fetchAllBoards",
  async() => {
    try {
      const response = await getAllBoards();
      return response;
    } catch(error) {
      console.log("fetchAllBoards Error : " + error);
      return [];
    }
  }
)