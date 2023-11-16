import axios from "axios"
import apiConfig from "../constants/apiConfig"

export interface SignupProps {
  username: string
  email: string
  password: string
  confirmPassword: string
}
export const signup = async({username, email, password, confirmPassword}: SignupProps): Promise<boolean> => {
  const SIGNUP_URL = `${apiConfig.baseUrl}/signup`

  try {
    const res = await axios.post(
      SIGNUP_URL,
      {
        username,
        email,
        password,
        confirmPassword
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      });

    console.log("signup res => ")
    console.log(JSON.stringify(res))
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}