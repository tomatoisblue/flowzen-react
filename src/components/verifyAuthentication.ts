import axios from "axios"
import apiConfig from "../constants/apiConfig";

const verifyAuthentication = async(): Promise<boolean> => {
  console.log("verifyAuthentication")
  const VERIFY_URL = `${apiConfig.baseUrl}/verify-token`;

  const token: string | null = localStorage.getItem("token");
  console.log("token: " + token);

  if (token === null) {
    return false;
  }

  console.log("post request")
  try {
    const res = await axios.post(VERIFY_URL, null, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      }
    });
    console.log("varification res: " + res);
    localStorage.setItem("token", res.headers["x-auth-token"]);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export default verifyAuthentication;