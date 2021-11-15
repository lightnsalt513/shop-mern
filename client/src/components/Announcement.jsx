import styled from "styled-components";

const Announcement = () => {
  return (
    <Container>
      Super Deal!!! Free shipping on order above $50 dollars.
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  background-color: teal;
  color: white;
  font-size: 14px;
  font-weight: 500;
`;

export default Announcement;
