import CellTypes from "../../types/CellTypes";

type CellProps = {
  cellType: CellTypes;
  position: string;
};

const Cell = ({ cellType, position }: CellProps): JSX.Element => (
  <div>
    {cellType} {position}
  </div>
);

export default Cell;
