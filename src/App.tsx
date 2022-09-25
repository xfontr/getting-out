import { useContext } from "react";
import Field from "./components/Field/Field";
import { GameContext } from "./Store/CallStatusContext/GameContext";
import generateBoard from "./utils/generateBoard";

const boardSize = 10;

const App = (): JSX.Element => {
  const { setGameStatus } = useContext(GameContext);

  return (
    <>
      <button
        onClick={() => {
          setGameStatus((gameStatus) => ({
            ...gameStatus,
            isEditMode: !gameStatus.isEditMode,
          }));
        }}
      >
        Toggle edit mode
      </button>
      <Field initialBoard={generateBoard(boardSize)} />
    </>
  );
};

export default App;
