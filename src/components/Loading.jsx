import ScaleLoader from 'react-spinners/ScaleLoader';
import styled from 'styled-components';

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
`;

export default function Loading({ loading }) {
  return (
    <Container>
      <ScaleLoader
        color="black"
        height={35}
        width={10}
        radius={2}
        margin={2}
        loading={loading}
        speedMultiplier={1}
      />
    </Container>
  );
}
