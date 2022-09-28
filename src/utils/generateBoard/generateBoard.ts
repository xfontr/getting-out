import { CellTypes, Position } from "../../types/gameBoard";

const generateBoard = (size: number): Map<Position, CellTypes> => {
  const cells = new Map<Position, CellTypes>();

  new Array(size)
    .fill(null)
    .map((_, indexX) =>
      new Array(size)
        .fill(null)
        .forEach((_, indexY) => cells.set(`${indexX}-${indexY}`, "blank"))
    );

  cells.set("1-1", "player");

  return cells;
};

export default generateBoard;
