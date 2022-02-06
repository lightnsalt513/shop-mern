import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { getCart } from "./redux/apiCalls";
import ScrollToTop from "./helpers/ScrollToTop";

import MainWithGnbFooter from "./layout/MainWithGnbFooter";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import NotFoundPage from "./pages/404";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        getCart(dispatch);
      }, 0);
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
        <Route exact path="/product/:id">
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
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
