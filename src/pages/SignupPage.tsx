import Signup from "../components/Signup";
import AuthenticationHeader from "./AuthenticationHeader";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignupPage: React.FC = () => {
  const auth = useSelector((state: any) => state.auth);

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