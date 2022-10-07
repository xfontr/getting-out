import boards from "../../data/boards";
import usePlaying from "../../hooks/usePlaying/usePlaying";
import { IGameContext } from "../../Store/CallStatusContext/GameContext";
import { OutlineButton } from "../Button/Button";
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
      <header className="header">
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

        <div className="options">
          <OutlineButton
            onClick={() => {
              restartGame();
              startGame(boards[boards.length - 1].timeLeft);
            }}
          >
            Play again
          </OutlineButton>

          <OutlineButton
            onClick={() => {
              restartGame();
              editMode();
            }}
          >
            Edit mode
          </OutlineButton>
        </div>
      </header>

      <Field
        initialBoard={boards[0].board}
        isEditMode={true}
        className="read-only"
        fieldSize={fieldSize}
        data-testid="field"
      />
    </EndGameStyled>
  );
};

export default EndGame;
