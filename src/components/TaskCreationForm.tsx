import { TaskStatus } from "../types/TaskStatus";
import { taskFormFields } from "../constants/taskFormField";
import { TaskCreationForm } from "./TaskCreationForm.1";

export interface Props {
  open: boolean
  handleOpen: () => void
  taskStatus: TaskStatus
}

export type Fields = { [key: string]: string }

export const fields = taskFormFields;
export let fieldsState: Fields = {};
fields.forEach(field => fieldsState[field.id]="");

export default TaskCreationForm;