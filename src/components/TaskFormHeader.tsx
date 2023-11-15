import Typography from "@material-tailwind/react/components/Typography";
import Button from "@material-tailwind/react/components/Button";
import { useTaskForm } from "../hooks/useTaskForm";

interface TaskFormHeaderProps {
  mode: "create" | "edit"
  handleOpen: () => void
}

const TaskFormHeader = ({ mode, handleOpen }: TaskFormHeaderProps) => {
  const [{handleDeleteTask}] = useTaskForm();


  return (
    <>
      { mode === "create" ? (
        <Typography variant="h4" color="blue-gray" className="w-1/2">
          新規タスク
        </Typography>
      ) : (
        <div className="flex items-center w-full">
          <Typography variant="h4" color="blue-gray" className="flex-shrink-0 w-1/2">
            タスク編集
          </Typography>
          <div className="w-1/2">
            <Button onClick={() => handleDeleteTask(handleOpen)}
                    className="float-right text-sm font-small text-black focus:outline-none bg-red-300 rounded-lg border border-gray-200 hover:bg-red-600  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              <Typography className="font-bold" color="blue-gray" >
                削除
              </Typography>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default TaskFormHeader;