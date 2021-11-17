import { loginFail, loginStart, loginSuccess, logoutSuccess } from "./userRedux";
import { addProduct, updateProduct, clearProducts, getCartSuccess, updateQuantity, removeProduct } from './cartRedux';
import { publicRequest, userRequest } from '../requestMethods';

// Login
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

// Cart
export const getCart = async (dispatch) => { 
  try {
    const res = await userRequest.get(`/cart`);
    const results = await Promise.all(res.data.products.map(product => {
      return getProduct(product.productId);
    }));
    const products = results.map((result, i) => {
      return { ...result, quantity: res.data.products[i].quantity }
    });

    dispatch(getCartSuccess(products));
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = async (dispatch, cart, product) => { 
  let productObj = {
    productId: product._id,
    quantity: product.quantity,
  };
  let products = [];

  try {
    // cart 상태에 따라 생성 또는 업데이트
    if (cart.products.length < 1) {
      products.push(productObj);
      await userRequest.post('/cart', {
        products: products
      });
      dispatch(addProduct(product));
    } else {
      let hasSameProduct = false;
      let confirmed = true;

      products = cart.products.map(item => {
        if (item._id === product._id) {
          confirmed = window.confirm('This product is already in the cart. Replace the product?');
          hasSameProduct = true;
          return { productId: item._id, quantity: product.quantity }
        } else {
          return { productId: item._id, quantity: item.quantity }
        }
      });
      if (!confirmed) return;

      if (hasSameProduct) {
        dispatch(updateProduct(product));
      } else {
        products.push(productObj);
        dispatch(addProduct(product));
      }

      await userRequest.put('/cart/update', {
        products: products
      });
    }
  } catch (err) {
    console.log(err);
  } 
};

export const updateQuantityCart = async (dispatch, cart, product) => {
  const products = cart.products.map(item => {
    let quantity = item.quantity;
    if (item._id === product._id) quantity = product.quantity;
    return { productId: item._id, quantity };
  });
  
  try {
    await userRequest.put('/cart/update', { products });
    dispatch(updateQuantity(product));
  } catch (err) {
    console.log(err);
  }
}

export const removeFromCart = async (dispatch, cart, productId) => { 
  try {
    await userRequest.put(`/cart/remove/${productId}`)
    dispatch(removeProduct(productId));
  } catch (err) {
    console.log(err);
  }
};