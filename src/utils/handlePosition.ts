import Directions from "../types/Directions";
import { Board, CellTypes, Position } from "../types/gameBoard";

const keys: Record<string, Directions> = {
  w: "up",
  ArrowUp: "up",

  d: "right",
  ArrowRight: "right",

  s: "down",
  ArrowDown: "down",

  a: "left",
  ArrowLeft: "left",
};

const keyValue = {
  up: [-1, 0],
  down: [+1, 0],
  right: [0, +1],
  left: [0, -1],
};

export const positionOf = (row: number, column: number): Position =>
  `${row}-${column}`;

export const rowOf = (position: Position) => +Array.from(position)[0];
export const columnOf = (position: Position) => +Array.from(position)[2];

export const checkLimits = (
  row: number,
  column: number,
  size: number
): boolean => row < 0 || column < 0 || row >= size || column >= size;

export const checkObstacles = (position: Position, board: Board): boolean =>
  board.get(position) === "obstacle";

export const checkPlatforms = (
  position: Position,
  board: Board
): CellTypes | null => {
  const cell = board.get(position);
  if (cell === "obstacle" || cell === "blank") {
    return null;
  }
  return cell!;
};

export const getPosition = (player: Position, key: KeyboardEvent["key"]) => ({
  row: rowOf(player) + keyValue[keys[key]][0],
  column: columnOf(player) + keyValue[keys[key]][1],
});
