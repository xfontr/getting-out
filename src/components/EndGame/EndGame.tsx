import boards from "../../data/boards";
import usePlaying from "../../hooks/usePlaying/usePlaying";
import { IGameContext } from "../../Store/CallStatusContext/GameContext";
import Button from "../Button/Button";
import Field from "../Field/Field";
import EndGameStyled from "./EndGame.styled";

type EndGameProps = {
  gameStatus: IGameContext;
};

const EndGame = ({
  gameStatus: {
    status,
    game: { timeLeft, score, fieldSize },
  },
}: EndGameProps): JSX.Element => {
  const { restartGame, startGame, editMode } = usePlaying();

  return (
    <EndGameStyled>
      {status === "fail" && (
        <>
          <h3>You lost</h3>
          <p>You'll have better luck next time!</p>
        </>
      )}
      {status === "win" && (
        <>
          <h3>You won</h3>
          <p>
            You had {timeLeft} seconds left and your total score is {score}.
            Good job!
          </p>
        </>
      )}

      <Field
        initialBoard={boards[0].board}
        isEditMode={true}
        className="read-only"
        fieldSize={fieldSize}
        data-testid="field"
      />

      <div className="options">
        <Button
          onClick={() => {
            restartGame();
            startGame(boards[boards.length - 1].timeLeft);
          }}
        >
          Play again
        </Button>

        <Button
          onClick={() => {
            restartGame();
            editMode();
          }}
        >
          Edit mode
        </Button>
      </div>
    </EndGameStyled>
  );
};

export default EndGame;
