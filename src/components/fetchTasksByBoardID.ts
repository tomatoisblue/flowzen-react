import { useDispatch, useSelector } from "react-redux";
import getAllTasksByBoardID from "./getAllTasksByBoardID";
import { addAllTasks } from "../features/taskSlice";
import Task from "../types/Task";

const fetchTasksByBoardID = async () => {
  const currentBoardID = useSelector((state: any) => state.board.currentBoardID);
  const dispatch = useDispatch();

  console.log("fetchTasksByBoardID...")
  if (currentBoardID > 0) {
    console.log("currentBoardId is valid")
    const fetchedTasks: Task[] = await getAllTasksByBoardID(currentBoardID);
    dispatch(addAllTasks(fetchedTasks));
  }
}

export default fetchTasksByBoardID;