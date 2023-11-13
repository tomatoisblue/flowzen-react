import { taskDescriptionValidation } from "./taskDescriptionValidation";
import { taskStatusValidation } from "./taskStatusValidation";
import { taskTitleValidation } from "./taskTitleValidation";
import { taskUrlValidation } from "./taskUrlValidation";

export const validateTaskForm = (field: string, value: any): boolean  => {
  switch (field) {
    case "title":
      return taskTitleValidation(value);
    case "status":
      return taskStatusValidation(value);
    case "description":
      return taskDescriptionValidation(value);
    case "expiration-date":
      return true;
    case "url":
      return taskUrlValidation(value);
    default:
      return false
  }
}