import { useContext, useEffect, useState } from "react";
import usePlaying from "../../hooks/usePlaying/usePlaying";
import {
  GameContext,
  IGameContext,
} from "../../Store/CallStatusContext/GameContext";
import { Board, CellTypes } from "../../types/gameBoard";
import {
  setInitialBoard,
  setInitialStatus,
} from "../../utils/fieldPlayerUtils/fieldPlayerUtils";

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
    debugger;
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
