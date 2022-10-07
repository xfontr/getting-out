import { FieldProps } from "../../containers/FieldContainer/FieldContainer";
import Field from "../Field/Field";
import FieldPlayerStyled from "./FieldPlayer.styled";

const FieldPlayer = (props: FieldProps): JSX.Element => {
  const {
    board,
    gameStatus: {
      game: { fieldSize, shootsLeft, timeLeft, score },
    },
  } = props;

  return (
    <FieldPlayerStyled>
      <header className="header">
        <ul>
          <li>
            Shoots left: {shootsLeft} (double click neighbour cell to shoot)
          </li>
          <li>Score: {score}</li>
          <li>Time left: {timeLeft}</li>
        </ul>
      </header>

      <Field
        data-testid="field"
        initialBoard={board}
        isEditMode={false}
        fieldSize={fieldSize}
      />
    </FieldPlayerStyled>
  );
};

export default FieldPlayer;
