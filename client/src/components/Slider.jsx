import styled from "styled-components/macro";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderItems } from "../data";
import { mobile, tablet } from "../styles/responsive";
import { CommonBtnOutlined } from "../styles/common";

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
                <Dimmed />
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

  .slick {
    &-next,
    &-prev {
      z-index: 10;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.2);
      ${mobile({ width: "30px", height: "30px" })}
      &:before {
        display: block;
        width: 20px;
        height: 20px;
        border: 1px solid white;
        border-width: 4px 4px 0 0;
        content: "";
        ${mobile({
          width: "12px",
          height: "12px",
          borderWidth: "3px 3px 0 0",
        })}
      }
      &:hover,
      &:focus {
        background: rgba(0, 0, 0, 0.5);
      }
    }
    &-next {
      right: 10px;
      &:before {
        margin: 1px 0 0 8px;
        transform: rotate(45deg);
        ${mobile({ margin: "0 0 0 5px" })}
      }
    }
    &-prev {
      left: 10px;
      &:before {
        margin: 1px 0 0 17px;
        transform: rotate(225deg);
        ${mobile({ margin: "0 0 0 10px" })}
      }
    }
    &-list {
      font-size: 0;
    }
    &-dots {
      bottom: 10px;
    }
  }
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
  ${tablet({ height: "400px" })}
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

const Dimmed = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  ${mobile({ display: "block" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  position: relative;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
  ${tablet({ fontSize: "50px" })}
  ${mobile({ fontSize: "40px" })}
`;

const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500px;
  letter-spacing: 3px;
  ${tablet({ fontSize: "16px" })}
  ${mobile({ margin: "30px 0" })}
`;

export default Carousel;
