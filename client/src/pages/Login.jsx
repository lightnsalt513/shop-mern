import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";
import { login } from "../redux/apiCalls";
import { mobile } from "../styles/responsive";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CommonBtnColored } from "../styles/common";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, errorMessage } = useSelector(
    (state) => state.user
  );

  const onLoginClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button onClick={onLoginClick} disabled={isFetching} fontSize="16px">
            LOGIN
          </Button>
          {error && <Error>{errorMessage}</Error>}
          <StyledLink to="/register">CREATE A NEW ACCOUNT</StyledLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled(CommonBtnColored)`
  font-size: 16px;
  width: 40%;
  min-width: 150px;
`;

const Error = styled.p`
  color: red;
`;

const StyledLink = styled(Link)`
  margin: 30px 0px 0;
  color: black;
  font-size: 12px;
`;

export default Login;
