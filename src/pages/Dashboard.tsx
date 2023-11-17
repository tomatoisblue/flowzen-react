import { Navigate } from "react-router-dom";
import GeneralSidebar from "../components/GeneralSidebar";
import TaskListsV2 from "../components/TaskListsV2";
import { useAppSelector } from "../hooks";

const Dashboard: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);

  console.log("Dashboard")

  return (
    <div>
      <div className="w-screen h-screen">
      {auth.isLoggedIn === false ? (
        <Navigate to="/" replace={true} />
      ): (
        <div className="flex">
          <GeneralSidebar />
          <TaskListsV2 />
        </div>
      )}
      </div>
    </div>
  )
}

export default Dashboard;