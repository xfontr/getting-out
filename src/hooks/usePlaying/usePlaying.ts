import { useContext } from "react";
import { GameContext } from "../../Store/CallStatusContext/GameContext";
import { gameInitialState } from "../../Store/CallStatusContext/GameContextProvider";
import getScoreRatio from "../../utils/getScoreRatio/getScoreRatio";

let timer: NodeJS.Timer;

export const endTimer = () => clearInterval(timer);

const usePlaying = () => {
  const {
    setGameStatus,
    game: { timeLeft },
  } = useContext(GameContext);

  const restartGame = (): void => {
    endTimer();
    setGameStatus(gameInitialState);
  };

  const startTimer = (timeLeft: number) => {
    let time = timeLeft;
    timer = setInterval(() => {
      time -= 1;

      setGameStatus((gameStatus) => ({
        ...gameStatus,
        game: {
          ...gameStatus.game,
          timeLeft: gameStatus.game.timeLeft - 1,
          score: gameStatus.game.score - getScoreRatio(timeLeft),
        },
      }));

      if (time === 0) {
        setGameStatus((gameStatus) => ({
          ...gameStatus,
          status: "fail",
        }));
        endTimer();
      }
    }, 1000);
  };

  const startGame = (time: number = timeLeft): void => {
    setGameStatus((gameStatus) => ({
      ...gameStatus,
      status: "play",
    }));

    startTimer(time);
  };

  const editMode = (): void => {
    setGameStatus((gameStatus) => ({
      ...gameStatus,
      status: "edit",
    }));
  };

  return { editMode, startGame, restartGame };
};

export default usePlaying;
