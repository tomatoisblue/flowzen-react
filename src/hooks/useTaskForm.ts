import deleteTask from "../components/deleteTask";
import { TaskFormValidation, clearCurrentTask, fetchAllTasksByBoardID, resetTaskFormValidations, setCurrentTask, setFalseTaskFormValidations,  setTrueTaskFormValidations } from "../features/taskSlice";
import Task from "../types/Task";
import createTask from "../components/createTask";
import updateTask from "../components/updateTask";
import stringToTaskStatus from "../components/stringToTaskStatus";
import { useAppDispatch, useAppSelector } from "../hooks";
import { taskDescriptionValidation } from "../validation/tasks/taskDescriptionValidation";
import { taskUrlValidation } from "../validation/tasks/taskUrlValidation";
import { taskTitleValidation } from "../validation/tasks/taskTitleValidation";
import { taskStatusValidation } from "../validation/tasks/taskStatusValidation";

export const useTaskForm = () => {
  const dispatch = useAppDispatch();
  const currentTaskID: number = useAppSelector((state) => state.task.currentTaskID);
  const currentTask: Task = useAppSelector((state) => state.task.currentTask);
  const currentBoardID: number = useAppSelector((state) => state.board.currentBoardID);
  // const taskValidationErrors: TaskFormValidation = useAppSelector((state) => state.task.taskFormValidationErrors)

  // useEffect(() => {
  //   console.log("taskValidationErrors")
  //   console.log(JSON.stringify(taskValidationErrors))

  // }, [taskValidationErrors])



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
    dispatch(resetTaskFormValidations());
    // validation
    const validationResult = await validate();
    console.log("validationResult : " + validationResult);
    if (!validationResult) {
      return;
    }

    // submission
    let submissionResult: boolean;
    if (currentTaskID && mode === "edit") {
      submissionResult = await updateTask(currentTask, currentBoardID, currentTaskID);
    } else {
      submissionResult = await createTask(currentTask, currentBoardID);
    }
    if (submissionResult) {
      console.log("handleSubmit Succeeded")
      dispatch(clearCurrentTask());
      dispatch(resetTaskFormValidations());
      dispatch(fetchAllTasksByBoardID(currentBoardID));
      handleOpen();
    }
  }

  const validate = async (): Promise<boolean> => {
    let tmpResult: boolean = false;
    let flag: boolean = true;
    Object.keys(currentTask).map((key) => {
      switch (key) {
        case "title":
          tmpResult = taskTitleValidation(currentTask[key]);
          break;
        case "status":
          tmpResult = taskStatusValidation(currentTask[key]);
          break;
        case "description":
          tmpResult = taskDescriptionValidation(currentTask[key]!);
          break;
        case "expirationDate":
          tmpResult = true;
          break;
        case "url":
          tmpResult = taskUrlValidation(currentTask[key]!);
          break;
        default:
          console.log("taskvalidation key error")
      }
      if (tmpResult) {
        dispatch(setTrueTaskFormValidations(key as keyof TaskFormValidation));
      } else {
        dispatch(setFalseTaskFormValidations(key as keyof TaskFormValidation));
        flag = false;
      }
    })
    return flag;
  }

  return [{handleDeleteTask, handleChange, handleStatusChange, handleSubmit}] as const;
}
