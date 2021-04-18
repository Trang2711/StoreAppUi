import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// Define a type for the slice state
interface product {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  imgUrl: string;
}
interface ProductState {
  products: Array<product>;
}
// Define the initial state using that type
const initialCart: ProductState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialCart,
  reducers: {
    addingNewProductToCart: (state, action: PayloadAction<product>) => {
      const index = state.products.findIndex(
        (product) => product.id == action.payload.id
      );
      console.log("index", index);
      if (index >= 0) {
        state.products[index].quantity = state.products[index].quantity + 1;
      } else {
        state.products.push(action.payload);
      }
    },
    deleteAnItemFromCart: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      return state;
    },
  },
});

export const {
  addingNewProductToCart,
  deleteAnItemFromCart,
} = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const productsInsideCart = (state: RootState) => state.cart.products;

export default cartSlice.reducer;
