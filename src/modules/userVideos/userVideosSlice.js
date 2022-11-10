import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { videosService } from '~/services';

const userVideosSlice = createSlice({
    name: 'userVideos',
    initialState: {
        status: 'loading',
        userVideos: [],
        userProfile: '',
    },
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchGetUserVideos.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchGetUserVideos.fulfilled, (state, action) => {
            state.status = 'idle';
            state.userVideos = action.payload;
        });
        builder.addCase(fetchGetUserProfile.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchGetUserProfile.fulfilled, (state, action) => {
            state.status = 'idle';
            state.userProfile = action.payload;
        });
    },
});

export const fetchGetUserVideos = createAsyncThunk('userVideos/fetchGetUserVideos', async (userId) => {
    const response = await videosService.getUserVideos(userId);
    return response;
});

export const fetchGetUserProfile = createAsyncThunk('userVideos/fetchGetUserProfile', async (nickname) => {
    const response = await videosService.getUserProfile(nickname);
    return response;
});

export default userVideosSlice;
