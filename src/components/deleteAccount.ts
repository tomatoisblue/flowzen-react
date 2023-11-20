import axios from "axios";
import apiConfig from "../constants/apiConfig";

export const deleteAccount = async (): Promise<boolean> => {
  const URL = `${apiConfig.baseUrl}/delete-account`;

  const token: string | null = localStorage.getItem("token");
  console.log("token: " + token);

  if (!token) {
    return false;
  }

  try {
    const res = await axios.delete(URL,{
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      }
    });
    if (res.status === 200) {
      return true;
    }else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }

}