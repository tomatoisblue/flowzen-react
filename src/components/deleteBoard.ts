import axios from "axios";
import apiConfig from "../constants/apiConfig";

const deleteBoard = async (boardID: number): Promise<boolean> => {
  console.log("deleteTask()...")
  const URL = `${apiConfig.baseUrl}/boards/${boardID}`;

  const token: string | null = localStorage.getItem("token");
  console.log("token: " + token);

  if (token === null) {
    return false;
  }

  try {
    const res = await axios.delete(URL,{
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      }
    });
    console.log("res...");
    console.log(JSON.stringify(res.data));

    if (res.headers["x-auth-token"] != null) {
      localStorage.setItem("token", res.headers["x-auth-token"]);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export default deleteBoard;