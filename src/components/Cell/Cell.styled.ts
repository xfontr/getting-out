import styled from "styled-components";

export const CellStyled = styled.div`
  width: 3rem;
  height: 3rem;

  border: 1px dotted rgba(110, 48, 75, 0.1);
  cursor: crosshair;

  &.blank {
    background-color: pink;
  }

  &.player {
    background-color: purple;
  }

  &.obstacle {
    background-color: brown;
  }

  &.exit {
    background-color: gray;
  }
`;
