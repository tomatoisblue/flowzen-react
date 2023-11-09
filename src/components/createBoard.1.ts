import apiConfig from "../constants/apiConfig";
import { BoardDTO } from "./createBoard";

export const createBoard = async (title: BoardDTO): Promise => {
  const URL = `${apiConfig.baseUrl}/boards`;

  const token: string | null = localStorage.getItem("token");
  console.log("token: " + token);

  if (token === null) {
    return;
  }

  try {
    const res = await axios.post(URL, { title }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      }
    });

    if (res.headers["x-auth-token"] != null) {
      localStorage;

    }
  }
  finally {
  }
};
