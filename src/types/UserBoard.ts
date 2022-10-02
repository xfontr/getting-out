import { Board } from "./gameBoard";

export type UserBoard = {
  shoots: number;
  timeLeft: number;
  exits: number;
  board: Board;
};

export type UserBoards = UserBoard[];
