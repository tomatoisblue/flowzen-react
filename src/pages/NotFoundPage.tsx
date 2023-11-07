import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const auth = useSelector((state: any) => state.auth);
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