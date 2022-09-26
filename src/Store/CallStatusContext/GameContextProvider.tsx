import { PropsWithChildren, useState } from "react";
import { IGameContext, GameContext } from "./GameContext";

const gameInitialState: IGameContext = {
  isEditMode: true,
  editTool: "obstacle",
  shootsLeft: 3,
  setGameStatus: () => {},
};

const GameContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [gameStatus, setGameStatus] = useState<IGameContext>(gameInitialState);

  return (
    <GameContext.Provider
      value={{
        ...gameStatus,
        setGameStatus,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
