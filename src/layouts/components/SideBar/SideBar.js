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
import GoToTop from '~/components/GoToTop/GoToTop';

const cx = classNames.bind(styles);

const PER_PAGE = 5;

function SideBar() {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [followingAccounts, setFollowingAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            const dataSuggestedUsers = await userService.getSuggested({ page: 1, perPage: PER_PAGE });
            setSuggestedUsers(dataSuggestedUsers);

            const dataFollowingAccounts = await userService.getFollowingAccount({ page: 1 });
            setFollowingAccounts(dataFollowingAccounts);
            setLoading(false);
        };
        fetchApi();
    }, []);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
            <SuggestAccount label="Tài khoản được đề xuất" data={suggestedUsers} loading={loading} />
            <GoToTop />
            {currentUser && (
                <SuggestAccount label="Các tài khoản đang follow" data={followingAccounts} loading={loading} />
            )}
        </aside>
    );
}

export default SideBar;
