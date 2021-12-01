import React from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import styled from "styled-components/macro";

const MainWithGnbFooter = ({ children }) => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      {children}
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
`;

export default MainWithGnbFooter;
