import { useState } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    let newSlideIndex;
    if (direction === "left") {
      newSlideIndex = slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1;
    } else if (direction === "right") {
      newSlideIndex =
        slideIndex === sliderItems.length - 1 ? 0 : slideIndex + 1;
    }
    setSlideIndex(newSlideIndex);
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  ${mobile({ display: "none" })};
`;

const Arrow = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  ${(props) => props.direction}: 10px;
  width: 50px;
  height: 50px;
  margin: auto;
  background-color: #fff7f7;
  border: none;
  border-radius: 50%;
  opacity: 0.5;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  transition: transform 0.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  flex-shrink: 0;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500px;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

export default Slider;
