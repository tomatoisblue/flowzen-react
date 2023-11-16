import AuthenticationForm from "../components/AuthenticationForm";
import { useAppSelector } from "../hooks";
import { Navigate } from "react-router-dom";


const AuthenticationPage: React.FC = () => {

  const auth = useAppSelector((state) => state.auth);

  return (
    <div className="">
      {auth.isLoggedIn === true ? (
        <Navigate to="/dashboard" replace={true} />
      ): <></>}
      <AuthenticationForm />
    </div>
  )
}

export default AuthenticationPage;