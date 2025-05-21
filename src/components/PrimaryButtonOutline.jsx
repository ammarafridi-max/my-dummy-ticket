'use client';
import styled from 'styled-components';

const StyledButton = styled.button`
  text-align: center;
  border-radius: 10px;
  transition-duration: 0.3s;
  color: var(--accent-color-500);
  background-color: transparent;
  border: 1.5px solid var(--accent-color-500);
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 700;
  width: ${({ width }) => width || 'fit-content'};
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  margin-right: ${({ mr }) => mr};
  text-transform: ${({ textTransform }) => textTransform || 'capitalize'};
  cursor: pointer;
  &:hover {
    background-color: var(--accent-color-500);
    border-color: var(--accent-color-500);
    color: white;
  }

  &[href] {
    display: inline-block;
    text-decoration: none;
  }

  &:disabled {
    opacity: 0.6;
    background-color: var(--accent-color-500);
    border-color: var(--accent-color-500);
    color: white;
    cursor: auto;
    &:hover {
      background-color: var(--accent-color-500);
      border-color: var(--accent-color-500);
      color: white;
    }
  }
`;

function PrimaryButtonOutline({ to, children, ...props }) {
  if (to) {
    return (
      <StyledButton as="a" href={to} {...props}>
        {children}
      </StyledButton>
    );
  }
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default PrimaryButtonOutline;
