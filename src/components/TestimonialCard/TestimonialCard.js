import styled from 'styled-components';

const Card = styled.div`
  width: 100%;
  background-color: var(--grey-color-100);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  padding: 30px 30px;
  @media only screen and (max-width: 991px) {
    width: 100%;
  }
`;

const Title = styled.h3`
  font-size: 22px;
  text-align: center;
  font-weight: 500;
`;

const Content = styled.p`
  text-align: center;
  font-size: 16px;
  color: rgb(0, 0, 0);
  font-weight: 300;
  margin: 20px 0;
  @media screen and (max-width: 991px) {
    font-size: 17px;
  }
`;

const Author = styled.p`
  text-align: center;
  color: var(--primary-color);
  margin: 10px 0;
  font-weight: 600;
  @media screen and (max-width: 991px) {
    font-size: 17px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  & img {
    width: 60px;
    height: 60px;
    background-color: black;
    border-radius: 100px;
    object-fit: cover;
    object-position: center;
    border: 0px solid transparent;
    margin: 0 auto;
  }
`;

export default function TestimonialCard({ title, name, src, children, type }) {
  return (
    <Card>
      <Title>{title}</Title>
      <Content>{children}</Content>
      <Author>{name}</Author>
      <ImageContainer>
        <img
          src={src}
          alt={`Testimonial by ${name} about My Dummy Ticket`}
          title={`Testimonial by ${name} about My Dummy Ticket`}
        />
      </ImageContainer>
    </Card>
  );
}
