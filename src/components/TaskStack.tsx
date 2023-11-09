import Card from "@material-tailwind/react/components/Card";
import Task from "../types/Task";
import { TaskStatus } from "../types/TaskStatus";
import TaskStackHeader from "./TaskStackHeader";
import List from "@material-tailwind/react/components/List";
import ListItem from "@material-tailwind/react/components/List/ListItem";
import { useDispatch } from "react-redux";
import { setCurrentTaskID } from "../features/taskSlice";
import { useState } from "react";
import TaskCreationForm from "./TaskCreationForm";
import TaskEditForm from "./TaskEditForm";


interface TaskStackProps {
  taskStatus: TaskStatus
  tasks: Task[] | undefined
}

const TaskStack = ({taskStatus, tasks}: TaskStackProps) => {
  const [taskCreateFormOpen, setTaskCreateFormOpen] = useState<boolean>(false);
  const [taskEditFormOpen, setTaskEditFormOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

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
        {tasks && tasks.map((task) =>
          <ListItem
            key={task.taskId}
            onClick={() => handleTaskClick(task.taskId!)}>
              {task.title}
          </ListItem>)
        }
      </List>
    </Card>
  )

}

export default TaskStack;