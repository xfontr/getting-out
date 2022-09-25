import { createContext } from "react";
import { CellTypes } from "../../types/gameBoard";

export interface IGameContext {
  isEditMode: boolean;
  editTool: CellTypes;
  setGameStatus: React.Dispatch<React.SetStateAction<IGameContext>>;
}

export const GameContext = createContext<IGameContext>({} as IGameContext);
