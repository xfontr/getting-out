import { PropsWithChildren, useState } from "react";
import { createContext } from "vm";
import { IGameContext } from "../../Store/CallStatusContext/GameContext";
import { gameInitialState } from "../../Store/CallStatusContext/GameContextProvider";

const MockGameContext = createContext({} as IGameContext);

const MockGameContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const [gameStatus, setGameStatus] = useState<IGameContext>(gameInitialState);

  return (
    <MockGameContext.Provider
      value={{
        ...gameStatus,
        setGameStatus,
      }}
    >
      {children}
    </MockGameContext.Provider>
  );
};

export default MockGameContextProvider;
