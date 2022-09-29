import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { GameContext } from "../../Store/CallStatusContext/GameContext";
import mainTheme from "../../styles/mainTheme";
import mockContextProvider from "../mock/mockContextProvider";

const Wrapper = ({ children }: PropsWithChildren): JSX.Element => (
  <ThemeProvider theme={mainTheme}>
    <GameContext.Provider value={mockContextProvider}>
      {children}
    </GameContext.Provider>
  </ThemeProvider>
);

export default Wrapper;
