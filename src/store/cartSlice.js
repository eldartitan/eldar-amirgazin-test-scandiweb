import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalPrice: 0,
  quantity: 0,
  currency: {}
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
    },
    selectAtribes: (state, action) => {
      let i = state.products.indexOf(
        state.products.filter((f) => f.id === action.payload.id)[0],
      );
      state.products[i].atribs = action.payload.atribs;
    },
    iAmount: (state, action) => {
      let i = state.products.indexOf(
        state.products.filter((f) => f.id === action.payload)[0],
      );
      state.products[i].amount += 1;
      state.quantity += 1;
    },
    dAmount: (state, action) => {
      let i = state.products.indexOf(
        state.products.filter((f) => f.id === action.payload)[0],
      );
      state.products[i].amount > 1
        ? (state.products[i].amount -= 1)
        : (state.products = state.products.filter(
            (f) => f.id !== action.payload,
          ));
      state.quantity -= 1;
    },
    getTotalPrice: (state, action) => {
      let total = 0;
      for (let i = 0; i < state.products.length; i++) {
        let price = state.products[i].data.prices.filter(
          (f) => f.currency.label === action.payload,
        )[0];
        console.log(price)
        total += price.amount * state.products[i].amount;
      }
      state.totalPrice = total;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setProduct, selectAtribes, iAmount, dAmount, getTotalPrice, setCurrency } =
  cartSlice.actions;
export default cartSlice.reducer;
