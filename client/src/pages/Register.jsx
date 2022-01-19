import { useEffect, useState, useRef } from "react";
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
  const registerInfoRef = useRef({
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
    submit: "",
  });
  const [readyForSubmit, setReadyForSubmit] = useState(false);
  const history = useHistory();

  useEffect(() => {
    document.addEventListener("focusout", focusOutFunc);
    return () => {
      document.removeEventListener("focusout", focusOutFunc);
    };
  }, []);

  useEffect(() => {
    // Check if submit ready
    let isReady = true;
    for (let key in errorMessage) {
      if (errorMessage.hasOwnProperty(key)) {
        if (errorMessage[key] !== "") {
          isReady = false;
          break;
        }
      }
    }

    for (let key in registerInfo) {
      if (errorMessage.hasOwnProperty(key)) {
        if (registerInfo[key] === "") {
          isReady = false;
          break;
        }
      }
    }

    setReadyForSubmit(isReady);
  }, [registerInfo, errorMessage]);

  const focusOutFunc = (e) => {
    if (e.target.tagName !== "INPUT") return;
    const type = e.target.name;

    if (registerInfoRef.current[type] === "") {
      const propName = "no" + type.charAt(0).toUpperCase() + type.slice(1);
      setErrorMessage((prev) => {
        return { ...prev, [type]: messages[propName] };
      });
    } else {
      switch (type) {
        case "email":
          const emailValid = /\S+@\S+\.\S+/.test(registerInfoRef.current[type]);
          if (!emailValid) {
            return setErrorMessage((prev) => {
              return { ...prev, [type]: messages.wrongEmail };
            });
          }
          break;
        case "password":
          if (
            registerInfoRef.current.confirmPassword !== "" &&
            registerInfoRef.current.password !==
              registerInfoRef.current.confirmPassword
          ) {
            return setErrorMessage((prev) => {
              return {
                ...prev,
                confirmPassword: messages.passwordNoMatch,
                password: "",
              };
            });
          } else {
            return setErrorMessage((prev) => {
              return {
                ...prev,
                confirmPassword: "",
                password: "",
              };
            });
          }
        case "confirmPassword":
          if (
            registerInfoRef.current.password !== "" &&
            registerInfoRef.current.password !==
              registerInfoRef.current.confirmPassword
          ) {
            return setErrorMessage((prev) => {
              return {
                ...prev,
                confirmPassword: messages.passwordNoMatch,
              };
            });
          } else {
            return setErrorMessage((prev) => {
              return {
                ...prev,
                confirmPassword: "",
              };
            });
          }
        default:
          return setErrorMessage((prev) => {
            return { ...prev, [type]: "" };
          });
      }
    }
  };

  const handleChange = (e) => {
    if (errorMessage.submit !== "") {
      setErrorMessage((prev) => {
        return { ...prev, submit: "" };
      });
    }
    setRegisterInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    registerInfoRef.current[e.target.name] = e.target.value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let key in errorMessage) {
      if (errorMessage.hasOwnProperty(key)) {
        if (errorMessage[key] !== "") return;
      }
    }

    const newUserInfo = { ...registerInfo };
    delete newUserInfo.confirmPassword;
    try {
      await register(newUserInfo);
      alert(messages.success);
      history.push("/login");
    } catch (err) {
      switch (err) {
        case "email":
          setErrorMessage((prev) => {
            return { ...prev, submit: messages.duplicateEmail };
          });
          break;
        case "username":
          setErrorMessage((prev) => {
            return { ...prev, submit: messages.duplicateUsername };
          });
          break;
        default:
          setErrorMessage((prev) => {
            return { ...prev, submit: err };
          });
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
          {errorMessage.submit && <Error>{errorMessage.submit}</Error>}
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
  width: 100%;
  margin-top: 20px;
  color: red;
  font-size: 12px;
`;

export default Register;
