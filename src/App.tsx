import { useContext } from "react";
import Field from "./components/Field/Field";
import { GameContext } from "./Store/CallStatusContext/GameContext";
import generateBoard from "./utils/generateBoard";

const boardSize = 10;

const App = (): JSX.Element => {
  const { setGameStatus, shootsLeft } = useContext(GameContext);

  return (
    <>
      <span>
        Shoots left: {shootsLeft} (double click neighbour cell to shoot)
      </span>
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
      <button
        onClick={() => {
          setGameStatus((gameStatus) => ({
            ...gameStatus,
            editTool: "blank",
          }));
        }}
      >
        Blanks
      </button>
      <button
        onClick={() => {
          setGameStatus((gameStatus) => ({
            ...gameStatus,
            editTool: "obstacle",
          }));
        }}
      >
        Obstacles
      </button>
      <Field initialBoard={generateBoard(boardSize)} />
    </>
  );
};

export default App;
