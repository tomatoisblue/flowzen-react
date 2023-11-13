import { useDispatch } from "react-redux";
import TaskForm from "./TaskForm";
import { changeToEditMode } from "../features/taskSlice";
import { useEffect } from "react";

interface TaskEditFormProps {
  handleOpen: () => void,
  open: boolean
}

const TaskEditFormV2: React.FC<TaskEditFormProps> = ({ handleOpen, open}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeToEditMode());
  }, [])
  return (
    <TaskForm handleOpen={handleOpen} mode={"edit"} open={open}/>
  )
}

export default TaskEditFormV2;