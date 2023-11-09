import { TaskStatus } from "./TaskStatus"

export default interface Task {
  taskId?: number
  title: string
  status: TaskStatus
  description?: string | null
  expirationDate?: Date | null
  url?: string | null
  boardId?: number | null
  updatedOn?: string | null
  createdOn?: string | null
}