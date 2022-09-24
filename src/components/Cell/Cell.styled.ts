import styled from "styled-components";

export const CellStyled = styled.div`
  width: 3rem;
  height: 3rem;
`;

export const BlankCell = styled(CellStyled)`
  background-color: pink;
`;

export const PlayerCell = styled(CellStyled)`
  background-color: purple;
`;

export const ObstacleCell = styled(CellStyled)`
  background-color: brown;
`;
