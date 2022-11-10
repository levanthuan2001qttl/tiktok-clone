import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authenticationSlice/authenticationSlice';
import detailVideoSlice from './detailVideoSlice/detailVideoSlice';
import homeSlice from './homeSlice/homeSlice';
import userVideosSlice from './userVideos/userVideosSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        home: homeSlice.reducer,
        detailVideo: detailVideoSlice.reducer,
        userVideos: userVideosSlice.reducer,
    },
});
export default store;
