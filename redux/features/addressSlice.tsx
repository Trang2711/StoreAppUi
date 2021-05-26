import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// Define a type for the slice state

// Define the initial state using that type
const initialState = {
    addressDetail: null
}

export const addressSlice = createSlice({
    name: "address",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setAddressOfUser: (state: any, action: PayloadAction<any>) => {
            state.addressDetail = action.payload
        }
    },
});

export const {
    setAddressOfUser
} = addressSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const addressOfUser = (state: RootState) => state.address.addressDetail;
export default addressSlice.reducer;
