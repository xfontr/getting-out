import { IGameContext } from "../../Store/CallStatusContext/GameContext";

export const mockSetGameStatus = jest.fn() as React.Dispatch<
  React.SetStateAction<IGameContext>
>;

const mockGameContext: IGameContext = {
  status: "edit",
  editMode: {
    editTool: "obstacle",
  },
  game: {
    fieldSize: 10,
    exits: 1,
    timeLeft: 10,
    score: 0,
    shootsLeft: 3,
  },
  setGameStatus: mockSetGameStatus,
};

export default mockGameContext;
