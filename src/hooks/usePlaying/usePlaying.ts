import { useCallback, useContext } from "react";
import { GameContext } from "../../Store/CallStatusContext/GameContext";
import { gameInitialState } from "../../Store/CallStatusContext/GameContextProvider";
import { Board } from "../../types/gameBoard";
import generateBoard from "../../utils/generateBoard/generateBoard";

let timer: NodeJS.Timer;

const usePlaying = () => {
  const {
    setGameStatus,
    game: { timeLeft },
  } = useContext(GameContext);

  const startTimer = useCallback(() => {
    timer = setInterval(() => {
      setGameStatus((gameStatus) => ({
        ...gameStatus,
        game: { ...gameStatus.game, timeLeft: gameStatus.game.timeLeft - 1 },
      }));

      if (timeLeft === 0) {
      }
    }, 1000);
  }, [setGameStatus, timeLeft]);

  const startGame = (): void => {
    setGameStatus((gameStatus) => ({
      ...gameStatus,
      isEditMode: false,
      isPlaying: true,
    }));

    startTimer();
  };

  const restartGame = (
    setGameBoard: React.Dispatch<React.SetStateAction<Board>>
  ): void => {
    setGameStatus(gameInitialState);
    setGameBoard(generateBoard(10));

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
