import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// Define a type for the slice state
interface Login {
  token: string
}

// Define the initial state using that type
const initialState: Login = {
  token: ''
};

export const loginSlice = createSlice({
  name: "login",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload.token
    }
  },
});

export const {
    setToken
} = loginSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const token = (state: RootState) => state.login.token;
export default loginSlice.reducer;
