import { FieldProps } from "../../containers/FieldContainer/FieldContainer";
import Field from "../Field/Field";

const FieldPlayer = (props: FieldProps): JSX.Element => {
  const {
    board,
    gameStatus: {
      game: { fieldSize },
    },
  } = props;

  return (
    <Field
      data-testid="field"
      initialBoard={board}
      isEditMode={false}
      fieldSize={fieldSize}
    />
  );
};

export default FieldPlayer;
