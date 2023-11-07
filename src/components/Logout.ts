import { useDispatch } from "react-redux";
import { logout } from '../features/authSlice'
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutProcess = async () => {
    await localStorage.set(null);
    const a = await dispatch(logout());
    navigate("/");
  }

  logoutProcess();
}

export default Logout;