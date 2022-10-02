import { useContext, useEffect, useState } from "react";
import boards from "../../data/boards";
import usePlaying from "../../hooks/usePlaying/usePlaying";
import {
  GameContext,
  IGameContext,
} from "../../Store/CallStatusContext/GameContext";
import { Board, CellTypes } from "../../types/gameBoard";
import generateBoard from "../../utils/generateBoard/generateBoard";

export const cellsInitialState: Record<CellTypes, number> = {
  player: 1,
  exit: 0,
  blank: 99,
  obstacle: 0,
};

type FieldContainerProps<FieldProps> = {
  WrappedField: ({ ...props }: FieldProps) => JSX.Element;
  initialBoard?: number | "new";
};

export interface FieldProps {
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  restartGame: (
    setGameBoard: React.Dispatch<React.SetStateAction<Board>>
  ) => void;
  setCells: (value: React.SetStateAction<Record<CellTypes, number>>) => void;
  board: Board;
  cells: Record<CellTypes, number>;
  gameStatus: IGameContext;
}

const setInitialBoard = (board: number | "new"): Board => {
  if (board === "new") {
    return generateBoard(10);
  }
  return boards[board].board;
};

const setInitialStatus = (
  setStatus: React.Dispatch<React.SetStateAction<IGameContext>>,
  board: number | "new"
): void => {
  if (board === "new") {
    return;
  }

  const shootsLeft = boards[board].shoots;
  const exits = boards[board].exits;
  const timeLeft = boards[board].timeLeft;

  setStatus((gameStatus) => ({
    ...gameStatus,
    game: { ...gameStatus.game, timeLeft, shootsLeft, exits },
  }));
};

const FieldContainer = ({
  WrappedField,
  initialBoard = "new",
}: FieldContainerProps<FieldProps>) => {
  const gameStatus = useContext(GameContext);
  const { restartGame } = usePlaying();
  const [board, setBoard] = useState<Board>(setInitialBoard(initialBoard));
  const [cells, setCells] =
    useState<Record<CellTypes, number>>(cellsInitialState);

  useEffect(() => {
    setInitialStatus(gameStatus.setGameStatus, initialBoard);
  }, [gameStatus.setGameStatus, initialBoard]);

  const props: FieldProps = {
    board,
    cells,
    restartGame,
    setBoard,
    setCells,
    gameStatus,
  };

  return <WrappedField {...props} />;
};

export default FieldContainer;
