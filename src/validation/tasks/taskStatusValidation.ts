import { TaskStatus } from "../../types/TaskStatus";

export const taskStatusValidation = (status: TaskStatus): boolean  => {
  if (status !== "TODO" && status != "IN_PROGRESS" && status !== "DONE") {
    console.log("task status validation FAILED")
    return false;
  }
  console.log("task status validation APPROVED")
  return true;
}
