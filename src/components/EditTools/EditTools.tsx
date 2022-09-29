import { SyntheticEvent } from "react";
import limitedCells from "../../data/limitedCells";
import { CellTypes } from "../../types/gameBoard";
import initialToCaps from "../../utils/initialToCaps/initialToCaps";
import Button, { ToolButton } from "../Button/Button";
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
      {Object.entries(cells).map(([cell]) => (
        <ToolButton onClick={handleClick} id={cell} key={`tool-${cell}`}>
          <img src="/img/cube.png" alt="Cube" height={50} width={50} />
          {`${initialToCaps(cell)}`}
        </ToolButton>
      ))}
    </EditToolsStyled>
  );
};

export default EditTools;
