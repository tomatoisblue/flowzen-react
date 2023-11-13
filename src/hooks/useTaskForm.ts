import { useDispatch, useSelector } from "react-redux"
import deleteTask from "../components/deleteTask";
import { useFetchTasksByBoardID } from "./useFetchTasksByboardID";
import { TaskFormMode, setCurrentTaskID, toggleTaskCreateFormOpen, toggleTaskEditFormOpen } from "../features/taskSlice";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import Task from "../types/Task";
import createTask from "../components/createTask";
import updateTask from "../components/updateTask";
import { taskFormFields } from "../constants/taskFormField";
import { useEffect, useState } from "react";
import { TaskStatus } from "../types/TaskStatus";
import stringToTaskStatus from "../components/stringToTaskStatus";


type Fields = { [key: string]: string | Date | TaskStatus | null}
const fields = taskFormFields;
let fieldsState: Fields = {};
fields.forEach(field => fieldsState[field.id]="");

export const useTaskForm = () => {
  const dispatch : Dispatch<AnyAction>= useDispatch();
  const currentTaskID: number = useSelector((state: any) => state.task.currentTaskID);
  const currentTask: Task = useSelector((state: any) => state.task.currentTask);
  const currentBoardID: number = useSelector((state: any) => state.board.currentBoardID);
  // const taskFormMode: TaskFormMode = useSelector((state: any) => state.task.taskFormMode);
  const [taskState, setTaskState] = useState<Fields>(fieldsState)

  const fetchTasksByBoardID = useFetchTasksByBoardID();

  useEffect(() => {
    if (currentTaskID === -1) {
      resetTaskState();
    } else {
      setTaskState({
        "title": currentTask?.title,
        "status": currentTask?.status,
        "description": currentTask?.description!,
        "expiration-date": currentTask?.expirationDate!,
        "url": currentTask?.url!
      })
    }

    console.log(JSON.stringify(taskState));

    return () => {
      resetTaskState();
    }
  }, [])

  useEffect(() => {
    if (currentTaskID !== -1) {
      setTaskState({
        "title": currentTask?.title,
        "status": currentTask?.status,
        "description": currentTask?.description!,
        "expiration-date": currentTask?.expirationDate!,
        "url": currentTask?.url!
      })
    }
    return () => {
      resetTaskState();
    }
  }, [currentTaskID])


  // useEffect(() => {
  //   console.log(JSON.stringify(taskState));
  // }, [taskState])



  const resetTaskState = () => {
    console.log("reset task state")
    setTaskState(fieldsState);
  }

  // const handleChange = (e: any) => {
  //   console.log(JSON.stringify(e));
  //   if (e.target.id === "status") {
  //     console.log("status state change")
  //     setTaskState({...taskState, ["status"]: e as TaskStatus})
  //   } else {
  //     console.log("state changed")
  //     setTaskState({...taskState, [e.target.id]: e.target.value});
  //   }
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskState({...taskState, [e.target.id]: e.target.value});
    // const validationResult = validateTaskForm(e.target.id, e.target.value);
    // setTaskValidation({...taskValidation, [e.target.id]: validationResult});
    console.log(e.target.value)
    console.log("title: " + taskState["title"] + "\nstatus: " + taskState["status"] + "\ndesc: " + taskState["description"] + "\nexp: " + taskState["expiration-date"] + "\nurl: " + taskState["url"])
  }

  const handleStatusChange = (e) => {
    setTaskState({...taskState, ["status"]: e})
    // const validationResult = validateTaskForm("status", e);
    // setTaskValidation({...taskValidation, ["status"]: validationResult});
    console.log(e)
    console.log("title: " + taskState["title"] + "\nstatus: " + taskState["status"] + "\ndesc: " + taskState["description"] + "\nexp: " + taskState["expiration-date"] + "\nurl: " + taskState["url"])
  }
  const handleDeleteTask: (handleOpen: () => void) => Promise<void> = async (handleOpen: () => void) => {
    const result: boolean = await deleteTask(currentTaskID, currentBoardID);
    if (result) {
      await fetchTasksByBoardID();
      handleOpen();
      // dispatch(toggleTaskEditFormOpen());
    }
  }

  const handleSubmit: (mode: ("create" | "edit"), handleOpen: () => void) => Promise<void> = async (mode: ("create" | "edit"), handleOpen) => {
    const task : Task = {
      title: taskState["title"] as string,
      status: stringToTaskStatus(taskState["status"] as string)! ,
      // status: taskState["status"] as TaskStatus,
      description: taskState["description"] as string,
      expirationDate: taskState["expiration-date"] === null ? null :  new Date(taskState["expiration-date"] as string),
      url: taskState["url"] as string
    }

    let result: boolean;
    if (currentTaskID && mode === "edit") {
      result = await updateTask(task, currentBoardID, currentTaskID);
    } else {
      result = await createTask(task, currentBoardID);
    }
    if (result) {
      console.log("handleSubmit Succeeded")
      await fetchTasksByBoardID();
      setTaskState(fieldsState);
      handleOpen();
    }
  }

  const handleCreateFormOpen: () => void = () => {
    console.log("handleCreateFormOpen");
    dispatch(toggleTaskCreateFormOpen());
  }

  const handleEditFormOpen: (taskID: number) => void = (taskID: number) => {
    console.log("handleEditFormOpen");
    dispatch(setCurrentTaskID(taskID));
    dispatch(toggleTaskEditFormOpen());
  }

  return [taskState, currentTaskID, {setTaskState, resetTaskState, handleDeleteTask, handleChange, handleStatusChange, handleSubmit, handleCreateFormOpen, handleEditFormOpen}] as const;
}
