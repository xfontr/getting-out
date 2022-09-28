import { useCallback, useEffect } from "react";
import { Board, CellTypes, Position } from "../../types/gameBoard";
import {
  checkLimits,
  checkObstacles,
  checkPlatforms,
  getPosition,
  positionOf,
} from "../../utils/handlePosition/handlePosition";

const useMovements = (
  setCurrentBoard: React.Dispatch<React.SetStateAction<Board>>,
  setPlayer: React.Dispatch<React.SetStateAction<Position>>,
  player: Position,
  board: Board,
  isEditMode: boolean
) => {
  const setNewPositions = useCallback(
    (newPosition: Position) => {
      setCurrentBoard((board) => board.set(player, "blank"));
      setPlayer(newPosition);
      setCurrentBoard((board) => board.set(newPosition, "player"));
    },
    [player, setCurrentBoard, setPlayer]
  );

  const handlePlatform = (expectedCell: CellTypes) => {
    console.log("Win");
  };

  const handleKeyPress = useCallback(
    ({ key }: KeyboardEvent) => {
      const { row, column } = getPosition(player, key);

      if (
        checkLimits(row, column, board.size / 10) ||
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
    [player, setNewPositions, board]
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