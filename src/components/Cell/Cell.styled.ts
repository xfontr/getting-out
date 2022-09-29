import styled from "styled-components";

export const CellStyled = styled.div`
  width: 3rem;
  height: 3rem;

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
