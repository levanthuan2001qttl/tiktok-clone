import { createSlice, current } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { videosService, userService, commentsService } from '~/services';

const detailVideoSlice = createSlice({
    name: 'detailVideo',
    initialState: {
        status: 'idle',
        video: '',
        comments: [],
        newComments: '',
        videoIndexSelected: '',
    },
    reducers: {
        inCreaseQuantityComments: (state) => {
            state.video.comments_count++;
        },
        selectedVideoIndex: (state, action) => {
            state.videoIndexSelected = action.payload;
        },
        saveVideo: (state, action) => {
            state.video = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.status = 'idle';
            state.comments = action.payload;
        });

        builder.addCase(fetchCreateComment.pending, (state, action) => {
            state.status = 'loading';
        });

        builder.addCase(fetchCreateComment.fulfilled, (state, action) => {
            state.status = 'idle';
            state.newComments = [...state.newComments, action.payload];
        });

        builder.addCase(fetchLikeComments.fulfilled, (state, action) => {
            const currentLikeCommentsUpdate = action.payload;
            const newDataSource = state.comments.map((comment) =>
                comment.id === currentLikeCommentsUpdate.id ? currentLikeCommentsUpdate : comment,
            );
            state.comments = newDataSource;
        });

        builder.addCase(fetchUnLikeComments.fulfilled, (state, action) => {
            const currentUnLikeCommentsUpdate = action.payload;
            const newDataSource = state.comments.map((comment) =>
                comment.id === currentUnLikeCommentsUpdate.id ? currentUnLikeCommentsUpdate : comment,
            );
            state.comments = newDataSource;
        });

        builder.addCase(fetchGetAVideo.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchGetAVideo.fulfilled, (state, action) => {
            state.status = 'idle';
            state.video = action.payload;
        });
        builder.addCase(fetchUnLikeAVideo.fulfilled, (state, action) => {
            state.video = action.payload;
        });
        builder.addCase(fetchLikeAVideo.fulfilled, (state, action) => {
            state.video = action.payload;
        });
        builder.addCase(fetchFollowAUser.fulfilled, (state, action) => {
            const newUser = action.payload;
            state.video = {
                ...state.video,
                user: {
                    ...state.video.user,
                    is_followed: newUser.is_followed,
                },
            };
        });
        builder.addCase(fetchUnFollowAUser.fulfilled, (state, action) => {
            const newUser = action.payload;
            state.video = {
                ...state.video,
                user: {
                    ...state.video.user,
                    is_followed: newUser.is_followed,
                },
            };
        });
    },
});

export const fetchComments = createAsyncThunk('detailVideo/fetchComments', async (videoId) => {
    const response = await commentsService.getComments(videoId);
    return response;
});

export const fetchCreateComment = createAsyncThunk('detailVideo/fetchCreateComment', async (data) => {
    const response = await commentsService.createNewComment(data);
    return response;
});

export const fetchLikeComments = createAsyncThunk('detailVideo/fetchLikeComments', async (commentsId) => {
    const response = await commentsService.likeComments(commentsId);
    return response;
});

export const fetchUnLikeComments = createAsyncThunk('detailVideo/fetchUnLikeComments', async (commentsId) => {
    const response = await commentsService.unLikeComments(commentsId);
    return response;
});

export const fetchGetAVideo = createAsyncThunk('detailVideo/fetchGetAVideo', async (uid) => {
    const response = await videosService.getAVideo(uid);
    return response;
});

export const fetchLikeAVideo = createAsyncThunk('detailVideo/fetchLikeAVideo', async (uid) => {
    const response = await videosService.likeVideo(uid);
    return response;
});

export const fetchUnLikeAVideo = createAsyncThunk('detailVideo/fetchUnLikeAVideo', async (uid) => {
    const response = await videosService.unLikeVideo(uid);
    return response;
});

export const fetchFollowAUser = createAsyncThunk('detailVideo/fetchFollowAUser', async (userId) => {
    const response = await userService.followUser(userId);
    return response;
});

export const fetchUnFollowAUser = createAsyncThunk('detailVideo/fetchUnFollowAUser', async (userId) => {
    const response = await userService.unFollowUser(userId);
    return response;
});

export default detailVideoSlice;
