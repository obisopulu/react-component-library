import React, { useState } from 'react';
import styled from 'styled-components';

import data from '../data/dataAccordion';
import Arrow from '../assets/icons/arrow.svg';

// design inspiration: https://www.uidesigndaily.com/posts/sketch-accordion-list-panel-day-982

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 20px;
  color: #000;
  width: 80%;
  margin: 20px auto 50px;
  padding-bottom: 30px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  max-width: 500px;
`;
const Header = styled.div`
  padding: 50px 50px 0;
`;
const Title = styled.h2`
  padding-bottom: .1em;
`;
const Description = styled.div`
  font-size: 13px;
  padding-bottom: 1em;
`;
const Body = styled.div`
  padding: 10px 50px;
  font-size: 13px;
`;
const Questions = styled.div`
  margin-bottom: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 20px;
`;
const Question = styled.div`
  border-radius: 20px;
  font-weight: bold;
  padding: 20px;
  cursor: pointer;
  display: flex;
  align-items: stretch;
  &:hover {
    background: #fafafa;
  }
  &:active {
    background: #f7f7f7;
  }
`;
const QuestionText = styled.div`
  flex-grow: 7;
`;
const QuestionIcon = styled.div`
  transform: rotate(180deg);
  flex-grow: 1;
  &:active {
    transition: transform 1s;
    transform: rotate(270deg);
  }
`;
const Answer = styled.div`
  border-top: thick solid #f0f0f0;
  padding: 10px 20px 20px 20px;
`;
const Button = styled.button`
  background: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  width: 150px;
  margin: 20px auto;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  &:hover {
    background: #f7f7f7;
  }
  &:active {
    background: #eee;
    box-shadow: 0 0 1px rgba(0,0,0,0.1);
  }
`;
const Accordion = () => {

  const [selected, setSelected] = useState(0);
  const [multiple, setMultiple] = useState(false);
  const [multipleArr, setMultipleArr] = useState([0]);

  const title = data[0].header;
  const description = data[0].description;
  const questions = data[0].questions;


  const handleOpen = (currentId) => {
    if(multiple){
      if(multipleArr.includes(currentId)){
        const index = multipleArr.indexOf(currentId);
        multipleArr.splice(index, 1);
      } else {
        multipleArr.push(currentId);
      }
      setMultipleArr([...multipleArr]);
    }else{
      setSelected(currentId === selected ? 0 : currentId);
    }
  }
  const handleMultiple = () => {
    setMultiple(!multiple)
    if(multiple === false) {
      setMultipleArr([0]);
      setSelected(0);
      console.log(multipleArr, selected);
    }
  }

  return (
    <Wrapper>
      <Header>
        { title &&
          <Title>
            {title}
          </Title>
        }
        { description &&
          <Description>
            {description}
          </Description>
        }
      </Header>
      <Button onClick={()=> handleMultiple()}>
        More info { multiple ? <span>&#9871;</span> : <span>&#9866;</span>}
      </Button>
      {questions && questions.length > 0 ?
        <Body>
          {questions.map((question) => {
            return (
              <Questions key={question.id}>
                <Question onClick={()=> handleOpen(question.id)}>
                  <QuestionText>
                    {question.question}
                  </QuestionText>
                  <QuestionIcon>
                    <img src={Arrow} alt='Xing logo' />
                  </QuestionIcon> 
                </Question>
                {selected === question.id || multipleArr.includes(question.id)? 
                  <Answer>
                    {question.answer}
                  </Answer>
                  : null
                }
              </Questions>
            )
          })}
        </Body>
        : 
        <Body>
          <Question>
            No questions found
          </Question>
        </Body>
      }
    </Wrapper>
  );
}

export default Accordion