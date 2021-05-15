import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { AsyncStorage } from 'react-native'

// Define a type for the slice state
interface Login {
  isLogged: boolean
}

// Define the initial state using that type
const initialState: Login = { isLogged: true }

export const loginSlice = createSlice({
  name: "login",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsLogged: (state, action: PayloadAction<any>) => {
      state.isLogged = action.payload.token
    }
  },
});

export const {
  setIsLogged
} = loginSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const isLogged = (state: RootState) => state.login.isLogged;
export default loginSlice.reducer;
