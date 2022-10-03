import limitedCells from "../../data/limitedCells";
import { Board, CellTypes, Position } from "../../types/gameBoard";

export const readBoard = (board: Board): Record<CellTypes, number> => {
  const updatedCells: Record<CellTypes, number> = {
    player: 0,
    exit: 0,
    blank: 0,
    obstacle: 0,
    scoreUp: 0,
  };

  board.forEach((cell) => {
    updatedCells[cell] = updatedCells[cell] + 1;
  });

  return updatedCells;
};

export const getLastCellByType = (
  cellType: CellTypes,
  board: Board
): Position => {
  let foundCell: Position = "0-0";

  board.forEach((cell, position) => {
    if (cell === cellType) {
      foundCell = position;
    }
  });

  return foundCell!;
};

export const checkIfBoardMaximum = (cell: CellTypes, board: Board): boolean =>
  limitedCells
    .map((currentCell) => cell === currentCell && readBoard(board)[cell] === 1)
    .includes(true);
