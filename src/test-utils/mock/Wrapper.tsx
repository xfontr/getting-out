import { PropsWithChildren } from "react";
import { GameContext } from "../../Store/CallStatusContext/GameContext";
import mockContextProvider from "./mockContextProvider";

const Wrapper = ({ children }: PropsWithChildren): JSX.Element => (
  <GameContext.Provider value={mockContextProvider}>
    {children}
  </GameContext.Provider>
);

export default Wrapper;
