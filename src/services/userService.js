import * as httpRequest from '~/utils/httpRequest';

export const signIn = async (body) => {
    const response = await httpRequest.post('/auth/login', body);
    return response;
};

export const getCurrentUser = async (token) => {
    try {
        const response = await httpRequest.get('/auth/me', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getSuggested = async ({ page, perPage }) => {
    try {
        const response = await httpRequest.get('/users/suggested', {
            params: {
                page,
                per_page: perPage,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getFollowingAccount = async ({ page }) => {
    try {
        const response = await httpRequest.get('/me/followings', {
            params: {
                page,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
