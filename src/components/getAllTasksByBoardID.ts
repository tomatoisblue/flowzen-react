import axios from "axios";
import apiConfig from "../constants/apiConfig";
import Task from "../types/Task";

const getAllTasksByBoardID = async (boardId: number): Promise<Task[]> => {
  const URL: string = `${apiConfig.baseUrl}/boards/${boardId}`;
  console.log("REQUESTING >>> " + URL);

  const token: string | null = localStorage.getItem("token");
  console.log("token: " + token);

  if (token === null) {
    return [];
  }

  try {
    const res = await axios.get(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      }
    });
    localStorage.setItem("token", res.headers["x-auth-token"]);
    console.log("getAllTasksByBoardID:");
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default getAllTasksByBoardID;