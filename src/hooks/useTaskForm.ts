import deleteTask from "../components/deleteTask";
import { clearCurrentTask, fetchAllTasksByBoardID, setCurrentTask, setCurrentTaskID, toggleTaskCreateFormOpen, toggleTaskEditFormOpen } from "../features/taskSlice";
import Task from "../types/Task";
import createTask from "../components/createTask";
import updateTask from "../components/updateTask";
import stringToTaskStatus from "../components/stringToTaskStatus";
import { useAppDispatch, useAppSelector } from "../hooks";



export const useTaskForm = () => {
  const dispatch = useAppDispatch();
  const currentTaskID: number = useAppSelector((state) => state.task.currentTaskID);
  const currentTask: Task = useAppSelector((state) => state.task.currentTask);
  const currentBoardID: number = useAppSelector((state) => state.board.currentBoardID);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | Date | null;

    if (e.target.value !== null) {
      switch (e.target.id) {
        case "expiration-date":
          value = new Date(Date.parse(e.target.value));
          console.log("exp date : " + value)
          break;
        default:
          value = e.target.value;
      }
    } else {
      value = null;
    }

    dispatch(setCurrentTask({...currentTask, [e.target.name]: value}))
  }

  const handleStatusChange = (e) => {
    dispatch(setCurrentTask({...currentTask, ["status"]: stringToTaskStatus(e)!}))
  }

  const handleDeleteTask: (handleOpen: () => void) => Promise<void> = async (handleOpen: () => void) => {
    const result: boolean = await deleteTask(currentTaskID, currentBoardID);
    if (result) {
      dispatch(fetchAllTasksByBoardID(currentBoardID));
      handleOpen();
    }
  }

  const handleSubmit: (mode: ("create" | "edit"), handleOpen: () => void) => Promise<void> = async (mode: ("create" | "edit"), handleOpen) => {
    let result: boolean;
    if (currentTaskID && mode === "edit") {
      result = await updateTask(currentTask, currentBoardID, currentTaskID);
    } else {
      result = await createTask(currentTask, currentBoardID);
    }
    if (result) {
      console.log("handleSubmit Succeeded")
      dispatch(clearCurrentTask());
      dispatch(fetchAllTasksByBoardID(currentBoardID))
      handleOpen();
    }
  }

  return [{handleDeleteTask, handleChange, handleStatusChange, handleSubmit}] as const;
}
