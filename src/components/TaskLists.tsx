import { useAppSelector } from "../hooks";
import Task from "../types/Task";
import { Typography } from "@material-tailwind/react";

const TaskLists = () => {
  const allTasks: Task[] = useAppSelector((state) => state.task.tasks);
  const todoTasks: Task[] | undefined = allTasks.filter((task) => task.status === "TODO");
  const inProgressTasks: Task[] | undefined = allTasks.filter((task) => task.status === "IN_PROGRESS");
  const doneTasks: Task[] | undefined = allTasks.filter((task) => task.status === "DONE");
  const currentBoardID = useAppSelector((state) => state.board.currentBoardID);

  return (
    <div className="flex w-full">
      {currentBoardID !== -1 ? (
        <>
          <TaskStack taskStatus={"TODO"} tasks={todoTasks} />
          <TaskStack taskStatus={"IN_PROGRESS"} tasks={inProgressTasks} />
          <TaskStack taskStatus={"DONE"} tasks={doneTasks} />
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