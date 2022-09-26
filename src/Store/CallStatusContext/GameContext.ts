import { createContext } from "react";
import { CellTypes } from "../../types/gameBoard";

export interface IGameContext {
  isEditMode: boolean;
  editTool: CellTypes;
  shootsLeft: number;
  setGameStatus: React.Dispatch<React.SetStateAction<IGameContext>>;
}

export const GameContext = createContext<IGameContext>({} as IGameContext);
