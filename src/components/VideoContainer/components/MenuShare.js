import classNames from 'classnames/bind';
import styles from './MenuShare.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Tippy from '@tippyjs/react/headless';
import { DipIcon, FacebookIcon, LinkListIcon, ShareToFriendIcon, WhatAppIcon } from '~/components/Icons';
import MenuItem from '~/components/Popper/Menu/MenuItem';
const cx = classNames.bind(styles);
const MENU_ITEM_SHARE = [
    { title: 'Nhúng', icon: <DipIcon /> },
    { title: 'Gửi đến bạn bè', icon: <ShareToFriendIcon /> },
    { title: 'Chia sẻ với Facebook', icon: <FacebookIcon /> },
    { title: 'Chia sẻ với WhatsApp', icon: <WhatAppIcon /> },
    { title: 'Sao chép liên kết', icon: <LinkListIcon /> },
];
function MenuShare({ children }) {
    const renderItems = () => {
        return MENU_ITEM_SHARE.map((item, index) => <MenuItem data={item} key={index} />);
    };

    const renderResult = (attrs) => {
        return (
            <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                <PopperWrapper>
                    <div className={cx('menu-body')}> {renderItems()}</div>
                </PopperWrapper>
            </div>
        );
    };
    return (
        <Tippy delay={[0, 500]} offset={[13, 12]} interactive placement="top-start" render={renderResult}>
            {children}
        </Tippy>
    );
}

export default MenuShare;
