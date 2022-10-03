import { FieldProps } from "../../containers/FieldContainer/FieldContainer";
import Field from "../Field/Field";

const FieldPlayer = (props: FieldProps): JSX.Element => {
  const {
    board,
    gameStatus: {
      game: { fieldSize, shootsLeft, timeLeft, score },
    },
  } = props;

  return (
    <>
      <p>Shoots left: {shootsLeft} (double click neighbour cell to shoot)</p>
      <p>Score: {score}</p>
      <p>Time left: {timeLeft}</p>

      <Field
        data-testid="field"
        initialBoard={board}
        isEditMode={false}
        fieldSize={fieldSize}
      />
    </>
  );
};

export default FieldPlayer;
