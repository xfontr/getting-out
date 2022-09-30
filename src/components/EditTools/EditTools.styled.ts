import styled from "styled-components";

const EditToolsStyled = styled.div`
  display: flex;
  gap: ${({ theme: { spacing } }) => spacing.gap};

  .tools__group {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default EditToolsStyled;
