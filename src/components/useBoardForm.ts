import { BoardFormMode, BoardFormValidation, fetchAllBoards, resetBoardFormValidations, resetCurrentBoard, setCurrentBoard, setFalseBoardFormValidations, setTrueBoardFormValidations } from "../features/boardSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { boardTitleValidation } from "../validation/board/boardTitleValidation";
import createBoard from "./createBoard";
import { updateBoard } from "./updateBoard";

export const useBoardForm = () => {
  const currentBoard = useAppSelector((state) => state.board.currentBoard);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrentBoard({...currentBoard, [e.target.id]: e.target.value}));
  }

  const handleSubmit = async (mode: BoardFormMode, handleOpen: () => void) => {
    const validationResult = await validate();

    if (!validationResult) {
      return;
    }

    // submission
    let submissionResult: boolean;
    if (mode === "edit") {
      submissionResult = await updateBoard(currentBoard);
    } else {
      submissionResult = await createBoard(currentBoard);
    }
    if (submissionResult) {
      // console.log("handleSubmit Succeeded")
      dispatch(resetCurrentBoard());
      dispatch(resetBoardFormValidations());
      await dispatch(fetchAllBoards());
      handleOpen();
    }
  }

  const validate = async (): Promise<boolean> => {
    let tmpResult: boolean = false;
    let flag: boolean = true;
    Object.keys(currentBoard).map((key) => {
      switch (key) {
        case "title":
          tmpResult = boardTitleValidation(currentBoard[key]);
          break;
        default:
          console.log("board validation key error")
      }
      if (tmpResult) {
        dispatch(setTrueBoardFormValidations(key as keyof BoardFormValidation));
      } else {
        dispatch(setFalseBoardFormValidations(key as keyof BoardFormValidation));
        flag = false;
      }
    })
    return flag;
  }


  return [{ handleChange,
            handleSubmit, }] as const
}