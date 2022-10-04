import { useCallback, useContext, useEffect } from "react";
import {
  GameContext,
  IGameContext,
} from "../../Store/CallStatusContext/GameContext";
import { Board, CellTypes, Position } from "../../types/gameBoard";
import getScoreRatio from "../../utils/getScoreRatio/getScoreRatio";
import {
  checkLimits,
  checkObstacles,
  checkPlatforms,
  getPosition,
  positionOf,
} from "../../utils/handlePosition/handlePosition";
import usePlaying from "../usePlaying/usePlaying";

const useMovements = (
  setCurrentBoard: React.Dispatch<React.SetStateAction<Board>>,
  setPlayer: React.Dispatch<React.SetStateAction<Position>>,
  player: Position,
  board: Board,
  fieldSize: number,
  isEditMode: boolean
) => {
  const {
    setGameStatus,
    game: { timeLeft },
  } = useContext<IGameContext>(GameContext);
  const { restartGame } = usePlaying();

  const setNewPositions = useCallback(
    (newPosition: Position) => {
      setCurrentBoard((board) => board.set(player, "blank"));
      setPlayer(newPosition);
      setCurrentBoard((board) => board.set(newPosition, "player"));
    },
    [player, setCurrentBoard, setPlayer]
  );

  const handlePlatform = useCallback(
    (cell: CellTypes) => {
      switch (cell) {
        case "exit":
          restartGame();
          break;

        case "scoreUp":
          setGameStatus((gameStatus) => ({
            ...gameStatus,
            game: {
              ...gameStatus.game,
              score: gameStatus.game.score + getScoreRatio(timeLeft),
            },
          }));
          break;
      }
    },
    [setGameStatus, restartGame, timeLeft]
  );

  const handleKeyPress = useCallback(
    ({ key }: KeyboardEvent) => {
      const { row, column } = getPosition(player, key);

      if (
        checkLimits(row, column, fieldSize) ||
        checkObstacles(positionOf(row, column), board)
      ) {
        return;
      }

      const expectedCell = checkPlatforms(positionOf(row, column), board);

      if (expectedCell) {
        handlePlatform(expectedCell);
      }

      setNewPositions(positionOf(row, column));
    },
    [player, setNewPositions, board, handlePlatform, fieldSize]
  );

  useEffect(() => {
    if (isEditMode) {
      return;
    }

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, isEditMode]);
};

export default useMovements;
