import styled from "styled-components";

const ButtonStyled = styled.button`
  padding: ${({ theme }) => theme.shapes.rectangularContainer};
  border-radius: ${({ theme }) => theme.shapes.radiusSmall};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid transparent;
  width: fit-content;
  display: inline-block;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  user-select: none;

  &:hover {
    box-shadow: ${({ theme }) => theme.shapes.shortShadow};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.secondary};
  }

  &:active {
    transform: scale(0.95);
  }

  &.button {
    &--outline {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.secondary};
      border: 1px solid ${({ theme }) => theme.colors.secondary};

      &:hover {
        background-color: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.primary};
        border: 1px solid transparent;
      }
    }

    &--tool {
      width: 100px;
      height: 100px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default ButtonStyled;
