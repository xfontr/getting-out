import styled from "styled-components";

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.gapSmall};
  padding: ${({ theme }) => theme.spacing.paddingBig};
  max-width: 33rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    max-width: 80%;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  & input[type="number"]::-webkit-inner-spin-button,
  & input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  .form {
    &__container {
      & * {
        display: block;
        width: 100%;
      }
    }

    &__label {
      margin-bottom: 0.3rem;
    }

    &__input {
      padding: ${({ theme }) => theme.shapes.rectangularContainer};
      padding-left: 0.8rem;
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.primary};
      border: 1px solid ${({ theme }) => theme.colors.primary};
      width: 100%;
      transition: 0.2s;

      &:focus {
        border-color: ${({ theme }) => theme.colors.secondaryBrigther};
      }
    }
  }
`;

export default FormStyled;
