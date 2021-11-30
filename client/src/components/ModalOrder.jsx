import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Close } from "@material-ui/icons";
import Modal from "./Modal";
import { addOrder } from "../redux/apiCalls";
import { useDispatch } from "react-redux";

const ModalOrder = ({ setOpen, finalAmount }) => {
  const [address, setAddress] = useState("South Korea, Seoul Test Address 111");
  const cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.user.currentUser._id);
  const dispatch = useDispatch();

  const changeAddress = (e) => {
    setAddress(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onOrderClick = async () => {
    const cartObj = { ...cart, total: finalAmount };
    await addOrder(dispatch, userId, cartObj, address);
    setOpen(false);
  };

  return (
    <Modal setOpen={setOpen}>
      <form onSubmit={onSubmit}>
        <Title>Make Order</Title>
        <Label htmlFor="addressInp">Address : </Label>
        <AddressInp
          id="addressInp"
          placeholder="Address"
          value={address}
          onChange={changeAddress}
        />
        <OrderBtn onClick={onOrderClick}>Order</OrderBtn>
      </form>
      <CloseBtn onClick={() => setOpen(false)}>
        <Close />
      </CloseBtn>
    </Modal>
  );
};

const Title = styled.h2``;

const Label = styled.label`
  display: block;
  margin-top: 30px;
`;

const AddressInp = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 10px 0px 0px;
  box-sizing: border-box;
`;

const OrderBtn = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  margin-top: 20px;
  background-color: teal;
  color: white;
  cursor: pointer;

  &:disabled {
    background: gray;
    cursor: default;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
`;

export default ModalOrder;
