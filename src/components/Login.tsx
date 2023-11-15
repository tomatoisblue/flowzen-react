import { useState } from "react";
import axios from "axios";
import { loginFields } from "../constants/userFormField";
import Input from "./Input";
import FormAction from "./FormAction";
import apiConfig from "../constants/apiConfig";
import { useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";
import { useAppDispatch } from "../hooks";


type Fields ={ [key: string]: string }

const fields = loginFields;
let fieldsState: Fields = {};
fields.forEach(field => fieldsState[field.id]="");


const Login: React.FC = () => {
  const [loginState, setLoginState] = useState<Fields>(fieldsState);
  // const [token, setToken] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const LOGIN_URL = `${apiConfig.baseUrl}/login`;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLoginState({...loginState, [e.target.id]:e.target.value})
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    authenticateUser();
  }

  const authenticateUser = async() => {
    axios.post(LOGIN_URL, {
      email: loginState["email-address"],
      password: loginState["password"],
    },
    {
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      localStorage.setItem("token", res.headers["x-auth-token"]);
      handleLogin();
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleLogin = () => {
    // Set JWT token returned from api server in local storage.
    // setToken(response.headers['x-auth-token']);
    // Change state `isLoggedIn` into true
    dispatch(login());
    // Redirect `/dashboard`
    navigate("/dashboard");
  }

  return (
    <form className="mt-8 space-y-6">
      <div className="-space-y-px">
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          )
        }
      </div>

      <FormAction handleSubmit={handleSubmit} text="ログイン" />
    </form>
  )
}

export default Login;