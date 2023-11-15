import Board from "../types/Board";

// Sort Board Array in Newest First Order
const sortBoards = (boards: Board[]): Board[] => {
  if (boards.length === 0) {
    return [];
  }

  const sorted = boards;

  sorted.sort((a, b) => {
    console.log()

    const dateA: number = new Date(a.updatedOn).getTime();
    const dateB: number = new Date(b.updatedOn).getTime();

    return dateB - dateA;
  })

  return sorted;
}

export default sortBoards;