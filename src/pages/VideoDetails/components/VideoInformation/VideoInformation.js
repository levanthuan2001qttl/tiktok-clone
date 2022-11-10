import classNames from 'classnames/bind';
import styles from './VideoInformation.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {
    CommentIcon,
    HeartIcon,
    HeartLikeIcon,
    DipIcon,
    ShareToFriendIcon,
    FacebookIcon,
    WhatAppIcon,
} from '~/components/Icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Fragment, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchFollowAUser,
    fetchLikeAVideo,
    fetchUnFollowAUser,
    fetchUnLikeAVideo,
} from '~/modules/detailVideoSlice/detailVideoSlice';
import { getCurrentUserSelector } from '~/modules/authenticationSlice/authSelector';
import Image from '~/components/Image';
const cx = classNames.bind(styles);

function VideoInformation({ data }) {
    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navigate = useNavigate();
    const handleLikeVideo = async (uid) => {
        if (currentUser) {
            dispatch(fetchLikeAVideo(uid));
        } else {
            navigate('/sign-in');
        }
    };

    const handleUnLikeVideo = async (uid) => {
        if (currentUser) {
            dispatch(fetchUnLikeAVideo(uid));
        } else {
            navigate('/sign-in');
        }
    };
    const getCurrentUser = useSelector(getCurrentUserSelector);

    const handleUnFollow = (userId) => {
        if (currentUser) {
            dispatch(fetchUnFollowAUser(userId));
        } else {
            navigate('/sign-in');
        }
    };

    const handleFollow = (userId) => {
        if (currentUser) {
            dispatch(fetchFollowAUser(userId));
        } else {
            navigate('/sign-in');
        }
    };
    return (
        <div style={{ minHeight: '300px' }}>
            <div className={cx('info-container')}>
                <div className="d-flex justify-space-between align-center">
                    <Link to={`/@${data.user.nickname}/${data.user.id}`}>
                        <Image src={data.user.avatar} alt="" className={cx('info-avatar')} />
                    </Link>
                    <Link to={`/@${data.user.nickname}/${data.user.id}`} className={cx('info-name')}>
                        <span>
                            {data.user.nickname}{' '}
                            {data.user.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />}
                        </span>
                        <p>
                            {data.user.last_name} . {data.created_at.slice(5, 10)}
                        </p>
                    </Link>
                </div>
                {getCurrentUser.id !== data.user.id && (
                    <div>
                        {data.user.is_followed ? (
                            <Button outlineBrow onClick={() => handleUnFollow(data.user.id)}>
                                Đang Follow
                            </Button>
                        ) : (
                            <Button outline onClick={() => handleFollow(data.user.id)}>
                                Follow
                            </Button>
                        )}
                    </div>
                )}
            </div>
            <div className={cx('has-tag-container')}>
                <span>{data.description}</span>
                <Link to={'#'} className={cx('has-tag-link')}>
                    #LearnOnTikTok
                </Link>
                <Link to={'#'} className={cx('has-tag-link')}>
                    #LearnOnTikTok
                </Link>
                <Link to={'#'} className={cx('has-tag-link')}>
                    #LearnOnTikTok
                </Link>
                <Link to={'#'} className={cx('has-tag-link')}>
                    #LearnOnTikTok
                </Link>
            </div>
            <div className={cx('video-container-video-music')}>
                <Link className={cx('video-container-video-music-link')} to={'#'}>
                    <FontAwesomeIcon icon={faMusic} className={cx('video-container-music-icon')} />
                    {data.music || 'nhạc nền - Bùi Thu Trà'}
                </Link>
            </div>
            <div className={cx('video-container-sharing')}>
                <div className="d-flex justify-content-center align-center">
                    <button className={cx('feed-video-comment-button')} style={{ cursor: 'default' }}>
                        <span className={cx('feed-video-comment-span-icon')}>
                            <CommentIcon />
                        </span>
                        <span className={cx('feed-video-comment-span-icon-value')}>{data.comments_count}</span>
                    </button>
                    {!data.is_liked ? (
                        <button className={cx('feed-video-comment-button')} onClick={() => handleLikeVideo(data.uuid)}>
                            <span className={cx('feed-video-comment-span-icon')}>
                                <HeartIcon />
                            </span>
                            <span className={cx('feed-video-comment-span-icon-value')}>{data.likes_count}</span>
                        </button>
                    ) : (
                        <button
                            className={cx('feed-video-comment-button')}
                            onClick={() => handleUnLikeVideo(data.uuid)}
                        >
                            <span className={cx('feed-video-comment-span-icon')}>
                                <HeartLikeIcon />
                            </span>
                            <span className={cx('feed-video-comment-span-icon-value')}>{data.likes_count}</span>
                        </button>
                    )}
                </div>
                <div>
                    <Tippy delay={[0, 50]} content="Nhúng" placement="top">
                        <button className={cx('action-btn-sharing')}>
                            <DipIcon />
                        </button>
                    </Tippy>
                    <Tippy delay={[0, 50]} content="Chia sẻ với Telegram" placement="top">
                        <button className={cx('action-btn-sharing')}>
                            <ShareToFriendIcon />
                        </button>
                    </Tippy>
                    <Tippy delay={[0, 50]} content="Chia sẻ với Facebook" placement="top">
                        <button className={cx('action-btn-sharing')}>
                            <FacebookIcon />
                        </button>
                    </Tippy>{' '}
                    <Tippy delay={[0, 50]} content="Chia sẽ với WhatApp" placement="top">
                        <button className={cx('action-btn-sharing')}>
                            <WhatAppIcon />
                        </button>
                    </Tippy>
                </div>
            </div>
        </div>
    );
}

export default memo(VideoInformation);
