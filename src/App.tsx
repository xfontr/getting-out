import { useContext } from "react";
import FieldEditor from "./components/FieldEditor/FieldEditor";
import FieldContainer from "./containers/FieldContainer/FieldContainer";
import usePlaying from "./hooks/usePlaying";
import { GameContext } from "./Store/CallStatusContext/GameContext";

const App = (): JSX.Element => {
  const {
    isEditMode,
    game: { shootsLeft, timeLeft },
  } = useContext(GameContext);
  const { editMode: setEditMode } = usePlaying();

  return (
    <>
      {isEditMode || (
        <>
          <p>
            Shoots left: {shootsLeft} (double click neighbour cell to shoot)
          </p>

          <p>Time left: {timeLeft}</p>
        </>
      )}
      <button
        onClick={() => {
          setEditMode();
        }}
      >
        Edit mode
      </button>
      <FieldContainer WrappedField={FieldEditor} />;
    </>
  );
};

export default App;
