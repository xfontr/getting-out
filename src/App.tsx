import Field from "./components/Field/Field";
import generateBoard from "./utils/generateBoard";

const boardSize = 4;

const App = (): JSX.Element => <Field board={generateBoard(boardSize)} />;

export default App;
