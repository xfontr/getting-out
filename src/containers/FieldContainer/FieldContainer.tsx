import { useContext, useState } from "react";
import usePlaying from "../../hooks/usePlaying";
import {
  GameContext,
  IGameContext,
} from "../../Store/CallStatusContext/GameContext";
import { Board, CellTypes } from "../../types/gameBoard";
import generateBoard from "../../utils/generateBoard";

export const cellsInitialState: Record<CellTypes, number> = {
  player: 1,
  exit: 0,
  blank: 99,
  obstacle: 0,
};

type FieldContainerProps<FieldProps> = {
  WrappedField: ({ ...props }: FieldProps) => JSX.Element;
};

export interface FieldProps {
  setGameStatus: React.Dispatch<React.SetStateAction<IGameContext>>;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  restartGame: (
    setGameBoard: React.Dispatch<React.SetStateAction<Board>>
  ) => void;
  setCells: (value: React.SetStateAction<Record<CellTypes, number>>) => void;
  board: Board;
  cells: Record<CellTypes, number>;
  editTool: CellTypes;
}

const FieldContainer = ({ WrappedField }: FieldContainerProps<FieldProps>) => {
  const {
    setGameStatus,
    editMode: { editTool },
  } = useContext(GameContext);
  const { restartGame } = usePlaying();
  const [board, setBoard] = useState<Board>(generateBoard(10));
  const [cells, setCells] =
    useState<Record<CellTypes, number>>(cellsInitialState);

  const props: FieldProps = {
    board,
    cells,
    editTool,
    setGameStatus,
    restartGame,
    setBoard,
    setCells,
  };

  return <WrappedField {...props} />;
};

export default FieldContainer;
