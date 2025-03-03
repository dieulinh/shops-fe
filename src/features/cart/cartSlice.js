import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
const initialState = {
  cart: [],
  status: 'idle',
  error: null,
  count: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addToCart: (state, action) => {
      console.log('adding to cart item', action.payload)
      state.count = state.count + 1
      const item = state.cart.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity++
      } else {
        state.cart.push({...action.payload, quantity: 1})
      }
    },
    setCart: (state, action) => {
        const {index, newQuantity} = action.payload

        const updatedCart = [...state.cart];
        updatedCart[index] = { ...updatedCart[index], quantity: newQuantity };
        state.count = updatedCart.reduce((count, item) => count + parseInt(item.quantity), 0)
        state.cart = updatedCart;

    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id)
    }
  },

})

export const {setCart, addToCart, removeFromCart,updateCart} = cartSlice.actions;
export default cartSlice.reducer;

