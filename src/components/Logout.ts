import { logout } from '../features/authSlice'
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../hooks';

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutProcess = async () => {
    await localStorage.set(null);
    const a = await dispatch(logout());
    navigate("/");
  }

  logoutProcess();
}

export default Logout;