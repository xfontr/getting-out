import styled from "styled-components";

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.gapSmall};
  padding: ${({ theme }) => theme.spacing.paddingBig};
  border-radius: ${({ theme }) => theme.shapes.radiusSmall};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
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
      }
    }

    &__label {
      font-size: 1.1rem;
      margin-bottom: 0.3rem;
    }

    &__input {
      font-size: 1.1rem;
      padding: ${({ theme }) => theme.shapes.rectangularContainer};
      padding-left: 0.8rem;
      border-radius: ${({ theme }) => theme.shapes.radiusSmall};
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.secondary};
      border: 1px solid ${({ theme }) => theme.colors.primaryDark};
      width: 100%;
      transition: 0.2s;

      &:focus {
        border-color: ${({ theme }) => theme.colors.secondaryBrigther};
      }
    }
  }
`;

export default FormStyled;
