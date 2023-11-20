import axios from "axios";
import apiConfig from "../constants/apiConfig";
import Board from "../types/Board";

const createBoard = async (board: Board): Promise<boolean> => {
  console.log("createBoard()...")
  const URL = `${apiConfig.baseUrl}/boards`;

  const token: string | null = localStorage.getItem("token");
  console.log("token: " + token);

  if (!token) {
    return false;
  }

  try {
    const res = await axios.post(URL, { title: board.title },{
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      }
    });

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