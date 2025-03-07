import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users/userSlice';
import authReducer from './redux/slices/authSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        users: usersReducer,
        authentication: authReducer
    }
})