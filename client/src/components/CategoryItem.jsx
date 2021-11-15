import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <StyledLink to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </StyledLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  height: 70vh;
  margin: 3px;
  ${mobile({ height: "30vh" })};
`;

const StyledLink = styled(Link)`
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
`;

const Button = styled.div`
  padding: 10px;
  border: none;
  background-color: white;
  color: gray;
  cursor: pointer;
`;

export default CategoryItem;
