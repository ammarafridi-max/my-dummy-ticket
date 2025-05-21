import styled from 'styled-components';

const Paragraph = styled.p`
  color: ${({ color }) => color || 'black'};
  font-size: ${({ fontSize }) => fontSize || '15px'};
  text-align: ${({ textAlign }) => textAlign};
  font-weight: ${({ fontWeight }) => fontWeight || '300'};
  padding-top: ${({ pt, py }) => pt || py || '0px'};
  padding-bottom: ${({ pb, py }) => pb || py || '0px'};
  padding-left: ${({ pl, px }) => pl || px || '0px'};
  padding-right: ${({ pr, px }) => pr || px || '0px'};
  margin-top: ${({ mt, my }) => mt || my || '0px'};
  margin-bottom: ${({ mb, my }) => mb || my || '0px'};
  margin-left: ${({ ml, mx }) => ml || mx || '0px'};
  margin-right: ${({ mr, mx }) => mr || mx || '0px'};
`;

export default Paragraph;
