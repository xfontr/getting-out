import { createContext } from "react";
import { CellTypes } from "../../types/gameBoard";

export interface IGameContext {
  isEditMode: boolean;
  isPlaying: boolean;
  editTool: CellTypes;
  game: {
    shootsLeft: number;
    score: number;
    timeLeft: number;
  };

  setGameStatus: React.Dispatch<React.SetStateAction<IGameContext>>;
}

export const GameContext = createContext<IGameContext>({} as IGameContext);
