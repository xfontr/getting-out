import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { gameInitialState } from "../Store/CallStatusContext/GameContextProvider";
import { mockSetGameStatus } from "../test-utils/mock/mockContextProvider";
import Wrapper from "../test-utils/mock/Wrapper";
import { Board } from "../types/gameBoard";
import usePlaying from "./usePlaying";

jest.useFakeTimers();

const mockGenerateBoard = jest.fn();

jest.mock("../utils/generateBoard", () => () => mockGenerateBoard);

describe("Given a editMode function returned by a usePlaying function", () => {
  describe("When called", () => {
    test("Then it should update the game status to edit mode", () => {
      const {
        result: {
          current: { editMode },
        },
      } = renderHook(usePlaying, { wrapper: Wrapper });

      act(() => {
        editMode();
      });

      expect(mockSetGameStatus).toHaveBeenCalled();
      const calledWith = (mockSetGameStatus as jest.Mock).mock.calls[0][0]();

      expect(calledWith.isEditMode).toBe(true);
      expect(calledWith.isPlaying).toBe(false);
    });

    test("Then it should clear the current interval", () => {
      window.clearInterval = jest.fn();

      const {
        result: {
          current: { editMode },
        },
      } = renderHook(usePlaying, { wrapper: Wrapper });

      act(() => {
        editMode();
      });

      expect(clearInterval).toHaveBeenCalled();
    });
  });
});

describe("Given a startGame function returned by a usePlaying function", () => {
  describe("When called", () => {
    test("Then it should update the game status to play mode", () => {
      const {
        result: {
          current: { startGame },
        },
      } = renderHook(usePlaying, { wrapper: Wrapper });

      act(() => {
        startGame();
      });

      expect(mockSetGameStatus).toHaveBeenCalled();
      const calledWith = (mockSetGameStatus as jest.Mock).mock.calls[0][0]();

      expect(calledWith.isEditMode).toBe(false);
      expect(calledWith.isPlaying).toBe(true);
    });

    test("Then it should start a interval timer", () => {
      const setInterval = jest.spyOn(window, "setInterval");

      const {
        result: {
          current: { startGame },
        },
      } = renderHook(usePlaying, { wrapper: Wrapper });

      act(() => {
        startGame();
      });

      expect(setInterval).toHaveBeenCalled();
    });

    test("After each second, it should update the time left", () => {
      const seconds = 1;
      const timeToAdvance = seconds * 1000;

      const {
        result: {
          current: { startGame },
        },
      } = renderHook(usePlaying, { wrapper: Wrapper });

      act(() => {
        startGame();
      });

      jest.advanceTimersByTime(timeToAdvance);

      expect(mockSetGameStatus).toHaveBeenCalledTimes(3);
    });
  });
});

describe("Given a resetGame function returned by a usePlaying function", () => {
  describe("When called with a board setter function", () => {
    const mockSetGameBoard = jest.fn() as React.Dispatch<
      React.SetStateAction<Board>
    >;

    test("Then it should update the game status to default and set a new game board", () => {
      const {
        result: {
          current: { restartGame },
        },
      } = renderHook(usePlaying, { wrapper: Wrapper });

      act(() => {
        restartGame(mockSetGameBoard);
      });

      expect(mockSetGameStatus).toHaveBeenCalledWith(gameInitialState);
      expect(mockSetGameBoard).toHaveBeenCalledWith(mockGenerateBoard);
    });

    test("Then it should clear the current interval", () => {
      window.clearInterval = jest.fn();

      const {
        result: {
          current: { restartGame },
        },
      } = renderHook(usePlaying, { wrapper: Wrapper });

      act(() => {
        restartGame(mockSetGameBoard);
      });

      expect(clearInterval).toHaveBeenCalled();
    });
  });
});
