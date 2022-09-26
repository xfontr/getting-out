import { useCallback, useContext } from "react";
import { GameContext } from "../Store/CallStatusContext/GameContext";
import { gameInitialState } from "../Store/CallStatusContext/GameContextProvider";
import { Board } from "../types/gameBoard";
import generateBoard from "../utils/generateBoard";

let timer: NodeJS.Timer;

const usePlaying = () => {
  const { setGameStatus } = useContext(GameContext);

  const startTimer = useCallback(() => {
    timer = setInterval(() => {
      setGameStatus((gameStatus) => ({
        ...gameStatus,
        game: { ...gameStatus.game, timeLeft: gameStatus.game.timeLeft - 1 },
      }));
    }, 1000);
  }, [setGameStatus]);

  const startGame = () => {
    setGameStatus((gameStatus) => ({
      ...gameStatus,
      isEditMode: false,
      isPlaying: true,
    }));

    startTimer();
  };

  const restartGame = (
    setGameBoard: React.Dispatch<React.SetStateAction<Board>>
  ) => {
    setGameStatus(gameInitialState);
    setGameBoard(generateBoard(10));

    clearTimeout(timer);
  };

  const editMode = () => {
    setGameStatus((gameStatus) => ({
      ...gameStatus,
      isEditMode: true,
      isPlaying: false,
    }));

    clearTimeout(timer);
  };

  return { editMode, startGame, restartGame };
};

export default usePlaying;
