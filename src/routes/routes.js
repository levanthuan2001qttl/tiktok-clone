//layout
import DefaultLayout, { HeaderOnly } from '~/layouts';

import Home from '~/pages/Home';
import Following from '~/pages/Following/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Live from '~/pages/Live';

import configs from '~/configs';
import Listing from '~/pages/Listing';
import VideoDetails from '~/pages/VideoDetails';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Search from '~/pages/Search';

const publicRoutes = [
    {
        path: configs.routes.home,
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: configs.routes.following,
        component: Following,
        layout: DefaultLayout,
    },

    {
        path: configs.routes.upload,
        component: Upload,
        layout: HeaderOnly,
    },
    {
        path: configs.routes.live,
        component: Live,
        layout: DefaultLayout,
    },
    {
        path: configs.routes.listing,
        component: Listing,
        layout: HeaderOnly,
    },
    {
        path: configs.routes.signIn,
        component: SignIn,
        layout: DefaultLayout,
    },
    {
        path: configs.routes.signUp,
        component: SignUp,
        layout: DefaultLayout,
    },
    {
        path: configs.routes.videoDetails,
        component: VideoDetails,
    },
    {
        path: configs.routes.profile,
        component: Profile,
        layout: HeaderOnly,
    },
    {
        path: configs.routes.profile,
        component: Profile,
        layout: HeaderOnly,
    },

    {
        path: configs.routes.search,
        component: Search,
        layout: DefaultLayout,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
