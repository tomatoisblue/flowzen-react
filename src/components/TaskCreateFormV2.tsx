import { TaskStatus } from "../types/TaskStatus";
import TaskForm from "./TaskForm";

interface TaskCreateFormProps {
  taskStatus: TaskStatus,
  handleOpen: () => void,
  open: boolean
}

const TaskCreateFormV2: React.FC<TaskCreateFormProps> = ({taskStatus, handleOpen, open}: TaskCreateFormProps) => {
  console.log("TaskCreateFormV2")
  return (
    <TaskForm taskStatus={taskStatus} handleOpen={handleOpen} mode={"create"} open={open}/>
  )
}

export default TaskCreateFormV2;