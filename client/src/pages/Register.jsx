import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { mobile } from "../styles/responsive";
import { register } from "../redux/apiCalls";
import { useHistory } from "react-router";
import { CommonBtnColored } from "../styles/common";

const messages = {
  success: "Register was successful. Please continue with login.",
  noUsername: "Fill in username",
  noEmail: "Fill in email address",
  noPassword: "Fill in password",
  noConfirmPassword: "Fill in confirm password",
  passwordNoMatch: "Confirm password does not match.",
  wrongEmail: "Email format not valid.",
  duplicateEmail: "Email already exists.",
  duplicateUsername: "Username already exists.",
};

const Register = () => {
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [readyForSubmit, setReadyForSubmit] = useState(false);
  const history = useHistory();

  // input focusout 발생 시점에 빈 input 여부 확인
  // 이 방식은 registerInfo가 변경될 때 마다 event handler를 죽였다 다시 적용함으로 퍼포먼스에 좋지 않을것 같음
  useEffect(() => {
    const focusOutFunc = (e) => {
      if (e.target.tagName !== "INPUT") return;
      const type = e.target.name;

      if (registerInfo[type] === "") {
        const propName = "no" + type.charAt(0).toUpperCase() + type.slice(1);
        setErrorMessage((prev) => {
          return { ...prev, [type]: messages[propName] };
        });
      } else {
        if (type === "email") {
          const emailValid = /\S+@\S+\.\S+/.test(registerInfo[type]);
          if (!emailValid) {
            setErrorMessage((prev) => {
              return { ...prev, [type]: messages.wrongEmail };
            });
          } else {
            setErrorMessage((prev) => {
              return { ...prev, [type]: "" };
            });
          }
        } else if (type === "confirmPassword" || type === "password") {
          if (
            registerInfo.password !== "" &&
            registerInfo.password !== registerInfo.confirmPassword
          ) {
            setErrorMessage((prev) => {
              return {
                ...prev,
                confirmPassword: messages.passwordNoMatch,
                password: "",
              };
            });
          } else {
            setErrorMessage((prev) => {
              return { ...prev, confirmPassword: "", password: "" };
            });
          }
        } else {
          setErrorMessage((prev) => {
            return { ...prev, [type]: "" };
          });
        }
      }
    };
    document.addEventListener("focusout", focusOutFunc);
    return () => {
      document.removeEventListener("focusout", focusOutFunc);
    };
  }, [registerInfo]);

  useEffect(() => {
    // Check if submit ready
    let isReady = true;
    for (let key in errorMessage) {
      if (errorMessage[key] !== "") isReady = false;
    }

    if (isReady) {
      for (let key in registerInfo) {
        if (registerInfo[key] === "") isReady = false;
      }
    }
    setReadyForSubmit(isReady);
  }, [registerInfo, errorMessage]);

  const handleChange = (e) => {
    setRegisterInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorMessage !== "") return;
    const newUserInfo = { ...registerInfo };
    delete newUserInfo.confirmPassword;
    console.log(newUserInfo);
    try {
      await register(newUserInfo);
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
          {errorMessage.username && <Error>{errorMessage.username}</Error>}
          <Input
            onChange={handleChange}
            value={registerInfo.email}
            name="email"
            placeholder="email"
          />
          {errorMessage.email && <Error>{errorMessage.email}</Error>}
          <Input
            onChange={handleChange}
            value={registerInfo.password}
            type="password"
            name="password"
            placeholder="password"
          />
          {errorMessage.password && <Error>{errorMessage.password}</Error>}
          <Input
            onChange={handleChange}
            type="password"
            value={registerInfo.confirmPassword}
            name="confirmPassword"
            placeholder="confirm password"
          />
          {errorMessage.confirmPassword && (
            <Error>{errorMessage.confirmPassword}</Error>
          )}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button disabled={!readyForSubmit}>CREATE</Button>
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
  width: 100%;
  padding: 10px;
  margin: 20px 10px 0px 0px;
`;

const Agreement = styled.span`
  margin: 20px 0px;
  font-size: 12px;
`;

const Button = styled(CommonBtnColored)`
  font-size: 16px;
  width: 40%;
  min-width: 150px;
`;

const Error = styled.div`
  margin-top: 20px;
  color: red;
  font-size: 12px;
`;

export default Register;
