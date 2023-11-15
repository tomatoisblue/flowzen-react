import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";

const NotFoundPage: React.FC = () => {
  const auth = useAppSelector((state: any) => state.auth);
  return (
    <>
      {auth.isLoggedIn === true ? (
        <Navigate to="/dashboard" replace={true} />
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  )
}

export default NotFoundPage;