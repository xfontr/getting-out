import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Board, Position } from "../types/gameBoard";
import generateBoard from "../utils/generateBoard/generateBoard";
import {
  getPosition,
  positionOf,
} from "../utils/handlePosition/handlePosition";
import useDirections from "./useDirections";

describe("Given a useDirections function", () => {
  const mockSetCurrentBoard = jest.fn() as React.Dispatch<
    React.SetStateAction<Board>
  >;
  const mockSetPlayer = jest.fn() as React.Dispatch<
    React.SetStateAction<Position>
  >;
  const player: Position = "0-0";
  const board: Board = generateBoard(5);

  describe("When called with a board and a player setter functions, and with a board and a player", () => {
    describe("And the user presses a key down while not being at the board limit", () => {
      test("Then the setter functions should be called to move the player down", async () => {
        const keyboardPress = "d";
        const { row, column } = getPosition(player, keyboardPress);
        const newPosition = positionOf(row, column);

        renderHook(() =>
          useDirections(mockSetCurrentBoard, mockSetPlayer, player, board)
        );

        await userEvent.keyboard(`{${keyboardPress}}`);

        expect(mockSetCurrentBoard).toHaveBeenCalledTimes(2);
        const firstCall = (mockSetCurrentBoard as jest.Mock).mock.calls[0][0];
        const secondCall = (mockSetCurrentBoard as jest.Mock).mock.calls[1][0];

        expect(firstCall.toString()).toBe(
          ((board: Board) => board.set(player, "blank")).toString()
        );
        expect(secondCall.toString()).toBe(
          ((board: Board) => board.set(newPosition, "player")).toString()
        );
        expect(mockSetPlayer).toHaveBeenCalledWith(newPosition);
      });
    });

    describe("And the user presses a key up while being a the board limit", () => {
      test("Then any of the setter functions should be called", async () => {
        const keyboardPress = "w";

        renderHook(() =>
          useDirections(mockSetCurrentBoard, mockSetPlayer, player, board)
        );

        await userEvent.keyboard(`{${keyboardPress}}`);

        expect(mockSetCurrentBoard).not.toHaveBeenCalled();
        expect(mockSetPlayer).not.toHaveBeenCalled();
      });
    });

    describe("And the user presses a key to the right but there is an obstacle", () => {
      test("Then any of the setter functions should be called", async () => {
        const keyboardPress = "d";

        board.set("0-1", "obstacle");

        renderHook(() =>
          useDirections(mockSetCurrentBoard, mockSetPlayer, player, board)
        );

        await userEvent.keyboard(`{${keyboardPress}}`);

        expect(mockSetCurrentBoard).not.toHaveBeenCalled();
        expect(mockSetPlayer).not.toHaveBeenCalled();
      });
    });
  });
});
