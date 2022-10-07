import styled from "styled-components";

const FieldEditorStyled = styled.section`
  .header {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme: { spacing } }) => spacing.gap};
    padding: ${({ theme: { spacing } }) => spacing.gapBig};

    background-color: ${({ theme: { colors } }) => colors.contrast};
    color: ${({ theme: { colors } }) => colors.secondary};
  }

  .form--edit {
    display: flex;
    gap: ${({ theme: { spacing } }) => spacing.gap};
    margin: 0;
    justify-content: flex-start;
    align-items: flex-start;

    & .form__container {
      min-width: 0;
      max-width: 100%;

      @media (min-width: ${({ theme: { breakpoints } }) => breakpoints.large}) {
        max-width: 25%;
      }
    }
  }

  .edit {
    &__options {
      display: flex;
      flex-direction: column;
      gap: ${({ theme: { spacing } }) => spacing.gap};
    }
  }

  .options {
    &__field-size {
      margin-top: 5px;
      display: flex;
      align-items: center;
      gap: ${({ theme: { spacing } }) => spacing.gapSmall};
      padding: 0.2rem 0;
      border: 1px solid transparent;
      font-weight: bold;

      .field-size__current {
        width: 2rem;
        text-align: center;
      }
    }
    &__heading {
      display: block;
      width: 100%;
    }
  }

  .options__buttons {
    margin-top: auto;
    gap: ${({ theme: { spacing } }) => spacing.gap};
    display: flex;

    button {
      color: ${({ theme: { colors } }) => colors.secondary};
      border-color: ${({ theme: { colors } }) => colors.secondary};
    }
  }
`;

export default FieldEditorStyled;
