import * as httpRequest from '~/utils/httpRequest';

const token = JSON.parse(localStorage.getItem('token'));

export const signIn = async (body) => {
    const response = await httpRequest.post('/auth/login', body);
    return response;
};

export const signUp = async (body) => {
    const response = await httpRequest.post('/auth/register', body);
    return response;
};

export const signOut = async (body) => {
    const response = await httpRequest.post(
        '/auth/logout',
        {},
        {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    );
    return response.data;
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

export const editProfile = async (formData) => {
    try {
        const response = await httpRequest.post('/auth/me', formData, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            params: {
                _method: 'PATCH',
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
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const followUser = async (userId) => {
    try {
        const response = await httpRequest.post(
            `/users/${userId}/follow`,
            {},
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
        );

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const unFollowUser = async (userId) => {
    try {
        const response = await httpRequest.post(
            `/users/${userId}/unfollow`,
            {},
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
        );

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
