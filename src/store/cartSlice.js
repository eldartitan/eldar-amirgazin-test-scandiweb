import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: {},
  total: {
    "USD": 0,
    "GBP": 0,
    "AUD": 0,
    "JPY": 0,
    "RUB": 0
  },
  quantity: 0
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products[action.payload.id] = action.payload;
      for (let key in state.total) {
        state.total[key] += state.products[action.payload.id].data.prices.filter(f => f.currency.label === key)[0].amount
      }
      state.quantity += 1
    },
    selectAtribes: (state, action) => {
      state.products[action.payload.id].atribs = action.payload.select;
    },
    iAmount: (state, action) => {
      state.products[action.payload.id].amount += 1;
      for (let key in state.total) {
        state.total[key] += state.products[action.payload.id].data.prices.filter(f => f.currency.label === key)[0].amount
      }
      state.quantity += 1
    },
    dAmount: (state, action) => {
      if (state.products[action.payload.id].amount > 1) {
        state.products[action.payload.id].amount -= 1
        for (let key in state.total) {
          state.total[key] -= state.products[action.payload.id].data.prices.filter(f => f.currency.label === key)[0].amount
        }
        state.quantity -= 1
      };
    },
    deleteProduct: (state, action) => {
      for (let key in state.total) {
        state.total[key] -= state.products[action.payload].data.prices.filter(f => f.currency.label === key)[0].amount * state.products[action.payload].amount
      }
      state.quantity -= state.products[action.payload].amount
      delete state.products[action.payload]
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProduct, selectAtribes, iAmount, dAmount, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;