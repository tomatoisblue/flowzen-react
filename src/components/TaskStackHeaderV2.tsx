import { Button, Typography } from "@material-tailwind/react";
import { TaskStatus } from "../types/TaskStatus";
import { useAppDispatch } from "../hooks";
import { clearTaskFormValidationErrors, setCurrentTask } from "../features/taskSlice";
import Task from "../types/Task";

interface TaskStackHeaderProps {
  taskStatus: TaskStatus
  handleOpen: () => void
}

const TaskStackHeaderV2: React.FC<TaskStackHeaderProps> = ({ taskStatus, handleOpen }: TaskStackHeaderProps ) => {
  const dispatch = useAppDispatch();

  console.log("TaskStackHeaderV2")

  let title = "";

  switch (taskStatus) {
    case "TODO":
      title = "未着手"
      break;
    case "IN_PROGRESS":
      title = "進行中";
      break;
    case "DONE":
      title = "完了"
      break;
    default:
      console.log("TaskStackHeader Error")
  }

  const handleClick = () => {
    dispatch(clearTaskFormValidationErrors());
    const task: Task = {
      title: "",
      status: taskStatus,
      description: null,
      expirationDate: null,
      url: null
    }
    dispatch(setCurrentTask(task));

    handleOpen();
  }

  return (
    <div className="flex px-3 border-double border-b-4 border-blue-gray-100 bg-gray-100">
      <div className="text-center w-full place-items-center">
        <Typography variant="h5" className="my-2 font-normal">{title}</Typography>
      </div>
      <div>
        <Button variant="text" size="sm" onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        </Button>
      </div>
    </div>
  )
}

export default TaskStackHeaderV2;