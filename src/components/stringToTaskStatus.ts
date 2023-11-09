import { TaskStatus } from "../types/TaskStatus";

const stringToTaskSTatus = (status: string): TaskStatus | undefined => {
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
      console.log("stringToTaskStatus error")
  }
  return converted;
}

export default stringToTaskSTatus;