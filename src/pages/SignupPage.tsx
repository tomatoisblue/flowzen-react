import Signup from "../components/Signup";
import { useAppSelector } from "../hooks";
import AuthenticationHeader from "./AuthenticationHeader";
import { Navigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);

  return (
    <div>
      {auth.isLoggedIn === true ? (
        <Navigate to="/dashboard" replace={true} />
      ): <></>}
      <AuthenticationHeader
        heading="アカウント作成"
        paragraph="既にアカウントをお持ちの場合、こちらからログインしてください。"
        linkName="ログイン"
        linkUrl="/"
      />
      <Signup />
    </div>
  )
}

export default SignupPage;