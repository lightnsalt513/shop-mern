import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { Add, Remove, Delete } from "@material-ui/icons";
import { mobile, tablet } from "../styles/responsive";
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
                      <DetailItem>
                        <strong>Product:</strong> {product.title}
                      </DetailItem>
                      <DetailItem>
                        <strong>ID:</strong> {product.selectedId}
                      </DetailItem>
                      <DetailItem>
                        <strong>Size:</strong> {product.size}
                      </DetailItem>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <QuantityBtn onClick={() => onMinusClick(product)}>
                        <Remove />
                      </QuantityBtn>
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <QuantityBtn onClick={() => onPlusClick(product)}>
                        <Add />
                      </QuantityBtn>
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
  ${mobile({ flexDirection: "column", marginTop: "20px" })}

  &:first-child {
    margin-top: 0;
  }
`;

const ProductDetail = styled.div`
  display: flex;
  flex: 3;
`;

const Image = styled.img`
  align-self: center;
  width: 25%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`;

const DetailItem = styled.span`
  margin-top: 20px;
  ${tablet({ marginTop: "5px" })}

  &:first-child {
    margin-top: 0;
  }
`;

const PriceDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  ${mobile({
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: "20px",
  })}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductAmount = styled.div`
  margin: 5px;
  font-size: 24px;
  ${tablet({ fontSize: "20px" })}
`;

const ProductPrice = styled.div`
  margin-top: 20px;
  font-size: 30px;
  font-weight: 200;
  ${tablet({ marginTop: "10px", fontSize: "24px" })}
  ${mobile({ margin: "0 0 0 40px" })}
`;

const Summary = styled.div`
  flex: 1;
  height: 50vh;
  padding: 20px;
  margin-left: 30px;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  ${mobile({ margin: "40px 0 0" })}
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItemText = styled.span`
  flex: 1;
`;

const SummaryItemPrice = styled.span`
  flex: 1;
  text-align: right;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};

  ${SummaryItemPrice} {
    flex: ${(props) => props.type === "total" && "auto"};
  }
`;

const Button = styled(CommonBtnColored)`
  width: 100%;
  font-weight: 600;
`;

const QuantityBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  cursor: pointer;
`;

export default Cart;
