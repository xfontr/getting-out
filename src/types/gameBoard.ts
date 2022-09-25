export type Position = `${number}-${number}`;

export type CellTypes = "blank" | "obstacle" | "player";

export type Board = Map<Position, CellTypes>;
