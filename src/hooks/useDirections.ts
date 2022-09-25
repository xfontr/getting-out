import { useCallback, useEffect } from "react";
import Directions from "../types/Directions";
import { Board, Position } from "../types/gameBoard";

const keys: Record<string, Directions> = {
  w: "up",
  ArrowUp: "up",

  d: "right",
  ArrowRight: "right",

  s: "down",
  ArrowDown: "down",

  a: "left",
  ArrowLeft: "left",
};

const directionValues = {
  up: [-1, 0],
  down: [+1, 0],
  right: [0, +1],
  left: [0, -1],
};

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

  const checkLimits = (row: number, column: number, size: number): boolean =>
    row < 0 || column < 0 || row >= size || column >= size;

  const checkObstacles = (position: Position, board: Board): boolean =>
    board.get(position) === "obstacle";

  const getPosition = (player: Position, key: string) => ({
    row: +Array.from(player)[0] + directionValues[keys[key]][0],
    column: +Array.from(player)[2] + directionValues[keys[key]][1],
  });

  const handleKeyPress = useCallback(
    ({ key }: KeyboardEvent) => {
      const { row, column } = getPosition(player, key);

      if (
        !checkLimits(row, column, board.size / 10) &&
        !checkObstacles(`${row}-${column}`, board)
      ) {
        setNewPositions(`${row}-${column}`);
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
