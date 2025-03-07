import styled from 'styled-components';

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 800;
  color: var(--primary-color-900);
  text-transform: uppercase;
  margin-right: ${(props) => props.mr || props.mx || '0'};
  margin-left: ${(props) => props.ml || props.mx || '0'};
  margin-top: ${(props) => props.mt || props.my || '0'};
  margin-bottom: ${(props) => props.mb || props.my || '10px'};
`;

const OptionalSpan = styled.span`
  margin-left: 2.5px;
  color: rgb(150, 150, 150);
  font-weight: 400;
`;

export default function Label({ children, htmlFor, optional, ...margins }) {
  return (
    <StyledLabel htmlFor={htmlFor} {...margins}>
      {children}
      {optional && <OptionalSpan>(Optional)</OptionalSpan>}
    </StyledLabel>
  );
}
