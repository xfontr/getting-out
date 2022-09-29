import Field from "../Field/Field";
import { readBoard } from "../../utils/readBoard/readBoard";
import EditTools from "../EditTools/EditTools";
import { FieldProps } from "../../containers/FieldContainer/FieldContainer";
import fieldEditorUtils from "../../utils/fieldEditorUtils/fieldEditorUtils";
import { useEffect, useState } from "react";
import boards from "../../data/boards";
import UserBoard from "../../types/UserBoard";
import initialToCaps from "../../utils/initialToCaps/initialToCaps";
import Button from "../Button/Button";
import FieldEditorStyled from "./FieldEditor.styled";

const valuesInitialState = {
  shoots: 3,
  timeLeft: 10,
};

const FieldEditor = (props: FieldProps): JSX.Element => {
  const {
    switchEditTool,
    resetBoard,
    disableTools,
    increaseSize,
    decreaseSize,
  } = fieldEditorUtils(props);
  const { editTool, cells, board, setCells, fieldSize } = props;

  const [values, setValues] =
    useState<typeof valuesInitialState>(valuesInitialState);
  const { timeLeft, shoots } = values;

  useEffect(() => {
    disableTools();
  }, [cells, disableTools]);

  const handleChange = ({
    currentTarget: { id, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [id]: value });
  };

  const handleSubmit = () => {
    const newBoard: UserBoard = {
      shoots,
      timeLeft,
      exits: cells.exit,
      board,
    };

    boards.push(newBoard);
  };

  return (
    <FieldEditorStyled>
      <ul>
        <li>Selected tool: {initialToCaps(editTool)}</li>
        <li>Field size: {fieldSize}</li>
      </ul>

      <ul>
        {Object.entries(cells).map(([type, amount]) => (
          <li key={type}>
            {`${initialToCaps(type)}`}: {amount}
          </li>
        ))}
      </ul>

      <form>
        <label htmlFor="timeLeft">Time limit</label>
        <input
          type="number"
          id="timeLeft"
          onChange={handleChange}
          value={timeLeft}
        />
        <label htmlFor="shoots">Shoots</label>
        <input
          type="number"
          id="shoots"
          onChange={handleChange}
          value={shoots}
        />
      </form>

      <EditTools
        cells={cells}
        editTool={editTool}
        switchEditTool={switchEditTool}
      />

      <div className="edit__options">
        <Button onClick={resetBoard}>Reset board</Button>
        <Button onClick={increaseSize}>Increase size</Button>
        <Button onClick={decreaseSize}>Decrease size</Button>
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
