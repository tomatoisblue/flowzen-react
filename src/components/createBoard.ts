import axios from "axios";
import apiConfig from "../constants/apiConfig";

const createBoard = async (title: string): Promise<boolean> => {
  console.log("createBoard()...")
  const URL = `${apiConfig.baseUrl}/boards`;

  const token: string | null = localStorage.getItem("token");
  console.log("token: " + token);

  if (token === null) {
    return false;
  }

  try {
    const res = await axios.post(URL, { title },{
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      }
    });
    console.log("res...");
    console.log(res.data);

    if (res.headers["x-auth-token"] != null) {
      localStorage.setItem("token", res.headers["x-auth-token"]);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export default createBoard;