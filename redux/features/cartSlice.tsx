import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// Define a type for the slice state
interface product {
  id: string;
  title: string;
  quantity: number;
  price: number;
  discount_price: number;
  product_thumbnail: string;
  color: string;
}
interface Number {
  id: string;
}

interface ProductState {
  products: Array<product>;
  quantity: any;
}
// Define the initial state using that type
const initialCart: ProductState = {
  products: [],
  quantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialCart,
  reducers: {
    setTotalQuantityInCart: (state, action: PayloadAction<any>) => {
      state.quantity = action.payload;
    },
    addingItemQuantity: (state, action: PayloadAction<Number>) => {
      const index = state.products.findIndex(
        (product) => product.id == action.payload.id
      );
      state.products[index].quantity = state.products[index].quantity + 1;
    },
    subtractItemQuantity: (state, action: PayloadAction<Number>) => {
      const index = state.products.findIndex(
        (product) => product.id == action.payload.id
      );
      if (state.products[index].quantity > 1) {
        state.products[index].quantity = state.products[index].quantity - 1;
      }
    },
    addingNewProductToCart: (state, action: PayloadAction<product>) => {
      const index = state.products.findIndex(
        (product) => product.id == action.payload.id
      );
      if (index >= 0) {
        state.products[index].quantity = state.products[index].quantity + 1;
      } else {
        state.products.push(action.payload);
      }
    },
    deleteAnItemFromCart: (state, action: PayloadAction<Number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const {
  addingItemQuantity,
  addingNewProductToCart,
  deleteAnItemFromCart,
  subtractItemQuantity,
  setTotalQuantityInCart,
} = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const productsInsideCart = (state: RootState) => state.cart.products;
export const amountOfItemsInCart = (state: RootState) => state.cart.quantity;
export const subQuan = (state: RootState) => state.cart.subQuantity;
export default cartSlice.reducer;
