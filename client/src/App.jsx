import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCart } from "./redux/apiCalls";
import MainWithGnbFooter from "./layout/MainWithGnbFooter";
import ScrollToTop from "./helpers/ScrollToTop";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      getCart(dispatch);
    }
  }, [user]);

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          <MainWithGnbFooter>
            <Home />
          </MainWithGnbFooter>
        </Route>
        <Route path={["/products", "/products/:category"]}>
          <MainWithGnbFooter>
            <ProductList />
          </MainWithGnbFooter>
        </Route>
        <Route path="/product/:id">
          <MainWithGnbFooter>
            <Product />
          </MainWithGnbFooter>
        </Route>
        <Route path="/cart">
          <MainWithGnbFooter>
            <Cart />
          </MainWithGnbFooter>
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
