import Directions from "../types/Directions";
import { Board, Position } from "../types/gameBoard";

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

export const checkLimits = (
  row: number,
  column: number,
  size: number
): boolean => row < 0 || column < 0 || row >= size || column >= size;

export const checkObstacles = (position: Position, board: Board): boolean =>
  board.get(position) === "obstacle";

export const getPosition = (player: Position, key: string) => ({
  row: +Array.from(player)[0] + keyValue[keys[key]][0],
  column: +Array.from(player)[2] + keyValue[keys[key]][1],
});
