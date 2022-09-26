import { useContext, useState } from "react";
import Field from "./components/Field/Field";
import usePlaying from "./hooks/usePlaying";
import { GameContext } from "./Store/CallStatusContext/GameContext";
import { Board } from "./types/gameBoard";
import generateBoard from "./utils/generateBoard";

const boardSize = 10;

const App = (): JSX.Element => {
  const {
    isEditMode,
    setGameStatus,
    game: { shootsLeft, timeLeft },
  } = useContext(GameContext);
  const { startGame, editMode, restartGame } = usePlaying();
  const [gameBoard, setGameBoard] = useState<Board>(generateBoard(boardSize));

  return (
    <>
      {isEditMode || (
        <>
          <p>
            Shoots left: {shootsLeft} (double click neighbour cell to shoot)
          </p>

          <p>Time left: {timeLeft}</p>
        </>
      )}

      <button
        onClick={() => {
          editMode();
        }}
      >
        Edit mode
      </button>

      <button
        onClick={() => {
          restartGame(setGameBoard);
        }}
      >
        Restart
      </button>

      {isEditMode && (
        <>
          <button
            onClick={() => {
              startGame();
            }}
          >
            Start game
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
        </>
      )}
      <Field initialBoard={gameBoard} />
    </>
  );
};

export default App;
