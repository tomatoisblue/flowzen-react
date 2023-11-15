import TaskForm from "./TaskForm";
import { changeToEditMode } from "../features/taskSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks";

interface TaskEditFormProps {
  handleOpen: () => void,
  open: boolean
}

const TaskEditFormV2: React.FC<TaskEditFormProps> = ({ handleOpen, open}) => {
  // const dispatch = useAppDispatch();
  console.log("TaskEditFormV2")
  // useEffect(() => {
  //   dispatch(changeToEditMode());
  // }, [])
  return (
    <TaskForm handleOpen={handleOpen} mode={"edit"} open={open}/>
  )
}

export default TaskEditFormV2;