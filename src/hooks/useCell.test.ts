import { renderHook } from "@testing-library/react";
import { Board, CellTypes, Position } from "../types/gameBoard";
import useCell from "./useCell";

describe("Given a useCell function", () => {
  describe("When called with a type of cell, a position and a board setter function", () => {
    const cellType: CellTypes = "obstacle";
    const position: Position = "1-1";
    const setBoard = jest.fn() as React.Dispatch<React.SetStateAction<Board>>;
    const handleClick = () => {};

    test("Then it should return the cell attributes", () => {
      const expectedAttributes = {
        onClick: handleClick,
        className: "obstacle",
        "data-testid": "obstacle",
      };

      const {
        result: {
          current: { attributes },
        },
      } = renderHook(() => useCell({ cellType, position, setBoard }));

      expect(JSON.stringify(attributes)).toBe(
        JSON.stringify(expectedAttributes)
      );
    });
  });
});
