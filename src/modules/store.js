import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authenticationSlice/authenticationSlice';
import detailVideoSlice from './detailVideoSlice/detailVideoSlice';
import homeSlice from './homeSlice/homeSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        home: homeSlice.reducer,
        detailVideo: detailVideoSlice.reducer,
    },
});
export default store;
