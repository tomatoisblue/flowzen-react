import axios from "axios";
import apiConfig from "../constants/apiConfig";
import Board from "../types/Board";



const getAllBoards = async (): Promise<Board[]> => {
  const URL: string = `${apiConfig.baseUrl}/boards`;

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
    console.log("getAllBoards:");
    console.log("data: " + res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default getAllBoards;