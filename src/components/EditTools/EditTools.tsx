import { SyntheticEvent } from "react";
import limitedCells from "../../data/limitedCells";
import { CellTypes } from "../../types/gameBoard";
import initialToCaps from "../../utils/initialToCaps/initialToCaps";
import { ToolButton } from "../Button/Button";
import EditToolsStyled from "./EditTools.styled";

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
    limitedCells
      .map((cell) => cells[cell] === 1 && editTool === cell)
      .includes(true) || switchEditTool(event);
  };

  return (
    <EditToolsStyled>
      {Object.entries(cells).map(([cell, amount]) => (
        <div className="tools__group">
          <span className="tools__placed">Placed: {amount}</span>
          <ToolButton
            onClick={handleClick}
            id={cell}
            isActive={editTool === cell}
            key={`tool-${cell}`}
          >
            <img src={`/img/${cell}.png`} alt="Cube" height={35} width={35} />
            {`${initialToCaps(cell)}`}
          </ToolButton>
        </div>
      ))}
    </EditToolsStyled>
  );
};

export default EditTools;
