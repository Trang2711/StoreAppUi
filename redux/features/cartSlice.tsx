import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

interface product {
  id: string;
  title: string;
  count: number;
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
  totalPrice: number;
}

const initialCart: ProductState = {
  products: [],
  quantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    setTotalQuantityInCart: (state, action: PayloadAction<any>) => {
      state.quantity = action.payload;
    },

    setProductsInCart: (state, aciton: PayloadAction<any>) => {
      state.products = aciton.payload;
    },

    setTotalPrice: (state, aciton: PayloadAction<number>) => {
      state.totalPrice = aciton.payload;
    },

    addingItemQuantity: (state, action: PayloadAction<Number>) => {
      const index = state.products.findIndex(
        (product) => product.id == action.payload.id
      );
      state.products[index].count = state.products[index].count + 1;
      state.totalPrice =
        state.totalPrice + state.products[index].discount_price;
      state.quantity = state.quantity + 1;
    },

    subtractItemQuantity: (state, action: PayloadAction<Number>) => {
      const index = state.products.findIndex(
        (product) => product.id == action.payload.id
      );
      if (state.products[index].count > 1) {
        state.products[index].count = state.products[index].count - 1;
        state.totalPrice =
          state.totalPrice - state.products[index].discount_price;
        state.quantity = state.quantity - 1;
      }
    },

    addingNewProductToCart: (state, action: PayloadAction<product>) => {
      const index = state.products.findIndex(
        (product) => product.id == action.payload.id
      );
      if (index >= 0) {
        state.products[index].count = state.products[index].count + 1;
      } else {
        state.products.push(action.payload);
      }

      state.totalPrice = state.totalPrice + action.payload.discount_price;
      state.quantity = state.quantity + 1;
    },

    deleteAnItemFromCart: (state, action: PayloadAction<product>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.totalPrice = state.totalPrice + action.payload.discount_price;
      state.quantity = state.quantity - action.payload.count;
    },

    deleteAllItemsFromCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.totalPrice = 0;
    },
  },
});
export const {
  addingItemQuantity,
  addingNewProductToCart,
  deleteAnItemFromCart,
  subtractItemQuantity,
  setTotalQuantityInCart,
  setProductsInCart,
  setTotalPrice,
  deleteAllItemsFromCart,
} = cartSlice.actions;

export const productsInsideCart = (state: RootState) => state.cart.products;
export const amountOfItemsInCart = (state: RootState) => state.cart.quantity;
export const totalPrice = (state: RootState) => state.cart.totalPrice;
export default cartSlice.reducer;
