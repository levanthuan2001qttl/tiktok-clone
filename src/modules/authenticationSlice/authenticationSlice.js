import { createSlice, current } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '~/services';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'idle',
        user: {},
        currentUser: {},
    },
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchSignIn.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchSignIn.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.payload.message) {
                state.user.message = action.payload.message;
                delete state.user.response;
            } else {
                state.user.response = action.payload;
                delete state.user.message;
            }
        });
        builder.addCase(fetchGetCurrentUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        });
    },
});

export const fetchSignIn = createAsyncThunk('auth/fetchSignIn', async (body) => {
    try {
        const response = await userService.signIn(body);
        localStorage.setItem('token', JSON.stringify(response.meta.token));
        return response.data;
        // return response;
    } catch (error) {
        console.log(error.response.data);
        return error.response.data;
        // return error;
    }
});

export const fetchGetCurrentUser = createAsyncThunk('auth/fetchGetCurrentUser', async (token) => {
    const response = await userService.getCurrentUser(token);
    return response;
});

export default authSlice;
