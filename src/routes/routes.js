//layout
import { HeaderOnly } from '~/layouts';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Live from '~/pages/Live';

import configs from '~/configs';
import Listing from '~/pages/Listing';

const publicRoutes = [
    {
        path: configs.routes.home,
        component: Home,
    },
    {
        path: configs.routes.following,
        component: Following,
    },
    {
        path: configs.routes.profile,
        component: Profile,
        layout: HeaderOnly,
    },
    {
        path: configs.routes.upload,
        component: Upload,
        layout: HeaderOnly,
    },
    {
        path: configs.routes.live,
        component: Live,
    },
    {
        path: configs.routes.listing,
        component: Listing,
        layout: HeaderOnly,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
