import * as httpRequest from '~/utils/httpRequest';

export const getVideoListForYou = async (type = 'for-you', page = 3) => {
    try {
        const response = await httpRequest.get('/videos', {
            params: {
                type,
                page,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
