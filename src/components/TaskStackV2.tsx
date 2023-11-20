import Card from "@material-tailwind/react/components/Card";
import Task from "../types/Task";
import { TaskStatus } from "../types/TaskStatus";
import List from "@material-tailwind/react/components/List";
import ListItem from "@material-tailwind/react/components/List/ListItem";
import TaskCreateFormV2 from "./TaskCreateFormV2";
import TaskEditFormV2 from "./TaskEditFormV2";
import TaskStackHeaderV2 from "./TaskStackHeaderV2";
import { clearCurrentTask, clearTaskFormValidationErrors, resetTaskFormValidations, setCurrentTaskID } from "../features/taskSlice";
import { useState } from "react";
import { useAppDispatch } from "../hooks";

interface TaskStackProps {
  taskStatus: TaskStatus
  tasks: Task[] | undefined
}

const TaskStackV2 = ({taskStatus, tasks}: TaskStackProps) => {
  // When it comes to isCreateFormOpen and isEditFormOpen,
  // if they are FALSE, it means the form is OPENED.
  // and vice versa.
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false)
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch();

  console.log("TaskStackV2")

  const handleCreateFormOpen = () => {
    console.log("handleCreateFormOpen")
    setIsCreateFormOpen(!isCreateFormOpen);
    console.log("isCreateFormOpen: " + isCreateFormOpen)
  }

  const handleEditFormOpen = () => {
    console.log("handleEditFormOpen")
    setIsEditFormOpen(!isEditFormOpen);
    // if the form is closed
    if (isEditFormOpen) {
      dispatch(clearCurrentTask());
    }
    console.log("isEditFormOpen: " + isEditFormOpen)
  }

  const handleClick = (taskID: number) => {
    dispatch(setCurrentTaskID(taskID));
    // dispatch(clearTaskFormValidationErrors)
    dispatch(resetTaskFormValidations())
    handleEditFormOpen();
  }



  return (
    <Card className="w-80">
      <TaskCreateFormV2 taskStatus={taskStatus} handleOpen={handleCreateFormOpen} open={isCreateFormOpen} />
      <TaskEditFormV2 handleOpen={handleEditFormOpen} open={isEditFormOpen} />
      <TaskStackHeaderV2 taskStatus={taskStatus} handleOpen={handleCreateFormOpen} />
      <List>
        {tasks && tasks.map((task, index) =>
          <ListItem
            key={task.taskId}
            onClick={() => handleClick(task.taskId!)}
            className={`${index %2 === 0 ? 'bg-white' : 'bg-pink-50'} hover:border border border-transparent hover:border-black hover:bg-white`}
            >
              {task.title}
          </ListItem>)
        }
      </List>
    </Card>
  )

}

export default TaskStackV2;