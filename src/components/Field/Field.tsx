import Cell from "../Cell/Cell";

type FieldProps = {
  height: number;
  width: number;
  obstacles: [number, number][];
};

const Field = ({ height, width, obstacles }: FieldProps): JSX.Element => {
  const board = new Array(height).fill("").map((_, indexX) =>
    new Array(width).fill("").map((_, indexY) => {
      if (
        obstacles.find(
          (obstacle) => obstacle[0] === indexX && obstacle[1] === indexY
        )
      ) {
        return <Cell cellType="obstacle" position={[indexX, indexY]} />;
      }

      return <Cell cellType="blank" position={[indexX, indexY]} />;
    })
  );

  return <div>{board}</div>;
};

export default Field;
