import styled from 'styled-components';

const TextArea = styled.textarea`
  font-size: 15px;
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1.5px solid rgb(220, 220, 220);
  height: 150px;
  transition: 0.3s;
  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: var(--grey-color-500);
  }
`;

export default TextArea;
