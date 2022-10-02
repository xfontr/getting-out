import styled from "styled-components";

const ButtonStyled = styled.button`
  padding: ${({ theme }) => theme.shapes.rectangularContainer};
  border-radius: ${({ theme }) => theme.shapes.radiusSmall};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid transparent;
  width: fit-content;
  height: fit-content;

  display: flex;
  align-items: center;
  gap: ${({ theme: { spacing } }) => spacing.gapSmall};

  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  user-select: none;

  &:hover {
    box-shadow: ${({ theme: { shapes } }) => shapes.shortShadow};
    background-color: ${({ theme: { colors } }) => colors.primary};
    color: ${({ theme: { colors } }) => colors.secondary};
    border: 1px solid ${({ theme: { colors } }) => colors.secondary};
  }

  &:active {
    transform: scale(0.95);
  }

  &.button {
    &--outline {
      background-color: transparent;
      color: ${({ theme: { colors } }) => colors.secondary};
      border: 1px solid ${({ theme: { colors } }) => colors.secondary};

      svg {
        border: 1px solid ${({ theme: { colors } }) => colors.secondary};
        background-color: ${({ theme: { colors } }) => colors.secondary};
        color: ${({ theme: { colors } }) => colors.primary};
        border-radius: 50%;
        width: 1.8rem;
        height: 1.8rem;
        padding: 0.2rem;
        margin: -1rem 0;
        box-shadow: ${({ theme: { shapes } }) => shapes.shortShadow};
      }

      &:hover {
        background-color: ${({ theme: { colors } }) => colors.secondary};
        color: ${({ theme: { colors } }) => colors.primary};
        border: 1px solid transparent;

        svg {
          border: 1px solid ${({ theme: { colors } }) => colors.secondary};
          background-color: ${({ theme: { colors } }) => colors.primary};
          color: ${({ theme: { colors } }) => colors.secondary};
          transform: scale(1.3);
        }
      }
    }

    &--tool {
      width: 100px;
      height: 100px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      transition: 0s;
    }

    &--active {
      transition: 0;
      border-width: 2px;
    }

    &--icon {
      border-radius: 50%;
      width: 2.4rem;
      height: 2.4rem;
      display: flex;
      justify-content: center;
      padding: 0.2rem;

      & svg {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
`;

export default ButtonStyled;
