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
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += (action.payload.price * action.payload.quantity);
    },
    clearProducts: (state) => {
      state.products = initState.products;
      state.quantity = initState.quantity;
      state.total = initState.total;
    }
  }
});

export const { addProduct, clearProducts } = cartSlice.actions; 
export default cartSlice.reducer;