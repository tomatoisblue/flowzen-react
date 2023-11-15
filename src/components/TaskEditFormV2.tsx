import TaskForm from "./TaskForm";

interface TaskEditFormProps {
  handleOpen: () => void,
  open: boolean
}

const TaskEditFormV2: React.FC<TaskEditFormProps> = ({ handleOpen, open}) => {
  console.log("TaskEditFormV2")
  return (
    <TaskForm handleOpen={handleOpen} mode={"edit"} open={open}/>
  )
}

export default TaskEditFormV2;