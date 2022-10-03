import styled from "styled-components";

const FieldEditorStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme: { spacing } }) => spacing.gap};

  .form--edit {
    display: flex;
    gap: ${({ theme: { spacing } }) => spacing.gap};
    margin: 0;
    justify-content: flex-start;
    align-items: flex-start;

    & .form__container {
      min-width: 0;
      max-width: 25%;
    }
  }

  .edit {
    &__options {
      display: flex;
      flex-direction: row;
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
      color: ${({ theme: { colors } }) => colors.primary};
    }
    &__heading {
      display: block;
      width: 100%;
    }
  }
`;

export default FieldEditorStyled;
