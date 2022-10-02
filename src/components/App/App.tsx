import { useContext } from "react";
import FieldEditor from "../FieldEditor/FieldEditor";
import FieldContainer from "../../containers/FieldContainer/FieldContainer";
import { GameContext } from "../../Store/CallStatusContext/GameContext";
import AppStyled from "./App.styled";
import FieldPlayer from "../FieldPlayer/FieldPlayer";

const App = (): JSX.Element => {
  const {
    isEditMode,
    isPlaying,
    game: { shootsLeft, timeLeft },
  } = useContext(GameContext);

  return (
    <AppStyled>
      {isPlaying && (
        <>
          <p>
            Shoots left: {shootsLeft} (double click neighbour cell to shoot)
          </p>

          <p>Time left: {timeLeft}</p>

          <FieldContainer WrappedField={FieldPlayer} initialBoard={0} />
        </>
      )}
      {isEditMode && <FieldContainer WrappedField={FieldEditor} />}
    </AppStyled>
  );
};

export default App;
