import axios from "axios";
import apiConfig from "../constants/apiConfig";

export interface LoginProps {
  email: string
  password: string
}

export const login = async ({email, password}: LoginProps): Promise<boolean> => {
  const LOGIN_URL = `${apiConfig.baseUrl}/login`

  try {
    const res = await axios.post(
      LOGIN_URL,
      {
        email,
        password
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    if(!res.headers || !res.headers["x-auth-token"]) {
      return false;
    }
    console.log("JWT=> " + res.headers["x-auth-token"]);
    localStorage.setItem("token", res.headers["x-auth-token"]);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}