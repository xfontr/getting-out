import CellTypes from "../../types/CellTypes";
import Position from "../../types/Position";
import { BlankCell, ObstacleCell, PlayerCell } from "./Cell.styled";

type CellProps = {
  cellType: CellTypes;
  position: Position;
};

const Cell = ({ cellType, position }: CellProps): JSX.Element => (
  <>
    {cellType === "blank" && <BlankCell data-testid="blank" />}
    {cellType === "player" && <PlayerCell data-testid="player" />}
    {cellType === "obstacle" && <ObstacleCell data-testid="obstacle" />}
  </>
);

export default Cell;
