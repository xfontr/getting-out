import { PropsWithChildren, useState } from "react";
import { IGameContext, GameContext } from "./GameContext";

export const gameInitialState: IGameContext = {
  status: "edit",
  editMode: {
    editTool: "obstacle",
  },
  game: {
    fieldSize: 10,
    exits: 1,
    score: 5000,
    shootsLeft: 3,
    timeLeft: 10,
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
