import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import config from '~/configs';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    UserGroupIcon,
    LiveIcon,
    HomeActiveIcon,
    UserGroupActiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import SuggestAccount from '~/components/SuggestAccount';
import { userService } from '~/services';
import RequireLogin from './RequireLogin/RequireLogin';

const cx = classNames.bind(styles);

const PER_PAGE = 5;

function SideBar() {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    // const [followingAccounts, setFollowingAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            const dataSuggestedUsers = await userService.getSuggested({ page: 1, perPage: PER_PAGE });
            setSuggestedUsers(dataSuggestedUsers);
            setLoading(false);
            // const dataFollowingAccounts = await userService.getFollowingAccount({ page: 1 });
            // console.log({ dataFollowingAccounts });
            // setFollowingAccounts(dataFollowingAccounts);
        };
        fetchApi();
    }, []);
    const currentUser = localStorage.getItem('currentUser');

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="For Your"
                    to={config.routes.home}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="Live" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            {!currentUser && <RequireLogin title="Đăng nhập để follow các tác giả, thích video và xem bình luận." />}
            <SuggestAccount label="Suggested Accounts" data={suggestedUsers} loading={loading} />
            {/* <SuggestAccount label="Suggested Accounts" data={suggestedUsers} /> */}
            {/* <SuggestAccount label="Following Accounts" data={followingAccounts} /> */}
        </aside>
    );
}

export default SideBar;
