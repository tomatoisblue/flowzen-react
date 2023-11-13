import Typography from "@material-tailwind/react/components/Typography";
import Button from "@material-tailwind/react/components/Button";
import { useTaskForm } from "../hooks/useTaskForm";
import { useSelector } from "react-redux";
import { TaskFormMode } from "../features/taskSlice";

interface TaskFormHeaderProps {
  mode: "create" | "edit"
  handleOpen: () => void
}

const TaskFormHeader = ({ mode, handleOpen }: TaskFormHeaderProps) => {
  // const taskFormMode: TaskFormMode = useSelector((state: any) => state.task.taskFormMode);
  const [,, {handleDeleteTask}] = useTaskForm();


  return (
    <>
      { mode === "create" ? (
        <Typography variant="h4" color="blue-gray" className="w-1/2">
          新規タスク
        </Typography>
      ) : (
        <>
          <Typography variant="h4" color="blue-gray" className="w-1/2">
            タスク編集
          </Typography>
          <div className="w-3/4">
            <Button onClick={() => handleDeleteTask(handleOpen)}
                    className="float-right text-sm font-small text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              <Typography  color="blue-gray" >
                削除
              </Typography>
            </Button>
          </div>
        </>
      )}
    </>
  )
}

export default TaskFormHeader;