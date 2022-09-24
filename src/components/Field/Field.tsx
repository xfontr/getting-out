import CellTypes from "../../types/CellTypes";
import Position from "../../types/Position";
import Cell from "../Cell/Cell";

type FieldProps = {
  board: Map<Position, CellTypes>;
};

const Field = ({ board }: FieldProps): JSX.Element => {
  const renderBoard: JSX.Element[] = [];

  board.set("0-0", "player");

  board.forEach((type, position) => {
    renderBoard.push(
      <Cell cellType={type} position={position} key={position} />
    );
  });

  return <div>{renderBoard}</div>;
};

export default Field;
