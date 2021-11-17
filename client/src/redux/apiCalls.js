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

// Products
export const getProducts = (cat) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await publicRequest.get(
        cat
          ? `http://localhost:5000/api/products?category=${cat}`
          : "http://localhost:5000/api/products"
      );
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
};

export const getProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await publicRequest.get(`/products/${id}`); 
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
};
  try {
    const res = await userRequest.post('/cart', product);
    dispatch(addProduct(res.data));
  } catch (err) {
    console.log(err);
  } 
};