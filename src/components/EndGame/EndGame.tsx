import boards from "../../data/boards";
import usePlaying from "../../hooks/usePlaying/usePlaying";
import { IGameContext } from "../../Store/CallStatusContext/GameContext";
import Button from "../Button/Button";

type EndGameProps = {
  gameStatus: IGameContext;
};

const EndGame = ({
  gameStatus: {
    status,
    game: { timeLeft, score },
    setGameStatus,
  },
}: EndGameProps): JSX.Element => {
  const { restartGame, startGame, editMode } = usePlaying();

  return (
    <>
      {status === "fail" && <h3>You lost</h3>}
      {status === "win" && (
        <>
          <h3>You won</h3>
          <p>
            You had {timeLeft} seconds left and your total score is {score}
          </p>
        </>
      )}

      <Button
        onClick={() => {
          restartGame();
          startGame(boards[0].timeLeft);
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
        Go back to edit mode
      </Button>
    </>
  );
};

export default EndGame;
