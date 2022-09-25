import useCell from "../../hooks/useCell";
import { Board, CellTypes, Position } from "../../types/gameBoard";
import { CellStyled } from "./Cell.styled";

export type CellProps = {
  cellType: CellTypes;
  position: Position;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
};

const Cell = ({ cellType, position, setBoard }: CellProps): JSX.Element => {
  const { attributes } = useCell({ cellType, position, setBoard });

  return <CellStyled {...attributes} />;
};

export default Cell;
