import styled from "styled-components";

export const CellStyled = styled.div`
  width: 3rem;
  height: 3rem;

  cursor: crosshair;

  background-position: center;
  background-repeat: no-repeat;
  background-size: 3rem;

  &.blank {
    background-image: none;
  }

  &.scoreUp {
    background-image: url("img/scoreUp.png");
    background-size: 2.5rem;
  }

  &.player {
    border-radius: ${({ theme: { shapes } }) => shapes.radiusSmall};
    padding: 0.1rem;
    border: 2px dotted ${({ theme: { colors } }) => colors.secondary};
    box-shadow: inset 8px 8px 15px 8px rgba(253, 240, 213, 0.2);
  }

  &.obstacle {
    background-image: url("img/obstacle.png");
  }

  &.exit {
    background-image: url("img/exit.png");
    background-size: 2rem;
  }

  &.death {
    background-image: url("img/death.png");
    background-size: 2rem;
  }
`;
