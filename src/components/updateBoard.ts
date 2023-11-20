import axios from "axios";
import apiConfig from "../constants/apiConfig";
import Board from "../types/Board"

export const updateBoard = async(board: Board): Promise<boolean> => {
  console.log("updateTask()...")
  const URL = `${apiConfig.baseUrl}/boards/${board.boardId}`;

  const token: string | null = localStorage.getItem("token");
  console.log("token: " + token);

  if (!token) {
    return false;
  }

  try {
    const res = await axios.patch(URL, {
      title: board.title,
      boardId: board.boardId,
    },{
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