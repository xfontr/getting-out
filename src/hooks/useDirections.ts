import { useCallback, useEffect } from "react";
import CellTypes from "../types/CellTypes";
import Directions from "../types/Directions";
import Position from "../types/Position";

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
  setCurrentBoard: React.Dispatch<
    React.SetStateAction<Map<Position, CellTypes>>
  >,
  setPlayer: React.Dispatch<React.SetStateAction<Position>>,
  player: Position
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
      const row = +Array.from(player)[0] + directionValues[keys[key]][0];
      const column = +Array.from(player)[2] + directionValues[keys[key]][1];
      setNewPositions(`${row}-${column}`);
    },
    [player, setNewPositions]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
};

export default useDirections;
