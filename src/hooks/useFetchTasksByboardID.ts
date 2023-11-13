import { useDispatch, useSelector } from "react-redux";
import { addAllTasks } from "../features/taskSlice";
import Task from "../types/Task";
import getAllTasksByBoardID from "../components/getAllTasksByBoardID";

export const useFetchTasksByBoardID = () => {
  const currentBoardID = useSelector((state: any) => state.board.currentBoardID);
  const dispatch = useDispatch();

  const fetchTasksByBoardID = async () => {
    console.log("fetchTasksByBoardID...");
    if (currentBoardID > 0) {
      console.log("currentBoardId is valid")
      const fetchedTasks: Task[] = await getAllTasksByBoardID(currentBoardID);
      dispatch(addAllTasks(fetchedTasks));
    }
  }

  return fetchTasksByBoardID;
}
