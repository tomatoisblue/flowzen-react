import { addAllTasks } from "../features/taskSlice";
import Task from "../types/Task";
import getAllTasksByBoardID from "../components/getAllTasksByBoardID";
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../hooks";

export const useFetchTasksByBoardID = () => {
  const currentBoardID = useAppSelector((state: RootState) => state.board.currentBoardID);
  const dispatch = useAppDispatch();

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
