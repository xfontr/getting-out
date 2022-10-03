import { useCallback, useContext } from "react";
import { GameContext } from "../../Store/CallStatusContext/GameContext";
import { gameInitialState } from "../../Store/CallStatusContext/GameContextProvider";

let timer: NodeJS.Timer;

const usePlaying = () => {
  const { setGameStatus } = useContext(GameContext);

  const startTimer = useCallback(() => {
    timer = setInterval(() => {
      setGameStatus((gameStatus) => ({
        ...gameStatus,
        game: { ...gameStatus.game, timeLeft: gameStatus.game.timeLeft - 1 },
      }));

      setGameStatus((gameStatus) => ({
        ...gameStatus,
        game: { ...gameStatus.game, score: gameStatus.game.score - 1 },
      }));
    }, 1000);
  }, [setGameStatus]);

  const startGame = (): void => {
    setGameStatus((gameStatus) => ({
      ...gameStatus,
      isEditMode: false,
      isPlaying: true,
    }));

    startTimer();
  };

  const restartGame = (): void => {
    setGameStatus(gameInitialState);

    clearInterval(timer);
  };

  const editMode = (): void => {
    setGameStatus((gameStatus) => ({
      ...gameStatus,
      isEditMode: true,
      isPlaying: false,
    }));
  };

  return { editMode, startGame, restartGame };
};

export default usePlaying;
