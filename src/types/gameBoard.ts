export type Position = `${number}-${number}`;

export type CellTypes =
  | "blank"
  | "obstacle"
  | "player"
  | "exit"
  | "scoreUp"
  | "death";

export type Board = Map<Position, CellTypes>;
