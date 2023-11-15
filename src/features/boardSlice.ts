import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Board from "../types/Board";
import sortBoards from "../components/sortBoards";

const initialState = {
  boards: [] as Board[],
  currentBoardID: -1 as number
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
      console.log("setting board id : " + action.payload);
      state.currentBoardID = action.payload;
    },
    resetCurrentBoardID: (state) => {
      state.currentBoardID = -1;
    }

  }
})

export const { addBoard, addAllBoards, deleteAllBoards, setCurrentBoardID, resetCurrentBoardID } = boardSlice.actions;

export default boardSlice.reducer;