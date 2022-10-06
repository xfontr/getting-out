import boards from "../../data/boards";
import { IGameContext } from "../../Store/CallStatusContext/GameContext";
import { Board } from "../../types/gameBoard";
import generateBoard from "../generateBoard/generateBoard";

export const setInitialBoard = (board: number | "new"): Board => {
  if (board === "new" || boards[board] === undefined) {
    return generateBoard(10);
  }
  return new Map(boards[board].board);
};

export const setInitialStatus = (
  setStatus: React.Dispatch<React.SetStateAction<IGameContext>>,
  board: number | "new"
): void => {
  if (board === "new" || boards[board] === undefined) {
    return;
  }

  const game = {
    shootsLeft: boards[board].shoots,
    exits: boards[board].exits,
    timeLeft: boards[board].timeLeft,
    fieldSize: boards[board].fieldSize,
  };

  setStatus((gameStatus) => ({
    ...gameStatus,
    game: { ...gameStatus.game, ...game },
  }));
};
