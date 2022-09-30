import { useContext } from "react";
import FieldEditor from "../FieldEditor/FieldEditor";
import FieldContainer from "../../containers/FieldContainer/FieldContainer";
import { GameContext } from "../../Store/CallStatusContext/GameContext";
import AppStyled from "./App.styled";

const App = (): JSX.Element => {
  const {
    isEditMode,
    game: { shootsLeft, timeLeft },
  } = useContext(GameContext);

  return (
    <AppStyled>
      {isEditMode || (
        <>
          <p>
            Shoots left: {shootsLeft} (double click neighbour cell to shoot)
          </p>

          <p>Time left: {timeLeft}</p>
        </>
      )}
      <FieldContainer WrappedField={FieldEditor} />;
    </AppStyled>
  );
};

export default App;
