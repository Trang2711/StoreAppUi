import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// Define a type for the slice state
interface UserInfo {
  username: string;
  email: string;
  avatar: string;
}
interface User {
  user: UserInfo;
}
// Define the initial state using that type
const initialUser: User = {
  user: {
    username: "",
    email: "",
    avatar: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialUser,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const currentLoggingInUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
