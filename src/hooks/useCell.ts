import { useContext, useEffect, useState } from "react";
import { CellProps } from "../components/Cell/Cell";
import { GameContext } from "../Store/CallStatusContext/GameContext";
import { CellTypes } from "../types/gameBoard";
import neighbourCells from "../utils/neighbourCells";

const useCell = ({
  cellType,
  position,
  player,
  board,
  setBoard,
}: CellProps) => {
  const [currentCellType, setCurrentCellType] = useState<CellTypes>(cellType);
  const {
    isEditMode,
    editTool,
    game: { shootsLeft },
    setGameStatus,
  } = useContext(GameContext);

  useEffect(() => {
    setCurrentCellType(cellType);
  }, [setCurrentCellType, cellType]);

  const shoot = () => {
    const neighbours = neighbourCells(player, board);

    if (
      isEditMode ||
      (neighbours.includes(position) && player !== position && shootsLeft)
    ) {
      setCurrentCellType("blank");
      setBoard((board) => board.set(position, "blank"));
      isEditMode ||
        setGameStatus((gameStatus) => ({
          ...gameStatus,
          game: {
            ...gameStatus.game,
            shootsLeft: gameStatus.game.shootsLeft - 1,
          },
        }));
    }
  };

  const handleClick = () => {
    if (!isEditMode || player === position) {
      return;
    }

    setCurrentCellType(editTool);
    setBoard((board) => board.set(position, editTool));
  };

  const attributes = {
    onClick: handleClick,
    onDoubleClick: shoot,
    className: currentCellType,
    "data-testid": cellType,
  };

  return { attributes };
};

export default useCell;
