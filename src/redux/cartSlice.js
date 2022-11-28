import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    arr : [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.arr.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.arr.splice(action.payload, action.payload); 
    },
    clearCart: (state) => {
      state.arr = [];
    },
  },
})

export const { addProduct, removeProduct, clearCart } = cartSlice.actions

export default cartSlice.reducer