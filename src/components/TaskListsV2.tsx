import { useSelector } from "react-redux";
import Task from "../types/Task";
import { Typography } from "@material-tailwind/react";
import TaskStackV2 from "./TaskStackV2";

const TaskLists = () => {
  const allTasks: Task[] = useSelector((state: any) => state.task.tasks);
  const todoTasks: Task[] | undefined = allTasks.filter((task) => task.status === "TODO");
  const inProgressTasks: Task[] | undefined = allTasks.filter((task) => task.status === "IN_PROGRESS");
  const doneTasks: Task[] | undefined = allTasks.filter((task) => task.status === "DONE");
  const currentBoardID = useSelector((state: any) => state.board.currentBoardID);


  return (
    <div className="flex w-full">
      {currentBoardID !== -1 ? (
        <>
          <TaskStackV2 taskStatus={"TODO"} tasks={todoTasks} />
          <TaskStackV2 taskStatus={"IN_PROGRESS"} tasks={inProgressTasks} />
          <TaskStackV2 taskStatus={"DONE"} tasks={doneTasks} />
        </>
      ) : (
        <div className="h-screen w-screen">
          <div className="w-full h-full m-20">
            <Typography variant="h5">
              ボードを選択してください
            </Typography>
          </div>
        </div>
      )}
    </div>
  )

}

export default TaskLists;