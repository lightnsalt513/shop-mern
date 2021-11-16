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
    addProduct: (state, action) => {
      let idx;
      const sameProduct = state.products.find((product, i) => {
        if (product._id === action.payload._id) {
          idx = i;
          return true;
        }
        return false;
      });
      if (sameProduct) {
        const confirmed = window.confirm('This product is already in the cart. Replace the product?');
        if (!confirmed) return;
        state.products.splice(idx, 1, action.payload);
        state.total = state.total - (sameProduct.price * sameProduct.quantity) + (action.payload.price * action.payload.quantity);
      } else {
        state.products.push(action.payload);
        state.quantity += 1;
        state.total += (action.payload.price * action.payload.quantity);
      }
    },
    removeProduct: (state, action) => {
      let idx;
      let productPrice;

      state.products.find((product, i) => {
        if (product._id === action.payload) {
          idx = i;
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
    increaseProduct: (state, action) => {
      const product = state.products.find(product => product._id === action.payload);
      product.quantity++;
      state.total += product.price;
    },
    decreaseProduct: (state, action) => {
      const product = state.products.find(product => product._id === action.payload);
      if (product.quantity > 1) {
        product.quantity--;
        state.total -= product.price; 
      }
    },
    clearProducts: (state) => {
      state.products = initState.products;
      state.quantity = initState.quantity;
      state.total = initState.total;
    }
  }
});

export const { addProduct, clearProducts, removeProduct, increaseProduct, decreaseProduct } = cartSlice.actions; 
export default cartSlice.reducer;