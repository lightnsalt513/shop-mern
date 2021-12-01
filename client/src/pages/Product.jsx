import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components/macro";
import Newsletter from "../components/Newsletter";
import { CommonBtnOutlined, CommonSelect } from "../styles/common";
import { mobile } from "../styles/responsive";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, addToCart } from "../redux/apiCalls";

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/").slice(-1)[0];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    getProduct(productId)
      .then((data) => {
        const sizeArr = data.sizes.map((size) => size.name);
        const sortedArr = ["S", "M", "L", "XL"].filter((item) =>
          sizeArr.includes(item)
        );

        setProduct({ ...data, selectedId: data._id });
        setSize(data.size);
        setSizes(sortedArr);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  const handleQuantity = (type) => {
    if (type === "up") {
      quantity > 1 && setQuantity(quantity - 1);
    } else if (type === "down") {
      setQuantity(quantity + 1);
    }
  };

  const handleSizeChange = (e) => {
    if (e.target.value === size) return;
    const newSize = e.target.value;
    const newId = product.sizes.find((size) => size.name === newSize)._id;
    setProduct({ ...product, size: newSize, selectedId: newId });
    setSize(newSize);
  };

  const handleAddCart = () => {
    if (user) {
      addToCart(dispatch, cart, { ...product, quantity });
    } else {
      window.alert("Please login to add to cart");
    }
  };

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.description}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={handleSizeChange} value={size}>
                {sizes.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("up")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("down")} />
            </AmountContainer>
            <CommonBtnOutlined
              bdcolor="teal"
              fontSize="16px"
              onClick={handleAddCart}>
              ADD TO CART
            </CommonBtnOutlined>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "20px 20px 80px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  min-width: 350px;
`;

const Image = styled.img`
  width: 100%;
  object-fit: contain;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 0 0 30px;
  ${mobile({ padding: "20px 0 0" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterSize = styled(CommonSelect)`
  margin-left: 10px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 40px;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

export default Product;
