import { taskValidationErrorMessages } from "../../constants/taskValidationErrorMessages";
import { TaskStatus } from "../../types/TaskStatus";

export const taskStatusValidation = (status: TaskStatus): [boolean, string]  => {
  if (status === ("TODO" || "IN_PROGRESS" || "DONE")) {
    console.log("task status validation FAILED")
    return [false, taskValidationErrorMessages.status];
  }
  console.log("task status validation APPROVED")
  return [true, ""];
}
