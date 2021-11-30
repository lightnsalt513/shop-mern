import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Add, Remove, Delete } from "@material-ui/icons";
import { mobile } from "../styles/responsive";
import ModalOrder from "../components/ModalOrder";
import { CommonBtnColored } from "../styles/common";
import { getCart, removeFromCart, updateQuantityCart } from "../redux/apiCalls";

const Cart = () => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const [shippingAmount, setShippingAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      getCart(dispatch);
    }
  }, [user]);

  useEffect(() => {
    let shipAmount = 0;
    let discAmount = 0;

    if (cart.products.length >= 1) {
      shipAmount = cart.discount.amount;
      if (cart.total > cart.discount.minTotal) {
        discAmount = cart.discount.amount * -1;
      }
    }

    setShippingAmount(shipAmount.toFixed(2));
    setDiscountAmount(discAmount.toFixed(2));
    setTotalAmount((cart.total + shipAmount + discAmount).toFixed(2));
  }, [cart]);

  const onMinusClick = (product) => {
    if (product.quantity !== 1) {
      const quantity = product.quantity - 1;
      updateQuantityCart(dispatch, cart, { ...product, quantity });
    }
  };

  const onPlusClick = (product) => {
    const quantity = product.quantity + 1;
    updateQuantityCart(dispatch, cart, { ...product, quantity });
  };

  const onDeleteClick = (id) => {
    removeFromCart(dispatch, id);
  };

  const onCheckoutClick = () => {
    if (cart.products.length < 1) return;
    setOpen(true);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <TopButton to="/products">CONTINUE SHOPPING</TopButton>
          </Top>
          <Bottom>
            <Info>
              {cart.products.length < 1 && <Notice>Shopping cart empty</Notice>}
              {cart.products.map((product) => (
                <Product key={product.selectedId}>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <strong>Product:</strong> {product.title}
                      </ProductName>
                      <ProductId>
                        <strong>ID:</strong> {product.selectedId}
                      </ProductId>
                      <ProductSize>
                        <strong>Size:</strong> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Remove onClick={() => onMinusClick(product)} />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Add onClick={() => onPlusClick(product)} />
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.quantity * product.price}
                    </ProductPrice>
                  </PriceDetail>
                  <RemoveButton
                    onClick={() => onDeleteClick(product.selectedId)}>
                    <Delete />
                  </RemoveButton>
                </Product>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ {shippingAmount}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice> $ {discountAmount} </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {totalAmount}</SummaryItemPrice>
              </SummaryItem>
              <Button onClick={onCheckoutClick}>CHECKOUT NOW</Button>
            </Summary>
          </Bottom>
        </Wrapper>
      </Container>
      {open && <ModalOrder setOpen={setOpen} finalAmount={totalAmount} />}
    </>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  padding: 20px;
  text-align: right;
`;

const TopButton = styled(Link)`
  padding: 10px;
  color: black;
  font-weight: 600;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Notice = styled.div`
  flex: 3;
  font-size: 24px;
  text-align: center;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled(CommonBtnColored)`
  width: 100%;
  font-weight: 600;
`;

const RemoveButton = styled.button``;

export default Cart;
