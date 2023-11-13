import { TaskStatus } from "../types/TaskStatus";

export const taskStatusValidation = (status: TaskStatus): boolean  => {
  if (status === ("TODO" || "IN_PROGRESS" || "DONE")) {
    console.log("task status validation FAILED")
    return false
  }
  console.log("task status validation APPROVED")
  return true;
}
