import Card from "@material-tailwind/react/components/Card";
import Task from "../types/Task";
import { TaskStatus } from "../types/TaskStatus";
import List from "@material-tailwind/react/components/List";
import ListItem from "@material-tailwind/react/components/List/ListItem";
import TaskCreateFormV2 from "./TaskCreateFormV2";
import TaskEditFormV2 from "./TaskEditFormV2";
import TaskStackHeaderV2 from "./TaskStackHeaderV2";
import { useDispatch } from "react-redux";
import { setCurrentTaskID } from "../features/taskSlice";
import { useState } from "react";
import { useTaskForm } from "../hooks/useTaskForm"

interface TaskStackProps {
  taskStatus: TaskStatus
  tasks: Task[] | undefined
}

const TaskStackV2 = ({taskStatus, tasks}: TaskStackProps) => {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false)
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false)
  // const [,, {resetTaskState}] = useTaskForm();
  const dispatch = useDispatch();

  const handleCreateFormOpen = () => {
    setIsCreateFormOpen(!isCreateFormOpen);
  }

  const handleEditFormOpen = () => {
    setIsEditFormOpen(!isEditFormOpen);
    console.log("task edit form => " + isEditFormOpen);
  }

  const handleClick = (taskID: number) => {
    dispatch(setCurrentTaskID(taskID));
    handleEditFormOpen();
  }



  return (
    <Card className="w-96">
      <TaskCreateFormV2 taskStatus={taskStatus} handleOpen={handleCreateFormOpen} open={isCreateFormOpen} />
      <TaskEditFormV2 handleOpen={handleEditFormOpen} open={isEditFormOpen} />
      <TaskStackHeaderV2 taskStatus={taskStatus} handleOpen={handleCreateFormOpen} />
      <List>
        {tasks && tasks.map((task, index) =>
          <ListItem
            key={task.taskId}
            onClick={() => handleClick(task.taskId!)}
            className={index %2 === 0 ? 'bg-white' : 'bg-pink-50'}
            >
              {task.title}
          </ListItem>)
        }
      </List>
    </Card>
  )

}

export default TaskStackV2;