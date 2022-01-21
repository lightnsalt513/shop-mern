import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../styles/responsive";

const NotFoundPage = () => {
  return (
    <Container>
      <h1>Sorry. Page not found.</h1>
      <Link to="/">Go to Home</Link>
    </Container>
  );
};

export default NotFoundPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 30px;
  height: 100vh;
  text-align: center;
  box-sizing: border-box;
  h1 {
    font-size: 32px;
    font-weight: normal;
    ${mobile({ fontSize: '24px' })}
  }
  a {
    display: inline-block;
    margin-top: 20px;
    font-size: 26px;
    ${mobile({ fontSize: '18px' })}
  }
`;
