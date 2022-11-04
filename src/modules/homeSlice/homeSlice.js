import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService, videosService } from '~/services';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        status: 'loading',
        videoList: [],
        video: '',
    },
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchGetVideoListForYou.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchGetVideoListForYou.fulfilled, (state, action) => {
            state.status = 'idle';
            state.videoList = [...state.videoList, ...action.payload];
        });

        builder.addCase(fetchLikeVideo.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchLikeVideo.fulfilled, (state, action) => {
            state.status = 'idle';
            const currentLikeVideoUpdate = action.payload;
            const newDataSource = state.videoList.map((video) =>
                video.id === currentLikeVideoUpdate.id ? currentLikeVideoUpdate : video,
            );
            state.videoList = newDataSource;
        });

        builder.addCase(fetchUnLikeVideo.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchUnLikeVideo.fulfilled, (state, action) => {
            state.status = 'idle';
            const currentUnLikeVideoUpdate = action.payload;
            const newDataSource = state.videoList.map((video) =>
                video.id === currentUnLikeVideoUpdate.id ? currentUnLikeVideoUpdate : video,
            );
            state.videoList = newDataSource;
        });

        builder.addCase(fetchFollowUser.fulfilled, (state, action) => {
            state.status = 'idle';
            const currentUserUpdate = action.payload;

            const newDataSource = state.videoList.map((video) =>
                video.user.id === currentUserUpdate.id
                    ? {
                          ...video,
                          user: {
                              ...video.user,
                              is_followed: true,
                          },
                      }
                    : video,
            );
            state.videoList = newDataSource;
        });

        builder.addCase(fetchUnFollowUser.fulfilled, (state, action) => {
            state.status = 'idle';
            const currentUserUpdate = action.payload;

            const newDataSource = state.videoList.map((video) =>
                video.user.id === currentUserUpdate.id
                    ? {
                          ...video,
                          user: {
                              ...video.user,
                              is_followed: false,
                          },
                      }
                    : video,
            );
            state.videoList = newDataSource;
        });
    },
});

export const fetchGetVideoListForYou = createAsyncThunk('home/fetchGetVideoListForYou', async (page) => {
    const response = await videosService.getVideoListForYou(page);
    return response;
});

export const fetchLikeVideo = createAsyncThunk('home/fetchLikeVideo', async (uid) => {
    const response = await videosService.likeVideo(uid);
    return response;
});

export const fetchUnLikeVideo = createAsyncThunk('home/fetchUnLikeVideo', async (uid) => {
    const response = await videosService.unLikeVideo(uid);
    return response;
});

export const fetchFollowUser = createAsyncThunk('home/fetchFollowUser', async (userId) => {
    const response = await userService.followUser(userId);
    return response;
});

export const fetchUnFollowUser = createAsyncThunk('home/fetchUnFollowUser', async (userId) => {
    const response = await userService.unFollowUser(userId);
    return response;
});

export default homeSlice;
