import { act } from "react-dom/test-utils";
import { gameInitialState } from "../../Store/CallStatusContext/GameContextProvider";
import { renderHook } from "../../test-utils/customRender/customRender";
import { mockSetGameStatus } from "../../test-utils/mock/mockContextProvider";
import { Board } from "../../types/gameBoard";
import usePlaying from "./usePlaying";

jest.useFakeTimers();

describe("Given a editMode function returned by a usePlaying function", () => {
  describe("When called", () => {
    test("Then it should update the game status to edit mode", () => {
      const {
        result: {
          current: { editMode },
        },
      } = renderHook(usePlaying);

      act(() => {
        editMode();
      });

      expect(mockSetGameStatus).toHaveBeenCalled();
      const calledWith = (mockSetGameStatus as jest.Mock).mock.calls[0][0]();

      expect(calledWith.status).toBe("edit");
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
      } = renderHook(usePlaying);

      act(() => {
        startGame();
      });

      expect(mockSetGameStatus).toHaveBeenCalled();
      const calledWith = (mockSetGameStatus as jest.Mock).mock.calls[0][0]();

      expect(calledWith.status).toBe("play");
    });

    test("Then it should start a interval timer", () => {
      const setInterval = jest.spyOn(window, "setInterval");

      const {
        result: {
          current: { startGame },
        },
      } = renderHook(usePlaying);

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
      } = renderHook(usePlaying);

      act(() => {
        startGame();
      });

      jest.advanceTimersByTime(timeToAdvance);

      expect(mockSetGameStatus).toHaveBeenCalledTimes(5);
    });
  });
});

describe("Given a restartGame function returned by a usePlaying function", () => {
  describe("When called with a board setter function", () => {
    const mockSetGameBoard = jest.fn() as React.Dispatch<
      React.SetStateAction<Board>
    >;

    test("Then it should update the game status to default", () => {
      const {
        result: {
          current: { restartGame },
        },
      } = renderHook(usePlaying);

      act(() => {
        restartGame(mockSetGameBoard);
      });

      expect(mockSetGameStatus).toHaveBeenCalledWith(gameInitialState);
    });

    test("Then it should clear the current interval", () => {
      window.clearInterval = jest.fn();

      const {
        result: {
          current: { restartGame },
        },
      } = renderHook(usePlaying);

      act(() => {
        restartGame(mockSetGameBoard);
      });

      expect(clearInterval).toHaveBeenCalled();
    });
  });
});
