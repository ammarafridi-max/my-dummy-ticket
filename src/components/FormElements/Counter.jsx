import { IoIosRemove, IoIosAdd } from 'react-icons/io';
import styled from 'styled-components';

const StyledCounter = styled.div`
  width: 33%;
  @media screen and (max-width: 991px) {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
`;

const AgeGroup = styled.div`
  font-size: 14.5px;
  text-align: center;
  padding: 0;
  margin: 0;
  margin-bottom: 5px;
  font-weight: 400;
  & span {
    color: rgb(180, 180, 180);
  }
  @media screen and (max-width: 991px) {
    width: 50%;
    text-align: left;
  }
`;

const Count = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: var(--input-radius-md);
  padding: 10px 12px;
  box-shadow: var(--input-box-shadow);
  -webkit-box-shadow: var(--input-box-shadow);
  -moz-box-shadow: var(--input-box-shadow);
  & p {
    margin: 0;
    padding: 0;
    font-size: 14.5px;
  }
  @media screen and (max-width: 991px) {
    width: 50%;
  }
`;

const SubtractIcon = styled(IoIosRemove)`
  font-size: 20px;
  cursor: pointer;
`;

const AddIcon = styled(IoIosAdd)`
  font-size: 20px;
  cursor: pointer;
`;

export default function Counter({ ageGroup, age, onAdd, onSubtract, value }) {
  return (
    <StyledCounter>
      <AgeGroup>
        {ageGroup} <span>{age}</span>
      </AgeGroup>
      <Count>
        <SubtractIcon onClick={onSubtract} />
        <p>{value}</p>
        <AddIcon onClick={onAdd} />
      </Count>
    </StyledCounter>
  );
}
