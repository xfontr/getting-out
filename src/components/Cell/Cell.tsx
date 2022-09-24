import CellTypes from "../../types/CellTypes";
import { BlankCell, ObstacleCell, PlayerCell } from "./Cell.styled";

type CellProps = {
  cellType: CellTypes;
  position: string;
};

const Cell = ({ cellType, position }: CellProps): JSX.Element => (
  <>
    {cellType === "blank" && <BlankCell />}
    {cellType === "player" && <PlayerCell />}
    {cellType === "obstacle" && <ObstacleCell />}
  </>
);

export default Cell;
