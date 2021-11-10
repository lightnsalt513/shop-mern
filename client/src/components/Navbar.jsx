import styled from "styled-components";
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  ${mobile({ padding: "10px 0" })};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })};
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  border: 1px solid lightgray;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })};
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })};
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })};
`;

const MenuItem = styled.div`
  margin-left: 25px;
  font-size: 14px;
  cursor: pointer;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })};
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>LLLA.</Logo>
        </Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
