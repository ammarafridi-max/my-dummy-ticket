import styled from 'styled-components';

const StyledBox = styled.div`
  width: ${({ width }) => width};
  padding-top: ${({ pt, py }) => pt || py};
  padding-bottom: ${({ pb, py }) => pb || py};
  padding-left: ${({ pl, px }) => pl || px};
  padding-right: ${({ pr, px }) => pr || px};
  margin-top: ${({ mt, my }) => mt || my};
  margin-bottom: ${({ mb, my }) => mb || my};
  margin-left: ${({ ml, mx }) => ml || mx};
  margin-right: ${({ mr, mx }) => mr || mx};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ borderRadius }) => borderRadius};
`;

export default function Box({
  width = '33%',
  pt,
  pb,
  pl,
  pr,
  py = '20px',
  px = '20px',
  mt,
  mb,
  my,
  mr,
  ml,
  mx,
  backgroundColor = 'var(--grey-color-light)',
  borderRadius = '10px',
  children,
}) {
  return (
    <StyledBox
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      width={width}
      pt={pt}
      pb={pb}
      pl={pl}
      pr={pr}
      py={py}
      px={px}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      mx={mx}
      my={my}
    >
      {children}
    </StyledBox>
  );
}
