import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/counter";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";

const Dashboard: React.FC = () => {
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/");
  }

  return (
    <>
      {auth.isLoggedIn === false ? (
        <Navigate to="/" replace={true} />
      ): <></>}
      <h1>dashboard</h1>
      <div>
        <h3>Login State: {auth.isLoggedIn ? "TRUE" : "FALSE"}</h3>
      </div>
      <div>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
      <Counter />
    </>
  )

}

export default Dashboard;