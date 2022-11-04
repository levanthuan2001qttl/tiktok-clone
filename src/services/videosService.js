import * as httpRequest from '~/utils/httpRequest';

const token = JSON.parse(localStorage.getItem('token'));

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

export const getVideoListForYou = async (page = 1, type = 'for-you') => {
    try {
        const response = await httpRequest.get('/videos', {
            params: {
                type,
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
