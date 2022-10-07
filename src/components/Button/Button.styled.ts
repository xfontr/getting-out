import styled from "styled-components";

const ButtonStyled = styled.button`
  padding: ${({ theme }) => theme.shapes.rectangularContainer};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  border: 2px solid transparent;
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
  }

  &:active {
    transform: scale(0.95);
  }

  &.button {
    &--outline {
      background-color: transparent;
      color: ${({ theme: { colors } }) => colors.primary};
      border: 1px solid ${({ theme: { colors } }) => colors.primary};
      font-weight: normal;

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
        border: 1px solid;
        font-weight: bold;
        box-shadow: none;

        svg {
          border: 1px solid ${({ theme: { colors } }) => colors.secondary};
          background-color: ${({ theme: { colors } }) => colors.primary};
          color: ${({ theme: { colors } }) => colors.secondary};
          transform: scale(1.3);
        }
      }

      &:active {
        transform: none;
      }
    }

    &--tool {
      width: 6rem;
      height: 6rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: 0.1s;
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme: { colors } }) => colors.contrast};
      border: 2px solid ${({ theme }) => theme.colors.secondary};
      font-weight: normal;

      &:hover {
        background-color: ${({ theme: { colors } }) => colors.secondary};
        border-color: transparent;
        font-weight: bold;
        box-shadow: none;
      }
    }

    &--active {
      transition: 0s;
      border-width: 2px;
      font-weight: bold;
      box-shadow: inset 8px 8px 22px 8px rgba(0, 0, 0, 0.3);
    }

    &--icon {
      border-radius: 50%;
      width: 2.4rem;
      height: 2.4rem;
      display: flex;
      justify-content: center;
      padding: 0.2rem;
      background-color: ${({ theme }) => theme.colors.secondary};
      border: solid 2px ${({ theme }) => theme.colors.primary};

      & svg {
        width: 1.8rem;
        height: 1.8rem;
        color: ${({ theme }) => theme.colors.primary};
      }

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary};

        & svg {
          color: ${({ theme }) => theme.colors.secondary};
        }
      }
    }
  }
`;

export default ButtonStyled;
