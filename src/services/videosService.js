import * as httpRequest from '~/utils/httpRequest';

const token = JSON.parse(localStorage.getItem('token'));

export const getUserProfile = async (nickname) => {
    try {
        const response = await httpRequest.get(`users/@${nickname}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const createVideo = async (formData) => {
    try {
        const response = await httpRequest.post('/videos', formData, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAVideo = async (uid) => {
    try {
        const response = await httpRequest.get(`/videos/${uid}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getUserVideos = async (userId) => {
    try {
        const response = await httpRequest.get(`/users/${userId}/videos`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getVideoListForYou = async (data) => {
    try {
        const response = await httpRequest.get('/videos', {
            params: {
                type: data.type,
                page: data.page,
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

export const likeVideo = async (uid) => {
    try {
        const response = await httpRequest.post(
            `/videos/${uid}/like`,
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

export const unLikeVideo = async (uid) => {
    try {
        const response = await httpRequest.post(
            `/videos/${uid}/unlike`,
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
