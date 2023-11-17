import Task from "../types/Task";
import { Typography } from "@material-tailwind/react";
import TaskStackV2 from "./TaskStackV2";
import { useEffect } from "react";
import { fetchAllTasksByBoardID, removeAllTasks } from "../features/taskSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const TaskLists = () => {
  const allTasks: Task[] = useAppSelector((state) => state.task.tasks);
  console.log("all tasks ...")
  console.log(JSON.stringify(allTasks));
  const todoTasks: Task[] | undefined = allTasks.filter((task) => task.status === "TODO");
  const inProgressTasks: Task[] | undefined = allTasks.filter((task) => task.status === "IN_PROGRESS");
  const doneTasks: Task[] | undefined = allTasks.filter((task) => task.status === "DONE");
  const currentBoardID = useAppSelector((state) => state.board.currentBoardID);
  const dispatch = useAppDispatch();

  console.log("TaskListsV2")

  useEffect(() => {
    if (currentBoardID < 0) {
      return;
    }
    const onRefreshTasks = async() => {
      dispatch(fetchAllTasksByBoardID(currentBoardID));
    }

    onRefreshTasks();

    return () => {
      dispatch(removeAllTasks());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBoardID])



  return (
    <div className="flex w-full p-6">
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
              ボードを作成してください
            </Typography>
          </div>
        </div>
      )}
    </div>
  )

}

export default TaskLists;