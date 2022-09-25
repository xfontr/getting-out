import { useCallback, useEffect } from "react";
import { Board, Position } from "../types/gameBoard";
import {
  checkLimits,
  checkObstacles,
  getPosition,
  positionOf,
} from "../utils/handlePosition";

const useDirections = (
  setCurrentBoard: React.Dispatch<React.SetStateAction<Board>>,
  setPlayer: React.Dispatch<React.SetStateAction<Position>>,
  player: Position,
  board: Board
) => {
  const setNewPositions = useCallback(
    (newPosition: Position) => {
      setCurrentBoard((board) => board.set(player, "blank"));
      setPlayer(newPosition);
      setCurrentBoard((board) => board.set(newPosition, "player"));
    },
    [player, setCurrentBoard, setPlayer]
  );

  const handleKeyPress = useCallback(
    ({ key }: KeyboardEvent) => {
      const { row, column } = getPosition(player, key);

      if (
        !checkLimits(row, column, board.size / 10) &&
        !checkObstacles(positionOf(row, column), board)
      ) {
        setNewPositions(positionOf(row, column));
      }
    },
    [player, setNewPositions, board]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
};

export default useDirections;
