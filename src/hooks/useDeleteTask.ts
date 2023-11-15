import deleteTask from "../components/deleteTask";
import { useAppSelector } from "../hooks";
import { useFetchTasksByBoardID } from "./useFetchTasksByboardID";

export const useDeleteTask = () => {
  const currentTaskID = useAppSelector((state: any) => state.task.currentTaskID);
  const currentBoardID = useAppSelector((state: any) => state.board.currentBoardID);
  const fetchTasksByBoardID = useFetchTasksByBoardID();

  // const handleDeleteTask = async () => {
  //   const result: boolean = await deleteTask(currentTaskID, currentBoardID);
  //   if (results) {
  //     await fetchTasksByBoardID();
  //     handleOpen();
  //   }
  // }

}