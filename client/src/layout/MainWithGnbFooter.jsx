import React from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import styled from "styled-components/macro";

const MainWithGnbFooter = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Announcement />
      {children}
      <Footer />
    </div>
  );
};

export default MainWithGnbFooter;
