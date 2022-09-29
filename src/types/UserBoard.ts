import { Board } from "./gameBoard";

type UserBoard = {
  shoots: number;
  timeLeft: number;
  exits: number;
  board: Board;
};

export default UserBoard;
