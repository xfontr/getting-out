import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { GameContext } from "../../Store/CallStatusContext/GameContext";
import GlobalStyles from "../../styles/GlobalStyles";
import mainTheme from "../../styles/mainTheme";
import mockGameContext from "../mock/mockContextProvider";

const Wrapper = ({ children }: PropsWithChildren): JSX.Element => (
  <ThemeProvider theme={mainTheme}>
    <GameContext.Provider value={mockGameContext}>
      <GlobalStyles />
      {children}
    </GameContext.Provider>
  </ThemeProvider>
);

export default Wrapper;
