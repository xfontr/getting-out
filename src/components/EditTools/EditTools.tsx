import { SyntheticEvent } from "react";
import limitedCells from "../../data/limitedCells";
import { CellTypes } from "../../types/gameBoard";

type EditToolsProps = {
  cells: Record<CellTypes, number>;
  editTool: CellTypes;
  switchEditTool: (event: SyntheticEvent) => void;
};

const EditTools = ({
  cells,
  editTool,
  switchEditTool,
}: EditToolsProps): JSX.Element => {
  const handleClick = (event: SyntheticEvent) => {
    debugger;
    limitedCells
      .map((cell) => cells[cell] === 1 && editTool === cell)
      .includes(true) || switchEditTool(event);
  };

  return (
    <>
      {Object.entries(cells).map(([cell]) => (
        <button onClick={handleClick} id={cell} key={`tool-${cell}`}>
          {`${cell.charAt(0).toUpperCase()}${cell.slice(1)}`}
        </button>
      ))}
    </>
  );
};

export default EditTools;
