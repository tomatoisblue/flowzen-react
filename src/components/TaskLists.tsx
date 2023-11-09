import { useSelector } from "react-redux";
import Task from "../types/Task";
import TaskStack from "./TaskStack";

const TaskLists = () => {
  const allTasks: Task[] = useSelector((state: any) => state.task.tasks);
  const todoTasks: Task[] | undefined = allTasks.filter((task) => task.status === "TODO");
  const inProgressTasks: Task[] | undefined = allTasks.filter((task) => task.status === "IN_PROGRESS");
  const doneTasks: Task[] | undefined = allTasks.filter((task) => task.status === "DONE");

  return (
    <div className="flex w-full">
      <TaskStack taskStatus={"TODO"} tasks={todoTasks} />
      <TaskStack taskStatus={"IN_PROGRESS"} tasks={inProgressTasks} />
      <TaskStack taskStatus={"DONE"} tasks={doneTasks} />
    </div>
  )

}

export default TaskLists;