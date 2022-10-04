import { IGameContext } from "../../Store/CallStatusContext/GameContext";
import { gameInitialState } from "../../Store/CallStatusContext/GameContextProvider";
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
}: EndGameProps): JSX.Element => (
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
        setGameStatus({
          ...gameInitialState,
          status: "play",
        });
      }}
    >
      Play again
    </Button>

    <Button
      onClick={() => {
        setGameStatus({
          ...gameInitialState,
          status: "edit",
        });
      }}
    >
      Go back to edit mode
    </Button>
  </>
);

export default EndGame;
