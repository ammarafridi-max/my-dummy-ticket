import styled from 'styled-components';

export default function Paragraph({
  className,
  children,
  fontWeight = 300,
  color = 'black',
  fontSize = '15px',
  textAlign = 'left',
  pt,
  pb,
  py,
  pl,
  pr,
  px,
  mt,
  mb,
  my,
  mr,
  ml,
  mx,
}) {
  return (
    <StyledParagraph
      className={className}
      fontWeight={fontWeight}
      color={color}
      fontSize={fontSize}
      textAlign={textAlign}
      pt={pt}
      pb={pb}
      pl={pl}
      pr={pr}
      py={py}
      px={px}
      mt={mt}
      mb={mb}
      mr={mr}
      ml={ml}
      my={my}
      mx={mx}
    >
      {children}
    </StyledParagraph>
  );
}

const StyledParagraph = styled.p`
  color: ${({ color }) => color || 'black'};
  font-size: ${({ fontSize }) => fontSize || '15px'};
  text-align: ${({ textAlign }) => textAlign};
  font-weight: ${({ fontWeight }) => fontWeight};
  padding-top: ${({ pt, py }) => pt || py || '0px'};
  padding-bottom: ${({ pb, py }) => pb || py || '0px'};
  padding-left: ${({ pl, px }) => pl || px || '0px'};
  padding-right: ${({ pr, px }) => pr || px || '0px'};
  margin-top: ${({ mt, my }) => mt || my || '0px'};
  margin-bottom: ${({ mb, my }) => mb || my || '0px'};
  margin-left: ${({ ml, mx }) => ml || mx || '0px'};
  margin-right: ${({ mr, mx }) => mr || mx || '0px'};
`;
