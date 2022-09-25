import Field from "./components/Field/Field";
import generateBoard from "./utils/generateBoard";

const boardSize = 10;

const App = (): JSX.Element => (
  <Field initialBoard={generateBoard(boardSize)} />
);

export default App;
