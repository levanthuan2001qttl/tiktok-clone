import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authenticationSlice/authenticationSlice';
import homeSlice from './homeSlice/homeSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        home: homeSlice.reducer,
    },
});
export default store;
