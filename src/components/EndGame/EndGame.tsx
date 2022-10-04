import { IGameContext } from "../../Store/CallStatusContext/GameContext";

type EndGameProps = {
  gameStatus: IGameContext;
};

const EndGame = ({
  gameStatus: {
    status,
    game: { timeLeft, score },
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
  </>
);

export default EndGame;
