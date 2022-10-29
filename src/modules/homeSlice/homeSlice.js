import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { videosService } from '~/services';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        status: 'idle',
        videoList: [],
    },
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchGetVideoListForYou.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchGetVideoListForYou.fulfilled, (state, action) => {
            state.status = 'idle';
            state.videoList = action.payload;
        });
    },
});

export const fetchGetVideoListForYou = createAsyncThunk('home/fetchGetVideoListForYou', async () => {
    const response = await videosService.getVideoListForYou();
    return response;
});

export default homeSlice;
