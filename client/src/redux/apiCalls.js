import { loginFail, loginStart, loginSuccess, logoutSuccess } from "./userRedux";
import { addProduct, clearProducts } from './cartRedux';
import { publicRequest, userRequest } from '../requestMethods';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFail());
  }
};

export const logout = (dispatch) => {
  dispatch(logoutSuccess());
  dispatch(clearProducts());
}

export const addProductToCart = async (dispatch, product) => {
  try {
    const res = await userRequest.post('/cart', product);
    dispatch(addProduct(res.data));
  } catch (err) {
    console.log(err);
  } 
};