import { useContext } from "react";
import FieldEditor from "../FieldEditor/FieldEditor";
import FieldContainer from "../../containers/FieldContainer/FieldContainer";
import { GameContext } from "../../Store/CallStatusContext/GameContext";
import AppStyled from "./App.styled";
import FieldPlayer from "../FieldPlayer/FieldPlayer";
import boards from "../../data/boards";

const App = (): JSX.Element => {
  const { isEditMode, isPlaying } = useContext(GameContext);

  return (
    <AppStyled>
      {isPlaying && (
        <FieldContainer
          WrappedField={FieldPlayer}
          initialBoard={boards.length - 1}
        />
      )}
      {isEditMode && <FieldContainer WrappedField={FieldEditor} />}
    </AppStyled>
  );
};

export default App;
