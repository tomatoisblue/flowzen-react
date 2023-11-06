import Signup from "../components/Signup";
import AuthenticationHeader from "./AuthenticationHeader";

const SignupPage: React.FC = () => {
  return (
    <div>
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