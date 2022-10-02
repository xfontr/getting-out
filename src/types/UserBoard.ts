import { Board } from "./gameBoard";

export type UserBoard = {
  fieldSize: number;
  shoots: number;
  timeLeft: number;
  exits: number;
  board: Board;
};

export type UserBoards = UserBoard[];
