import React, { useState } from 'react';
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
  padding: 10px 50px;
  font-size: 13px;
`;
const RatingStars = styled.span`
  font-size: 30px;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  padding: 2px;
  cursor: pointer;
`;

const Rating = ({stars = 5}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleClick = (e) => {
      setRating(e)
    }

    const handleOnEnter = (e) => {
      setHover(e)
    }

    const handleOnExit = () => {
      setHover(0)
    }

return (
    <Wrapper>
        <Header>
                <Title>
                    Rating
                </Title>
                <Description>
                    This is a simple rating component. 
                </Description>
        </Header>
            <Body>
              {[...Array(stars)].map((_, i) => (
                <RatingStars
                  className={i <= (hover || rating) - 1 ? "R-active" : "R-inactive"}
                  key={i}
                  onClick={() => handleClick(i + 1)}
                  onMouseEnter={() => handleOnEnter(i + 1)}
                  onMouseLeave={() => handleOnExit(i + 1)}
                >
                  &#10031;
                </RatingStars>
              ))}
            </Body>
    </Wrapper>
)
}

export default Rating