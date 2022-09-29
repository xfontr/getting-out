import Field from "../Field/Field";
import { readBoard } from "../../utils/readBoard/readBoard";
import EditTools from "../EditTools/EditTools";
import { FieldProps } from "../../containers/FieldContainer/FieldContainer";
import fieldEditorUtils from "../../utils/fieldEditorUtils/fieldEditorUtils";
import { useEffect, useState } from "react";
import boards from "../../data/boards";
import UserBoard from "../../types/UserBoard";
import initialToCaps from "../../utils/initialToCaps/initialToCaps";

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
    <>
      <p>Current tool: {editTool}</p>

      <ul>
        {Object.entries(cells).map(([type, amount]) => (
          <li key={type}>
            {`${initialToCaps(type)}`}: {amount}
          </li>
        ))}
      </ul>

      <EditTools
        cells={cells}
        editTool={editTool}
        switchEditTool={switchEditTool}
      />

      <button onClick={resetBoard}>Reset board</button>
      <button onClick={increaseSize}>Increase size</button>
      <button onClick={decreaseSize}>Decrease size</button>

      <form>
        <label htmlFor="timer">
          Time limit
          <input
            type="number"
            id="timer"
            onChange={handleChange}
            value={timeLeft}
          />
        </label>
        <label htmlFor="shoots">
          Shoots
          <input
            type="number"
            id="shoots"
            onChange={handleChange}
            value={shoots}
          />
        </label>
      </form>

      <Field
        data-testid="field"
        onClick={() => {
          setCells(readBoard(board));
        }}
        initialBoard={board}
        isEditMode={true}
        fieldSize={fieldSize}
      />

      <button onClick={handleSubmit} type="submit">
        Submit
      </button>
    </>
  );
};

export default FieldEditor;
