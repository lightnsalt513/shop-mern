import { Send } from "@material-ui/icons";
import styled from "styled-components/macro";
import { mobile } from "../styles/responsive";

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 450px;
  background-color: #fcf5f5;
  ${mobile({ height: "350px" })};
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 70px;
  ${mobile({ fontSize: "50px" })};
`;

const Desc = styled.p`
  padding: 0 20px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  ${mobile({ fontSize: "20px" })};
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  height: 40px;
  border: 1px solid lightgray;
  background-color: white;
  ${mobile({ width: "80%" })};
`;

const Input = styled.input`
  flex: 8;
  padding-left: 20px;
  border: none;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

export default Newsletter;
