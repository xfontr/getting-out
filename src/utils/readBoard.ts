import limitedCells from "../data/limitedCells";
import { Board, CellTypes } from "../types/gameBoard";

export const readBoard = (board: Board): Record<CellTypes, number> => {
  const updatedCells: Record<CellTypes, number> = {
    player: 0,
    exit: 0,
    blank: 0,
    obstacle: 0,
  };

  board.forEach((cell) => {
    updatedCells[cell] = updatedCells[cell] + 1;
  });

  return updatedCells;
};

export const checkIfBoardMaximum = (cell: CellTypes, board: Board): boolean =>
  limitedCells
    .map((currentCell) => cell === currentCell && readBoard(board)[cell] === 1)
    .includes(true);
