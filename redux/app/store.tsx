import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import cartReducer from "../features/cartSlice";
import loginReducer from '../features/loginSlice'
const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    login: loginReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
