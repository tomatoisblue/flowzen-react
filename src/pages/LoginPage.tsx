import { useSelector } from "react-redux";
import Login from "../components/Login";
import AuthenticationHeader from "./AuthenticationHeader";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";


const LoginPage: React.FC = () => {

  const auth = useSelector((state: any) => state.auth);
  // const navigate = useNavigate();
  // console.log(auth)

  // useEffect(() => {
  //   if (auth.IsLoggedIn === true) {
  //     console.log("auth.IsLoggedIn : " + auth.IsLoggedIn ? "true" : "false");
  //     navigate("/dashboard");
  //   }
  // }, [auth.isLoggedIn])


  return (
    <div>
      {auth.isLoggedIn === true ? (
        <Navigate to="/dashboard" replace={true} />
      ): <></>}
      <div>
        <h3>Login State: {auth.isLoggedIn ? "TRUE" : "FALSE"}</h3>
      </div>
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