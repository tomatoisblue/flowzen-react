import Board from "../types/Board";

const sortBoards = (boards: Board[]): Board[] => {
  if (boards.length === 0) {
    return [];
  }

  const sorted = boards;

  sorted.sort((a, b) => {
    console.log()

    const dateA: any = new Date(a.updatedOn);
    const dateB: any = new Date(b.updatedOn);

    return dateB - dateA;
  })

  return sorted;
}

export default sortBoards;