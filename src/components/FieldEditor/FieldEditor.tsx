import Field from "../Field/Field";
import { readBoard } from "../../utils/readBoard/readBoard";
import EditTools from "../EditTools/EditTools";
import { FieldProps } from "../../containers/FieldContainer/FieldContainer";
import fieldEditorUtils from "../../utils/fieldEditorUtils/fieldEditorUtils";
import { SyntheticEvent, useEffect } from "react";
import boards from "../../data/boards";
import { UserBoard } from "../../types/UserBoard";
import Button, { IconButton } from "../Button/Button";
import FieldEditorStyled from "./FieldEditor.styled";
import Form from "../Form/Form";
import editFieldForm from "../../schemas/editField.form";
import useForm from "../../hooks/useForm/useForm";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import usePlaying from "../../hooks/usePlaying/usePlaying";

const FieldEditor = (props: FieldProps): JSX.Element => {
  const {
    switchEditTool,
    resetBoard,
    disableTools,
    increaseSize,
    decreaseSize,
  } = fieldEditorUtils(props);

  const {
    cells,
    board,
    setCells,
    gameStatus: {
      editMode: { editTool },
      game: { fieldSize },
    },
  } = props;
  const { values, inputProps } = useForm(editFieldForm);
  const { startGame } = usePlaying();

  useEffect(() => {
    disableTools();
  }, [cells, disableTools]);

  const handleSubmit = ({ currentTarget: { id } }: SyntheticEvent) => {
    if (cells.player < 1 || cells.exit < 1) {
      return;
    }

    const newBoard: UserBoard = {
      shoots: +values.shoots,
      timeLeft: +values.timeLeft,
      exits: cells.exit,
      fieldSize,
      board,
    };

    boards.push(newBoard);

    if (id === "play") {
      startGame(+values.timeLeft);
    }
  };

  return (
    <FieldEditorStyled>
      <div className="edit__options">
        <div className="options__container">
          <span className="options__heading">Field size</span>
          <div className="options__field-size">
            <IconButton
              onClick={decreaseSize}
              aria-label="increase"
              data-testid="increase"
            >
              <HiOutlineMinus />
            </IconButton>
            {fieldSize}
            <IconButton
              onClick={increaseSize}
              aria-label="decrease"
              data-testid="decrease"
            >
              <HiOutlinePlus />
            </IconButton>
          </div>
        </div>

        <Form
          inputProps={inputProps}
          schema={editFieldForm}
          values={values}
          className="form--edit"
        />
      </div>

      <EditTools
        cells={cells}
        editTool={editTool}
        switchEditTool={switchEditTool}
      />

      <Field
        data-testid="field"
        onClick={() => {
          setCells(readBoard(board));
        }}
        initialBoard={board}
        isEditMode={true}
        fieldSize={fieldSize}
      />
      <div className="edit__options">
        <Button onClick={resetBoard}>Reset board</Button>
        <Button onClick={handleSubmit} type="submit" id="play">
          Submit and play
        </Button>
      </div>
    </FieldEditorStyled>
  );
};

export default FieldEditor;
