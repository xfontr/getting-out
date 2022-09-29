import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GameContextProvider from "./Store/CallStatusContext/GameContextProvider";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/600.css";
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import mainTheme from "./styles/mainTheme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GameContextProvider>
      <ThemeProvider theme={mainTheme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </GameContextProvider>
  </React.StrictMode>
);
