import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  button, input, textarea {
    font: inherit;
    border: none;
    outline: none;
  }
  
  a{
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;
