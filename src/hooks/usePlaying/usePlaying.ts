import { useCallback, useContext } from "react";
import { GameContext } from "../../Store/CallStatusContext/GameContext";
import { gameInitialState } from "../../Store/CallStatusContext/GameContextProvider";
import getScoreRatio from "../../utils/getScoreRatio/getScoreRatio";

let timer: NodeJS.Timer;

const usePlaying = () => {
  const { setGameStatus } = useContext(GameContext);

  const restartGame = useCallback((): void => {
    setGameStatus(gameInitialState);
    clearInterval(timer);
  }, [setGameStatus]);

  const startTimer = (timeLeft: number) => {
    let time = timeLeft;

    timer = setInterval(() => {
      setGameStatus((gameStatus) => ({
        ...gameStatus,
        game: {
          ...gameStatus.game,
          timeLeft: gameStatus.game.timeLeft - 1,
        },
      }));

      time -= 1;

      setGameStatus((gameStatus) => ({
        ...gameStatus,
        game: {
          ...gameStatus.game,
          score: gameStatus.game.score - getScoreRatio(timeLeft),
        },
      }));

      if (time === 0) {
        restartGame();
      }
    }, 1000);
  };

  const startGame = (timeLeft: number): void => {
    setGameStatus((gameStatus) => ({
      ...gameStatus,
      status: "play",
    }));

    startTimer(timeLeft);
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
