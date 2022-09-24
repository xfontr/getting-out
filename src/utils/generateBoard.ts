import CellTypes from "../types/CellTypes";
import Position from "../types/Position";

const generateBoard = (size: number): Map<Position, CellTypes> => {
  const cells = new Map<Position, CellTypes>();

  new Array(size)
    .fill(null)
    .map((_, indexX) =>
      new Array(size)
        .fill(null)
        .forEach((_, indexY) => cells.set(`${indexX}-${indexY}`, "blank"))
    );

  return cells;
};

export default generateBoard;
