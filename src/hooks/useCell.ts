import { useContext, useEffect, useState } from "react";
import { CellProps } from "../components/Cell/Cell";
import { GameContext } from "../Store/CallStatusContext/GameContext";
import { CellTypes } from "../types/gameBoard";

const useCell = ({ cellType, position, setBoard }: CellProps) => {
  const [currentCellType, setCurrentCellType] = useState<CellTypes>();
  const { isEditMode, editTool } = useContext(GameContext);

  useEffect(() => {
    setCurrentCellType(cellType);
  }, [setCurrentCellType, cellType]);

  const attributes = {
    onClick: () => {
      if (!isEditMode) {
        return;
      }
      setCurrentCellType(editTool);
      setBoard((board) => board.set(position, editTool));
    },
    className: currentCellType,
    "data-testid": cellType,
  };

  return { attributes };
};

export default useCell;
