'use client';
import styled from 'styled-components';

const PageTitle = styled.h1`
  color: ${({ color }) => color || 'black'};
  line-height: 1.3;
  text-align: ${({ textAlign }) => textAlign || 'left'};
  text-transform: ${({ textTransform }) =>
    textTransform || 'capitalize'} !important;
  font-size: ${({ fontSize }) => fontSize || '36px'};
  font-weight: ${({ fontWeight }) => fontWeight || '700'};
  margin-top: ${({ mt, my }) => mt || my};
  margin-bottom: ${({ mb, my }) => mb || my};
  margin-left: ${({ ml }) => ml};
  margin-right: ${({ mr }) => mr};
  padding-top: ${({ pt, py }) => pt || py};
  padding-bottom: ${({ pb, py }) => pb || py};
  padding-left: ${({ pl }) => pl};
  padding-right: ${({ pr }) => pr};
  @media only screen and (max-width: 991px) {
    font-size: 34px;
  }
`;

export default PageTitle;
