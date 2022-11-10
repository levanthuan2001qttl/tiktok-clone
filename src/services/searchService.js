import * as httpRequest from '~/utils/httpRequest';

export const search = async ({ q, type = 'less', page = 1 }) => {
    try {
        const response = await httpRequest.get('/users/search', {
            params: {
                q,
                type,
                page,
            },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
