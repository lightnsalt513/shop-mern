import {
  Facebook,
  Instagram,
  Twitter,
  Room,
  Phone,
  MailOutline,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })};
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0;
`;

const SocialContainer = styled.h1`
  display: flex;
`;

const SocialIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 20px;
  border: none;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })};
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fcf5f5" })}
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>LLLA.</Logo>
        <Desc>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
          repudiandae recusandae numquam maiores voluptates laboriosam
          reiciendis? Sed sapiente error dicta, nesciunt ducimus molestiae autem
          quia rerum architecto eveniet alias ab!
        </Desc>
        <SocialContainer>
          <SocialIcon color="3b5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="e4405f">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55acee">
            <Twitter />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 622 Dixie Path , South
          Tobinchester 98336
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> contact@lama.dev
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
