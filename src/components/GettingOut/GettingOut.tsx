import { useContext } from "react";
import FieldEditor from "../FieldEditor/FieldEditor";
import FieldContainer from "../../containers/FieldContainer/FieldContainer";
import { GameContext } from "../../Store/CallStatusContext/GameContext";
import FieldPlayer from "../FieldPlayer/FieldPlayer";
import boards from "../../data/boards";
import EndGame from "../EndGame/EndGame";
import GettingOutStyled from "./GettingOut.styled";

const GettingOut = (): JSX.Element => {
  const gameStatus = useContext(GameContext);
  const { status } = gameStatus;

  return (
    <GettingOutStyled>
      <h1 className="game__heading">Getting out</h1>
      <p className="game__subheading">
        You have to reach the exit cell before running out of time. You can
        double click neighbour cells to destroy them.
      </p>
      {status === "play" && (
        <FieldContainer
          WrappedField={FieldPlayer}
          initialBoard={boards.length - 1}
        />
      )}
      {status === "edit" && (
        <FieldContainer
          WrappedField={FieldEditor}
          initialBoard={boards.length - 1}
        />
      )}
      {(status === "win" || status === "fail") && (
        <EndGame gameStatus={gameStatus} />
      )}
    </GettingOutStyled>
  );
};

export default GettingOut;
