import { useSelector } from "react-redux"
import deleteTask from "../components/deleteTask";
import { useFetchTasksByBoardID } from "./useFetchTasksByboardID";

export const useDeleteTask = () => {
  const currentTaskID = useSelector((state: any) => state.task.currentTaskID);
  const currentBoardID = useSelector((state: any) => state.board.currentBoardID);
  const fetchTasksByBoardID = useFetchTasksByBoardID();

  // const handleDeleteTask = async () => {
  //   const result: boolean = await deleteTask(currentTaskID, currentBoardID);
  //   if (results) {
  //     await fetchTasksByBoardID();
  //     handleOpen();
  //   }
  // }

}