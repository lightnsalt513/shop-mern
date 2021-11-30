import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderItems } from "../data";
import { mobile } from "../styles/responsive";
import { CommonBtnOutlined } from "../styles/common";
import "../styles/slick-custom.scss";

const Carousel = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Container>
      <Slider {...carouselSettings}>
        {sliderItems.map((item) => (
          <Slide key={item.id}>
            <SlideInner bg={item.bg}>
              <ImgContainer>
                <Image src={item.img} />
              </ImgContainer>
              <InfoContainer>
                <Title>{item.title}</Title>
                <Desc>{item.desc}</Desc>
                <CommonBtnOutlined>SHOW NOW</CommonBtnOutlined>
              </InfoContainer>
            </SlideInner>
          </Slide>
        ))}
      </Slider>
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
`;

const Slide = styled.div`
  vertical-align: top;
`;

const SlideInner = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex-shrink: 0;
  height: 500px;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  overflow: hidden;
  min-width: 300px;
  height: 100%;
  ${mobile({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  })}
`;

const Image = styled.img`
  width: 100%;
  ${mobile({
    height: "100%",
    objectFit: "cover",
  })}
`;

const InfoContainer = styled.div`
  flex: 1;
  position: relative;
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

export default Carousel;
