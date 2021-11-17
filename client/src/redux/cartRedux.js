import { createSlice } from '@reduxjs/toolkit';

const initState = {
  products: [],
  quantity: 0,
  total: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState,
  reducers: {
    getCartSuccess: (state, action) => {
      const total = action.payload.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);
      state.products = action.payload;
      state.quantity = action.payload.length;
      state.total = total;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += (action.payload.price * action.payload.quantity);
    },
    updateProduct: (state, action) => {
      let idx;
      const sameProduct = state.products.find((product, i) => {
        if (product._id === action.payload._id) {
          idx = i;
          return true;
        }
        return false;
      });
      state.products.splice(idx, 1, action.payload);
      if (sameProduct) {
        state.total = state.total - (sameProduct.price * sameProduct.quantity) + (action.payload.price * action.payload.quantity);
      } else {
        state.total = state.total + (action.payload.price * action.payload.quantity);
      }
    },
    updateQuantity: (state, action) => {
      const productIdx = state.products.findIndex(product => product._id === action.payload._id);
      const prevPrice = state.products[productIdx].quantity * state.products[productIdx].price;
      state.products[productIdx].quantity = action.payload.quantity;
      state.total = state.total - prevPrice + (action.payload.quantity * action.payload.price);
    },
    removeProduct: (state, action) => {
      let productPrice;
      const idx = state.products.findIndex((product) => {
        if (product._id === action.payload) {
          productPrice = product.quantity * product.price;
          return true;
        }
        return false;
      });
      if (idx === 'undefined') return;
      state.products.splice(idx, 1);
      state.quantity--;
      state.total -= productPrice;
    },
    clearProducts: (state) => {
      state.products = initState.products;
      state.quantity = initState.quantity;
      state.total = initState.total;
    }
  }
});

export const { addProduct, updateProduct, clearProducts, removeProduct, updateQuantity, getCartSuccess } = cartSlice.actions; 
export default cartSlice.reducer;