import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '~/services';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'idle',
        user: {},
        currentUser: '',
        successAuth: '',
        errorAuth: '',
    },
    reducers: {
        signOut: (state) => {
            state.currentUser = '';
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchSignIn.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchSignIn.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.payload.message) {
                state.errorAuth = action.payload.message;
                // state.successAuth = '';
            } else {
                state.successAuth = 'success';
                // state.errorAuth = '';
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
        return error.response.data;
        // return error;
    }
});

export const fetchGetCurrentUser = createAsyncThunk('auth/fetchGetCurrentUser', async (token) => {
    const response = await userService.getCurrentUser(token);
    return response;
});

export default authSlice;
