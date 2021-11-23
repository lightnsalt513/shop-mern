import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../styles/responsive";
import { register } from "../redux/apiCalls";
import { useHistory } from "react-router";

const messages = {
  success: "Register was successful. Please continue with login.",
  password: "Confirm password does not match.",
  duplicateEmail: "Email already exists.",
  duplicateUsername: "Username already exists.",
};

const Register = () => {
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    setRegisterInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registerInfo.password === confirmPassword) {
      try {
        await register(registerInfo);
        alert(messages.success);
        history.push("/login");
      } catch (err) {
        switch (err) {
          case "email":
            setErrorMessage(messages.duplicateEmail);
            break;
          case "username":
            setErrorMessage(messages.duplicateUsername);
            break;
          default:
            console.log(err);
        }
      }
    } else {
      setErrorMessage(messages.password);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            onChange={handleChange}
            value={registerInfo.username}
            name="username"
            placeholder="username"
          />
          <Input
            onChange={handleChange}
            value={registerInfo.email}
            name="email"
            placeholder="email"
          />
          <Input
            onChange={handleChange}
            type="password"
            value={registerInfo.password}
            name="password"
            placeholder="password"
          />
          <Input
            onChange={handleConfirmPasswordChange}
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            placeholder="confirm password"
          />
          {errorMessage && <Error>{errorMessage}</Error>}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
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
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  padding: 10px;
  margin: 20px 10px 0px 0px;
`;

const Agreement = styled.span`
  margin: 20px 0px;
  font-size: 12px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Error = styled.div`
  margin-top: 20px;
  color: red;
  font-size: 12px;
`;

export default Register;
