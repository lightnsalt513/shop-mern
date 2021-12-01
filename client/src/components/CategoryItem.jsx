import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { mobile, tablet } from "../styles/responsive";
import { CommonBtnColored } from "../styles/common";

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <StyledLink to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <CommonBtnColored fontSize="18px" color="black" bgcolor="white">
            SHOP NOW
          </CommonBtnColored>
        </Info>
      </StyledLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  position: relative;
  height: 70vh;
  margin-left: 6px;
  ${tablet({ height: "50vh" })}
  ${mobile({ height: "30vh", maxHeight: "30vh", margin: "20px 0 0 0" })}

  &:first-child {
    margin-left: 0;
    ${mobile({ marginTop: 0 })}
  }
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const Title = styled.strong`
  margin-bottom: 20px;
  color: white;
  font-size: 40px;
  ${tablet({ fontSize: "28px" })}
`;

export default CategoryItem;
