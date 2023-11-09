import axios from "axios";
import apiConfig from "../constants/apiConfig";
import Task from "../types/Task";

const updateTask = async (task: Task, boardID: number, taskID: number): Promise<boolean> => {
  console.log("createTask()...")
  console.log("title: " + task.title + "\nstatus: " + task.status)
  const URL = `${apiConfig.baseUrl}/boards/${boardID}/tasks/${taskID}`;

  const token: string | null = localStorage.getItem("token");
  console.log("token: " + token);

  if (token === null) {
    return false;
  }

  try {
    const res = await axios.patch(URL, {
      taskId: taskID,
      boardId: boardID,
      title: task.title,
      status: task.status,
      description: task.description,
      expirationDate: task.expirationDate,
      url: task.url
    },{
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

export default updateTask;