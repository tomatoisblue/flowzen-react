import { TaskStatus } from "../types/TaskStatus";

const taskStatusToString = (status: TaskStatus): String | undefined  => {
  let converted: TaskStatus | undefined;
  switch (status) {
    case "TODO":
      converted = "TODO";
      break;
    case "IN_PROGRESS":
      converted = "IN_PROGRESS";
      break;
    case "DONE":
      converted = "DONE";
      break;
    default:
      console.log("taskStatusToString error")
  }
  return converted;
}

export default taskStatusToString;