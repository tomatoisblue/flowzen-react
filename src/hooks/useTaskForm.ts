import deleteTask from "../components/deleteTask";
import { TaskFormValidation, TaskValidationError, clearCurrentTask, clearTaskFormValidationErrors, fetchAllTasksByBoardID, initialTaskFormValidations, setCurrentTask, setCurrentTaskID, setIsTaskFormValid, setTaskFormValidationErrors, toggleTaskCreateFormOpen, toggleTaskEditFormOpen, unsetTaskFormValidationErrors } from "../features/taskSlice";
import Task from "../types/Task";
import createTask from "../components/createTask";
import updateTask from "../components/updateTask";
import stringToTaskStatus from "../components/stringToTaskStatus";
import { useAppDispatch, useAppSelector } from "../hooks";
import { taskDescriptionValidation } from "../validation/tasks/taskDescriptionValidation";
import { taskUrlValidation } from "../validation/tasks/taskUrlValidation";
import { useEffect } from "react";
import { taskTitleValidation } from "../validation/tasks/taskTitleValidation";
import { taskValidationErrorMessages } from "../constants/taskValidationErrorMessages";

export const useTaskForm = () => {
  const dispatch = useAppDispatch();
  const currentTaskID: number = useAppSelector((state) => state.task.currentTaskID);
  const currentTask: Task = useAppSelector((state) => state.task.currentTask);
  const currentBoardID: number = useAppSelector((state) => state.board.currentBoardID);
  const taskValidationErrors: TaskValidationError = useAppSelector((state) => state.task.taskFormValidationErrors)

  useEffect(() => {
    console.log("taskValidationErrors")
    console.log(JSON.stringify(taskValidationErrors))

  }, [taskValidationErrors])



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
    // validation
    const validationResult = await validate();
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
      dispatch(clearTaskFormValidationErrors());
      dispatch(fetchAllTasksByBoardID(currentBoardID))
      handleOpen();
    }
  }

  const validate = async (): Promise<boolean> => {
    const taskFormValidations: TaskFormValidation = {title: false, status: false, description: false, expirationDate: false, url: false};
    let flag: boolean = true;
    Object.keys(currentTask).map((key) => {
      switch (key) {
        case "title":
          taskFormValidations[key] = taskTitleValidation(currentTask[key]);
          console.log("validate title : " + taskFormValidations[key]);
          if (taskFormValidations[key]) {
            dispatch(unsetTaskFormValidationErrors(key));
          } else {
            flag = false;
            dispatch(setTaskFormValidationErrors({...taskValidationErrors, [key]: taskValidationErrorMessages[key as keyof TaskValidationError]}));
          }
          break;
        case "status":
          taskFormValidations[key] = true;
          break;
        case "description":
          taskFormValidations[key]= taskDescriptionValidation(currentTask[key]!);
          if (taskFormValidations[key]) {
            dispatch(unsetTaskFormValidationErrors(key));
          } else {
            flag = false;
            dispatch(setTaskFormValidationErrors({...taskValidationErrors, [key]: taskValidationErrorMessages[key as keyof TaskValidationError]}));
          }
          break;
        case "expirationDate":
          taskFormValidations[key] = true;
          break;
        case "url":
          taskFormValidations[key] = taskUrlValidation(currentTask[key]!);
          if (taskFormValidations[key]) {
            dispatch(unsetTaskFormValidationErrors(key));
          } else {
            flag = false;
            dispatch(setTaskFormValidationErrors({...taskValidationErrors, [key]: taskValidationErrorMessages[key as keyof TaskValidationError]}));
          }
          break;
        default:
          console.log("validation keys error")
      }
    });

    return flag;
  }

  return [{handleDeleteTask, handleChange, handleStatusChange, handleSubmit}] as const;
}
