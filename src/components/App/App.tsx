import { useContext } from "react";
import FieldEditor from "../FieldEditor/FieldEditor";
import FieldContainer from "../../containers/FieldContainer/FieldContainer";
import { GameContext } from "../../Store/CallStatusContext/GameContext";
import AppStyled from "./App.styled";
import FieldPlayer from "../FieldPlayer/FieldPlayer";
import boards from "../../data/boards";
import EndGame from "../EndGame/EndGame";

const App = (): JSX.Element => {
  const gameStatus = useContext(GameContext);
  const { status } = gameStatus;

  return (
    <AppStyled>
      {status === "play" && (
        <FieldContainer
          WrappedField={FieldPlayer}
          initialBoard={boards.length - 1}
        />
      )}
      {status === "edit" && <FieldContainer WrappedField={FieldEditor} />}
      {(status === "win" || status === "fail") && (
        <EndGame gameStatus={gameStatus} />
      )}
    </AppStyled>
  );
};

export default App;
