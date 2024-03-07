import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import './style.css';

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
  align-items: stretch;
  display: grid;
  grid-template-columns: 46% 50%;
  gap: 10px;
  font-size: 13px;
  padding: 0 50px;
`;
const BodyHRC = styled.div`
  align-items: stretch;
  display: grid;
  grid-template-columns: 46% auto;
  gap: 10px;
  font-size: 13px;
  padding: 0 50px;
  justify-content: space-between
`;
const ColorPad = styled.div`
  width: 98%;
  border-radius: 10px;
  border: 3px solid #ccc;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
  font-weight: bold;
  padding: 20px 0;
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
const Input = styled.input`
  background: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  &:hover {
    background: #f7f7f7;
  }
`;
const ColorGenerator = () => {
  const colorPad = useRef(null);
  const colorConverter = useRef(null);

  const [color, setColor] = useState('#f0f0f0');
  const [type, setType] = useState('hex');
  const [convertColor, setConvertColor] = useState('#f0f0f0');
  const [convertedColor, SetConvertedColor] = useState('#f0f0f0');

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

  const convertType = () => {
    if(convertColor.length <= 7) {
      
      let hex = convertColor.replace('#', '');
    
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
    
      SetConvertedColor(`rgba(${r}, ${g}, ${b}, 1)`);
    }else{
        const rgbaValues = convertColor.match(/\d+/g);
      
        const r = parseInt(rgbaValues[0]);
        const g = parseInt(rgbaValues[1]);
        const b = parseInt(rgbaValues[2]);
      
        const a = parseFloat(rgbaValues[3]);
      
        const componentToHex = (c) => {
          const hex = c.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        };
      
        const hex = '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
      
        if (a !== 1) {
          const alphaHex = Math.round(a * 255).toString(16);
          return hex + componentToHex(alphaHex);
        }
      
        SetConvertedColor(hex);      
    }

    colorConverter.current.style.backgroundColor = convertedColor;
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
      </Header>
      <Body>
        <Button className='RCG-item1' onClick={() => colorType('hex')}>
          Hex
        </Button>
        <Button className='RCG-item2' onClick={() => colorType('rgba')}>
          RGBA
        </Button>
        <Button className='RCG-item3' onClick={() => generateColor()}>
          Generate Color
        </Button>
        <ColorPad className='RCG-item4' ref={colorPad}>
          {color}
        </ColorPad>
      </Body>
      <Header>
        <Title>
          HEX - RGBA Converter
        </Title>
        <Description>
          Enter a HEX or RGBA color code to convert it to the other format.
        </Description>
      </Header>
      <BodyHRC>
        <Input className='' type='text' placeholder='#000000 or rgba(0,0,0,0)' onChange={(e) => setConvertColor(e.target.value)}/>
        <Button className='' onClick={() => convertType()}>
          Generate Color
        </Button>
        <ColorPad className='HRC-item' ref={colorConverter}>
          {convertedColor}
        </ColorPad>
      </BodyHRC>
    </Wrapper>
  )
}

export default ColorGenerator