import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faPlus,
    faSignIn,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import config from '~/configs';
import Modal from '~/components/Modal';
import Button from '~/components/Button/Button';
import Menu from '~/components/Popper/Menu/Menu';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Image from '~/components/Image/Image';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Search from '../Search';
import { useDispatch, useSelector } from 'react-redux';
import authSlice, { fetchGetCurrentUser } from '~/modules/authenticationSlice/authenticationSlice';
import { getCurrentUserSelector } from '~/modules/authenticationSlice/authSelector';
import FormSigIn from '~/components/FormSigIn';

const cx = classNames.bind(styles);

const MENU_ITEM = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coin',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Setting',
            to: '/setting',
        },
        ...MENU_ITEM,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            separate: true,
        },
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getCurrentUser = useSelector(getCurrentUserSelector);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const [modalIsOpen, setIsOpen] = useState(false);
    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            dispatch(fetchGetCurrentUser(token));
        }
    }, [dispatch, token]);

    const handleOnChange = (menuItem) => {
        switch (menuItem.title) {
            case 'Log out':
                localStorage.setItem('currentUser', false);
                localStorage.removeItem('token');
                dispatch(authSlice.actions.signOut());
                navigate('/sign-in');
                window.location.reload();
                break;
            case 'View profile':
                navigate(`/@${getCurrentUser.nickname}/${getCurrentUser.id}`);
                break;

            default:
                break;
        }
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="" />
                </Link>
                <Search />

                <div className={cx('action')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')} onClick={() => navigate('/upload')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            {/* <Button leftIcon={<FontAwesomeIcon icon={faPlus} />} outlineBrow to="/">
                                Upload
                            </Button> */}
                            <Button
                                onClick={openModal}
                                primary
                                rightIcon={<FontAwesomeIcon className={cx('search-icon')} icon={faSignIn} />}
                            >
                                Đăng nhập
                            </Button>
                        </>
                    )}
                    <FormSigIn isOpen={modalIsOpen} onRequestClose={closeModal} />

                    <Menu items={currentUser ? userMenu : MENU_ITEM} onChange={handleOnChange}>
                        {currentUser ? (
                            <button className={cx('action-btn')}>
                                <Image
                                    className={cx('user-avatar')}
                                    alt=""
                                    width="32px"
                                    height="32px"
                                    src={getCurrentUser.avatar}
                                />
                            </button>
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
