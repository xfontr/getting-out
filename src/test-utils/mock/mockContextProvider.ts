import { IGameContext } from "../../Store/CallStatusContext/GameContext";

export const mockSetGameStatus = jest.fn() as React.Dispatch<
  React.SetStateAction<IGameContext>
>;

const mockContextProvider: IGameContext = {
  isEditMode: true,
  isPlaying: false,
  editMode: {
    editTool: "obstacle",
  },
  game: {
    fieldSize: 10,
    exits: 1,
    timeLeft: 3000,
    score: 0,
    shootsLeft: 3,
  },
  setGameStatus: mockSetGameStatus,
};

export default mockContextProvider;
