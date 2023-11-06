import Login from "../components/Login";
import AuthenticationHeader from "./AuthenticationHeader";


const LoginPage: React.FC = () => {
  return (
    <div>
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