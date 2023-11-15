import Card from "@material-tailwind/react/components/Card";
import Task from "../types/Task";
import { TaskStatus } from "../types/TaskStatus";
import TaskStackHeader from "./TaskStackHeader";
import List from "@material-tailwind/react/components/List";
import ListItem from "@material-tailwind/react/components/List/ListItem";
import { setCurrentTaskID } from "../features/taskSlice";
import { useState } from "react";
import TaskCreationForm from "./TaskCreationForm.1";
import TaskEditForm from "./TaskEditForm";
import { useAppDispatch } from "../hooks";


interface TaskStackProps {
  taskStatus: TaskStatus
  tasks: Task[] | undefined
}

const TaskStack = ({taskStatus, tasks}: TaskStackProps) => {
  const [taskCreateFormOpen, setTaskCreateFormOpen] = useState<boolean>(false);
  const [taskEditFormOpen, setTaskEditFormOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleTaskClick = (taskID: number) => {
    dispatch(setCurrentTaskID(taskID));
    handleTaskEditFormOpen();
  }

  const handleTaskCreateFormOpen = () => {
    setTaskCreateFormOpen(!taskCreateFormOpen);
  }

  const handleTaskEditFormOpen = () => {
    setTaskEditFormOpen(!taskEditFormOpen);
  }

  return (
    <Card className="w-96">
      <TaskCreationForm open={taskCreateFormOpen} handleOpen={handleTaskCreateFormOpen} taskStatus={taskStatus}/>
      <TaskEditForm open={taskEditFormOpen} handleOpen={handleTaskEditFormOpen} />
      <TaskStackHeader taskStatus={taskStatus} handleTaskCreation={handleTaskCreateFormOpen}/>
      <List>
        {tasks && tasks.map((task, index) =>
          <ListItem
            key={task.taskId}
            onClick={() => handleTaskClick(task.taskId!)}
            className={index %2 === 0 ? 'bg-white' : 'bg-pink-50'}
            >
              {task.title}
          </ListItem>)
        }
      </List>
    </Card>
  )

}

export default TaskStack;