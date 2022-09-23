import { useEffect, useState } from "react";
import CellTypes from "../../types/CellTypes";

type CellProps = {
  cellType: CellTypes;
  position: [number, number];
};

const Cell = ({ cellType, position }: CellProps): JSX.Element => {
  const [cellState, setCellState] = useState<CellTypes>();

  useEffect(() => {
    setCellState(cellType);
  }, [cellType]);

  return (
    <div>
      {cellState} {position}
    </div>
  );
};

export default Cell;
