import styled from 'styled-components';

const StyledButton = styled.button`
  text-align: center;
  border-radius: 10px;
  transition-duration: 0.3s;
  color: white;
  background-color: var(--primary-color-500);
  border: 1.5px solid var(--primary-color-500);
  padding: 10px 25px;
  font-size: 15px;
  font-weight: 600;
  width: ${({ width }) => width || 'fit-content'};
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  margin-right: ${({ mr }) => mr};
  text-transform: ${({ textTransform }) => textTransform || 'capitalize'};
  cursor: pointer;

  &:hover {
    background-color: var(--primary-color-600);
  }

  &[href] {
    display: inline-block;
    text-decoration: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: auto;
    &:hover {
      background-color: var(--primary-color-500);
    }
  }
`;

function PrimaryButton({ to, children, ...props }) {
  if (to) {
    return (
      <StyledButton as="a" href={to} {...props}>
        {children}
      </StyledButton>
    );
  }
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default PrimaryButton;
