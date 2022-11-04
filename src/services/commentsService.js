import * as httpRequest from '~/utils/httpRequest';

const token = JSON.parse(localStorage.getItem('token'));

export const getComments = async (videoId) => {
    try {
        const response = await httpRequest.get(`/videos/${videoId}/comments`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const likeComments = async (commentsId) => {
    try {
        const response = await httpRequest.post(
            `/comments/${commentsId}/like`,
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

export const unLikeComments = async (commentsId) => {
    try {
        const response = await httpRequest.post(
            `/comments/${commentsId}/unlike`,
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

export const createNewComment = async (data) => {
    try {
        const response = await httpRequest.post(
            `/videos/${data.videoUid}/comments`,
            { comment: data.comment },
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
