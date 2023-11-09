import { Button, IconButton, Typography } from "@material-tailwind/react";
import { TaskStatus } from "../types/TaskStatus";

interface TaskStackHeaderProps {
  taskStatus: TaskStatus
  handleTaskCreation: () => void
}

const TaskStackHeader = ({ taskStatus, handleTaskCreation }: TaskStackHeaderProps) => {
  let title = "";

  switch (taskStatus) {
    case "TODO":
      title = "やるべきこと";
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

  return (
    <div className="flex px-3">
      <div className="text-center w-full place-items-center">
        <Typography variant="h5" className="my-2 font-normal">{title}</Typography>
      </div>
      <div>
        <Button variant="text" size="sm" onClick={handleTaskCreation}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        </Button>
      </div>
    </div>
  )
}

export default TaskStackHeader;