import styled from "styled-components/macro";
import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mobile } from "../styles/responsive";
import { logout } from "../redux/apiCalls";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogoutClick = () => {
    logout(dispatch);
    history.push("/");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          {/* <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer> */}
        </Left>
        <Center>
          <LogoLink to="/">
            <Logo>LLLA.</Logo>
          </LogoLink>
        </Center>
        <Right>
          {user ? (
            <MenuItem>
              <LogoutBtn onClick={onLogoutClick}>Log Out</LogoutBtn>
            </MenuItem>
          ) : (
            <>
              <MenuItem>
                <StyledLink to="/register">Register</StyledLink>
              </MenuItem>
              <MenuItem>
                <StyledLink to="/login">Sign In</StyledLink>
              </MenuItem>
            </>
          )}
          <MenuItem>
            <Link to="/cart">
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  ${mobile({ padding: "10px 10px" })};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

// const SearchContainer = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 5px;
//   border: 1px solid lightgray;
// `;

// const Input = styled.input`
//   border: none;
//   ${mobile({ width: "50px" })};
// `;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const LogoLink = styled(Link)`
  color: black;
  text-decoration: none;
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
  ${mobile({ paddingRight: "5px" })}
`;

const MenuItem = styled.div`
  margin-left: 25px;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })};
`;

const LogoutBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  text-transform: uppercase;
`;

const StyledLink = styled(Link)`
  border: none;
  color: black;
  text-decoration: none;
  text-transform: uppercase;
`;

export default Navbar;
