import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import GeneralSidebar from "../components/GeneralSidebar";
import { useEffect } from "react";
import TaskLists from "../components/TaskLists";
import { addAllTasks, removeAllTasks } from "../features/taskSlice";
import Task from "../types/Task";
import getAllTasksByBoardID from "../components/getAllTasksByBoardID";
import TaskListsV2 from "../components/TaskListsV2";

const Dashboard: React.FC = () => {
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const currentBoardID = useSelector((state: any) => state.board.currentBoardID);

  useEffect(() => {
    if (currentBoardID === -1) {
      dispatch(removeAllTasks())
    }
    fetchTasksByBoardID();
  }, [currentBoardID])

  const fetchTasksByBoardID = async () => {
    console.log("fetchTasksByBoardID...");
    if (currentBoardID > 0) {
      console.log("currentBoardId is valid")
      const fetchedTasks: Task[] = await getAllTasksByBoardID(currentBoardID);
      dispatch(addAllTasks(fetchedTasks));
    }
  }

  return (
    <div>
      <div className="w-full p-8">
      {auth.isLoggedIn === false ? (
        <Navigate to="/" replace={true} />
      ): (
        <div className="flex">
          <GeneralSidebar />
          {/* <TaskLists /> */}
          <TaskListsV2 />
        </div>
      )}
      </div>
    </div>
  )
}

export default Dashboard;