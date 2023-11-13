import { useDispatch } from "react-redux";
import { TaskStatus } from "../types/TaskStatus";
import TaskForm from "./TaskForm";
import { changeToCreateMode } from "../features/taskSlice";
import { useEffect } from "react";

interface TaskCreateFormProps {
  taskStatus: TaskStatus,
  handleOpen: () => void,
  open: boolean
}

const TaskCreateFormV2: React.FC<TaskCreateFormProps> = ({taskStatus, handleOpen, open}: TaskCreateFormProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeToCreateMode());
  }, [])
  return (
    <TaskForm taskStatus={taskStatus} handleOpen={handleOpen} mode={"create"} open={open}/>
  )
}

export default TaskCreateFormV2;