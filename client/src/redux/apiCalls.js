import { loginFail, loginStart, loginSuccess, logoutSuccess } from "./userRedux";
import { addProduct, updateProduct, clearProducts, getCartSuccess, updateQuantity, removeProduct } from './cartRedux';
import { publicRequest, userRequest } from '../requestMethods';

// Create User
export const register = async (user) => {
  try {
    const res = await publicRequest.post('/auth/register', user);
    return res;
  } catch (err) {
    for (let key in err.response.data) {
      throw key;
    }
  }
}

// Login
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    const errMessage = err.response.data ?? err.message;
    dispatch(loginFail(errMessage));
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
    if (!res.data) return;

    const fetchedProducts = await Promise.all(res.data.products.map(product => {
      return getProduct(product.mainProductId)
    }));
    const products = fetchedProducts.map((result, i) => {
      const cartProduct = res.data.products[i];
      const size = result.sizes.find(size => size._id === cartProduct.productId);
      return { ...result, quantity: cartProduct.quantity, size: size.name, selectedId: cartProduct.productId }
    });

    dispatch(getCartSuccess(products));
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = async (dispatch, cart, product) => { 
  let productObj = {
    productId: product.selectedId || product._id,
    quantity: product.quantity,
    mainProductId: product._id
  };
  product.selectedId = product.selectedId || product._id;
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
        if (item.selectedId === productObj.productId) {
          if (hasSameProduct) throw Error({ message: 'Same product exists in cart' });
          hasSameProduct = true;
          confirmed = window.confirm('This product is already in the cart. Replace the product?');
          return { 
            productId: productObj.productId, 
            quantity: productObj.quantity, 
            mainProductId: productObj.mainProductId
          }
        } else {
          return { 
            productId: (item.selectedId || item._id), 
            quantity: item.quantity, 
            mainProductId: item._id
          }
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
    if (item.selectedId === product.selectedId) quantity = product.quantity;
    return { productId: item.selectedId, quantity, mainProductId: item._id };
  });
  
  try {
    await userRequest.put('/cart/update', { products });
    dispatch(updateQuantity(product));
  } catch (err) {
    console.log(err);
  }
}

export const removeFromCart = async (dispatch, productId) => { 
  try {
    await userRequest.put(`/cart/remove/${productId}`)
    dispatch(removeProduct(productId));
  } catch (err) {
    console.log(err);
  }
};

export const emptyCart = async (dispatch) => {
  try {
    await userRequest.delete(`/cart`);
    dispatch(clearProducts());
  } catch (err) {
    console.log(err);
  }
}

// Order
export const addOrder = async (dispatch, userId, cart, address) => {
  let order = {};
  
  order.userId = userId;
  order.amount = cart.total;
  order.address = address;

  order.products = cart.products.map((item) => {
    return {
      productId: item.selectedId,
      quantity: item.quantity,
      mainProductId: item._id
    }
  });

  try {
    await userRequest.post('/orders', order);
    alert('Order was successful');
    emptyCart(dispatch);
  } catch (err) {
    console.log(err);
  }
};