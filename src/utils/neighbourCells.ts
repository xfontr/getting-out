import { Board, Position } from "../types/gameBoard";
import { columnOf, rowOf } from "./handlePosition";

const neighbourCells = (position: Position, board: Board) => {
  const row = rowOf(position);
  const column = columnOf(position);
  const neighbours: Position[] = [];

  board.forEach((_, cellPosition) => {
    const cellRow = rowOf(cellPosition);
    const cellColumn = columnOf(cellPosition);

    if (
      cellRow >= row - 1 &&
      cellRow <= row + 1 &&
      cellColumn >= column - 1 &&
      cellColumn <= column + 1
    ) {
      neighbours.push(cellPosition);
    }
  });

  return neighbours;
};

export default neighbourCells;
