import { PropsWithChildren, useState } from "react";
import { IGameContext, GameContext } from "./GameContext";

export const gameInitialState: IGameContext = {
  isEditMode: true,
  isPlaying: false,
  editTool: "obstacle",
  game: {
    score: 0,
    shootsLeft: 3,
    timeLeft: 30000,
  },
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