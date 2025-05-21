import styled from 'styled-components';
import { useState } from 'react';
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi2';

export default function FAQAccordion({ question, children }) {
  const [showAnswer, setShowAnswer] = useState(false);

  function toggleAnswer() {
    setShowAnswer((show) => !show);
  }

  return (
    <AccordionContainer>
      <QuestionDiv showAnswer={showAnswer} onClick={toggleAnswer}>
        <span>{question}</span>
        {showAnswer ? <HiOutlineMinus /> : <HiOutlinePlus />}
      </QuestionDiv>
      <AnswerDiv showAnswer={showAnswer}>{children}</AnswerDiv>
    </AccordionContainer>
  );
}

const AccordionContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const QuestionDiv = styled.div`
  width: 100%;
  background-color: ${({ showAnswer }) =>
    showAnswer ? 'var(--primary-color-500)' : 'var(--grey-color-100)'};
  color: ${({ showAnswer }) => (showAnswer ? 'white' : 'black')};
  border-radius: 10px;
  padding: 12.5px 25px;
  display: grid;
  grid-template-columns: 11fr auto;
  gap: 15px;
  align-items: center;
  justify-content: space-between;
  font-size: 30px;
  transition-duration: 0.3s;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: ${({ showAnswer }) =>
      showAnswer ? 'var(--primary-color-500)' : 'var(--grey-color-200)'};
  }

  & span {
    font-size: 18px;
  }

  @media screen and (max-width: 991px) {
    font-size: 25px;
    & span {
      font-size: 17px;
    }
  }
`;

const AnswerDiv = styled.div`
  padding: ${({ showAnswer }) =>
    showAnswer ? '20px 25px 10px 25px' : '0px 25px'};
  height: ${({ showAnswer }) => (showAnswer ? 'fit-content' : '0px')};
  overflow: hidden;
  transition-duration: 0.3s;
  color: black;
  font-size: 17px;
  font-weight: 300;
`;
