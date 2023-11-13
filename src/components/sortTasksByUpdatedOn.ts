import Task from "../types/Task";

const sortTasksByUpdatedOn = (tasks: Task[]): Task[] => {
  if (tasks.length === 0) {
    return [];
  }

  let sorted = tasks;

  sorted.sort((a, b) => {
    console.log()

    const dateA: any = new Date(a.updatedOn as string);
    const dateB: any = new Date(b.updatedOn as string);

    return dateB - dateA;
  })

  return sorted;
}

export default sortTasksByUpdatedOn;