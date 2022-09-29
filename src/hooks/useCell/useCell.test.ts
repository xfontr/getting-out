import { renderHook } from "../../test-utils/customRender/customRender";
import { Board, CellTypes, Position } from "../../types/gameBoard";
import generateBoard from "../../utils/generateBoard/generateBoard";
import useCell from "./useCell";

describe("Given a useCell function", () => {
  describe("When called with a type of cell, a position and a board setter function", () => {
    const cellType: CellTypes = "obstacle";
    const position: Position = "1-1";
    const player: Position = "2-2";
    const board = generateBoard(10);
    const setBoard = jest.fn() as React.Dispatch<React.SetStateAction<Board>>;

    const handleClick = () => {};
    const shoot = () => {};

    test("Then it should return the cell attributes", () => {
      const expectedAttributes = {
        onClick: handleClick,
        onDoubleClick: shoot,
        className: "obstacle",
        "data-testid": "obstacle",
      };

      const {
        result: {
          current: { attributes },
        },
      } = renderHook(() =>
        useCell({ cellType, position, player, board, setBoard })
      );

      expect(JSON.stringify(attributes)).toBe(
        JSON.stringify(expectedAttributes)
      );
    });
  });
});
