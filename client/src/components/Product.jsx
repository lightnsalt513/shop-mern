import { SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addToCart } from "../redux/apiCalls";

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);

  const handleAddCart = () => {
    if (user) {
      addToCart(dispatch, cart, { ...item, quantity: 1, selectedId: item._id });
    } else {
      window.alert("Please login to add to cart");
    }
  };

  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon onClick={handleAddCart}>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
      </Info>
    </Container>
  );
};

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.5s ease;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: 280px;
  height: 350px;
  margin: 5px;
  background-color: #f5fbfd;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
`;

const Image = styled.img`
  position: relative;
  height: 75%;
`;

const Icon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin: 0 5px;
  border: none;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

export default Product;
