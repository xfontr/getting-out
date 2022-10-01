import Field from "../Field/Field";
import { readBoard } from "../../utils/readBoard/readBoard";
import EditTools from "../EditTools/EditTools";
import { FieldProps } from "../../containers/FieldContainer/FieldContainer";
import fieldEditorUtils from "../../utils/fieldEditorUtils/fieldEditorUtils";
import { useEffect } from "react";
import boards from "../../data/boards";
import UserBoard from "../../types/UserBoard";
import Button, { IconButton } from "../Button/Button";
import FieldEditorStyled from "./FieldEditor.styled";
import Form from "../Form/Form";
import editFieldForm from "../../schemas/editField.form";
import useForm from "../../hooks/useForm/useForm";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";

const FieldEditor = (props: FieldProps): JSX.Element => {
  const {
    switchEditTool,
    resetBoard,
    disableTools,
    increaseSize,
    decreaseSize,
  } = fieldEditorUtils(props);

  const { editTool, cells, board, setCells, fieldSize } = props;
  const { values, inputProps } = useForm(editFieldForm);

  useEffect(() => {
    disableTools();
  }, [cells, disableTools]);

  const handleSubmit = () => {
    const newBoard: UserBoard = {
      shoots: +values.shoots,
      timeLeft: +values.timeLeft,
      exits: cells.exit,
      board,
    };

    boards.push(newBoard);
  };

  return (
    <FieldEditorStyled>
      <Form inputProps={inputProps} schema={editFieldForm} values={values} />

      <EditTools
        cells={cells}
        editTool={editTool}
        switchEditTool={switchEditTool}
      />

      <div className="edit__options">
        <Button onClick={resetBoard}>Reset board</Button>
        <div className="options__container">
          <span className="options__heading">Field size</span>
          <div className="options__field-size">
            <span className="options__heading">Size: {fieldSize}</span>
            <IconButton onClick={decreaseSize}>
              <HiOutlineMinus />
            </IconButton>
            <IconButton onClick={increaseSize}>
              <HiOutlinePlus />
            </IconButton>
          </div>
        </div>
      </div>

      <Field
        data-testid="field"
        onClick={() => {
          setCells(readBoard(board));
        }}
        initialBoard={board}
        isEditMode={true}
        fieldSize={fieldSize}
      />

      <Button onClick={handleSubmit} type="submit">
        Submit
      </Button>
    </FieldEditorStyled>
  );
};

export default FieldEditor;
