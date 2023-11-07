import { useEffect, useState } from "react";
import axios from "axios";
import { loginFields } from "../constants/formField";
import Input from "./Input";
import FormAction from "./FormAction";
import apiConfig from "../constants/apiConfig";
import { useNavigate } from "react-router-dom";


type Fields ={ [key: string]: string }

const fields = loginFields;
let fieldsState: Fields = {};
fields.forEach(field => fieldsState[field.id]="");


const Login: React.FC = () => {
  const [loginState, setLoginState] = useState<Fields>(fieldsState);
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  const LOGIN_URL = `${apiConfig.baseUrl}/login`;

  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLoginState({...loginState, [e.target.id]:e.target.value})
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    console.log("handle submit");
    e.preventDefault();
    authenticateUser();
  }


  const authenticateUser = async() => {
    console.log("attempt authentication")
    axios.post(LOGIN_URL, {
      email: loginState["email-address"],
      password: loginState["password"],
    }).then((res) => {
      console.log(res);
      setToken(res.headers['x-auth-token']);
      navigate("/dashboard");
    }).catch((err) => {
      console.log(err);
    });
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