import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import FormSigIn from '~/components/FormSigIn';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetCurrentUser } from '~/modules/authenticationSlice/authenticationSlice';
import { getCurrentUserSelector } from '~/modules/authenticationSlice/authSelector';

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
    const [modalIsOpen, setIsOpen] = useState(false);
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoaa',
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
            to: '/logout',
            separate: true,
        },
    ];
    const handleOnChange = (menuItem) => {
        console.log(menuItem);
    };
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const token = JSON.parse(localStorage.getItem('token'));

    const dispatch = useDispatch();
    const getCurrentUser = useSelector(getCurrentUserSelector);

    useEffect(() => {
        if (token) {
            dispatch(fetchGetCurrentUser(token));
        }
    }, [dispatch, token]);
    const currentUser = localStorage.getItem('currentUser');
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
                                <button className={cx('action-btn')}>
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
                            <Button leftIcon={<FontAwesomeIcon icon={faPlus} />} outlineBrow to="/">
                                Upload
                            </Button>
                            <Button
                                onClick={openModal}
                                primary
                                rightIcon={<FontAwesomeIcon className={cx('search-icon')} icon={faSignIn} />}
                            >
                                Log in
                            </Button>
                        </>
                    )}
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

                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                        <FormSigIn closeModalSignIn={closeModal} />
                    </Modal>
                </div>
            </div>
        </header>
    );
}

export default Header;
