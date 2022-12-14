import { createContext } from "react";
import { CellTypes } from "../../types/gameBoard";

export interface IGameContext {
  status: "edit" | "play" | "fail" | "win";
  editMode: {
    editTool: CellTypes;
  };
  game: {
    fieldSize: number;
    exits: number;
    shootsLeft: number;
    score: number;
    timeLeft: number;
  };

  setGameStatus: React.Dispatch<React.SetStateAction<IGameContext>>;
}

export const GameContext = createContext<IGameContext>({} as IGameContext);
