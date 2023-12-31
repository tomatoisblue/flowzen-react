import Login from "../components/Login";
import { useAppSelector } from "../hooks";
import AuthenticationHeader from "./AuthenticationHeader";
import { Navigate } from "react-router-dom";


const LoginPage: React.FC = () => {

  const auth = useAppSelector((state) => state.auth);

  return (
    <div>
      {auth.isLoggedIn === true ? (
        <Navigate to="/dashboard" replace={true} />
      ): <></>}
      <AuthenticationHeader
        heading="ログイン"
        paragraph="アカウントをお持ちでない場合、こちらから登録してください。"
        linkName="アカウントを作成"
        linkUrl="/signup"
      />
      <Login />
    </div>
  )


}

export default LoginPage;