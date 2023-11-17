import AuthenticationForm from "../components/AuthenticationForm";
import { useAppSelector } from "../hooks";
import { Navigate } from "react-router-dom";


const AuthenticationPage: React.FC = () => {

  const auth = useAppSelector((state) => state.auth);

  return (
    <div className="w-full min-h-full flex items-center pt-5 justify-center ">
      {auth.isLoggedIn === true ? (
        <Navigate to="/dashboard" replace={true} />
      ): <></>}
      <div className="w-1/3">
        <AuthenticationForm />
      </div>
    </div>
  )
}

export default AuthenticationPage;