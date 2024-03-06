import React, { useState, useRef } from 'react';
import styled from 'styled-components';

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
  display: grid;
  grid-template-columns: 46% 50%;
  gap: 10px;
  font-size: 13px;
`;
const ColorPad = styled.div`
  width: 100%;
  border-radius: 10px;
  border: 3px solid #ccc;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
  font-weight: bold;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
`;
const Button = styled.button`
  background: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  width: 150px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  &:hover {
    background: #f7f7f7;
  }
  &:active {
    background: #eee;
    box-shadow: 0 0 1px rgba(0,0,0,0.1);
  }
`;
const ColorGenerator = () => {
  const colorPad = useRef(null);

  const [color, setColor] = useState('#f0f0f0');
  const [type, setType] = useState('hex');

  const colorType = (type) => {
    setType(type);
    setColor('');
    generateColor();
  }

  const generateColor = () => {
    if(type === 'hex') {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      setColor('#' + ('000000' + randomColor).slice(-6));
     } else {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      let a = Math.random().toFixed(2);
      
      setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
     }
     colorPad.current.style.backgroundColor = color;
  }
  return (
    <Wrapper>
      <Header>
        <Title>
          Random Color Generator
        </Title>
        <Description>
          Click the button below to generate a random color. You can use the color for your next project.
        </Description>
        <Body>
          <Button className='item1' onClick={() => colorType('hex')}>
            Hex
          </Button>
          <Button className='item2' onClick={() => colorType('rgba')}>
            RGBA
          </Button>
          <Button className='item3' onClick={() => generateColor()}>
            Generate Color
          </Button>
          <ColorPad className='item4' ref={colorPad}>
            {color}
          </ColorPad>
        </Body>
      </Header>
    </Wrapper>
  )
}

export default ColorGenerator