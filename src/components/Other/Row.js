import styled from 'styled-components';

const StyledRow = styled.div`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  gap: ${({ gap }) => gap};
  margin-bottom: ${({ mb }) => mb};
  & > *:not(:last-child) {
    margin-right: ${({ gap }) => gap};
  }
`;

export default function Row({
  children,
  width = '100%',
  className,
  justifyContent = 'space-between',
  alignItems = 'baseline',
  gap,
  mb,
  flexDirection = 'row',
}) {
  return (
    <StyledRow
      width={width}
      className={className}
      justifyContent={justifyContent}
      gap={gap}
      mb={mb}
      flexDirection={flexDirection}
      alignItems={alignItems}
    >
      {children}
    </StyledRow>
  );
}
