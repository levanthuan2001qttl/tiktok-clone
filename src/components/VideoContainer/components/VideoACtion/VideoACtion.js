import { CommentIcon, HeartIcon, HeartLikeIcon, ShareIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './VideoACtion.module.scss';

import MenuShare from '../MenuShare/MenuShare';
import { useDispatch } from 'react-redux';
import { fetchLikeVideo, fetchUnLikeVideo } from '~/modules/homeSlice/homeSlice';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function VideoACtion({ data }) {
    const dispatch = useDispatch();

    const handleLikeVideo = async (uid) => {
        dispatch(fetchLikeVideo(uid));
    };

    const handleUnLikeVideo = async (uid) => {
        dispatch(fetchUnLikeVideo(uid));
    };
    const navigate = useNavigate();

    return (
        <div className={cx('feed-video-action')}>
            <MenuShare>
                <button className={cx('feed-video-button')}>
                    <span className={cx('feed-video-span-icon')}>
                        <ShareIcon />
                    </span>
                    <strong className={cx('feed-video-span-icon-value')}>{data.shares_count}</strong>
                </button>
            </MenuShare>

            <button
                className={cx('feed-video-button')}
                onClick={() => navigate(`/@${data.user.nickname}/video/${data.uuid}/${data.id}`)}
            >
                <span className={cx('feed-video-span-icon')}>
                    <CommentIcon />
                </span>
                <strong className={cx('feed-video-span-icon-value')}>{data.comments_count}</strong>
            </button>
            {!data.is_liked ? (
                <button className={cx('feed-video-button')} onClick={() => handleLikeVideo(data.uuid)}>
                    <span className={cx('feed-video-span-icon')}>
                        <HeartIcon />
                    </span>
                    <strong className={cx('feed-video-span-icon-value')}>{data.likes_count}</strong>
                </button>
            ) : (
                <button className={cx('feed-video-button')} onClick={() => handleUnLikeVideo(data.uuid)}>
                    <span className={cx('feed-video-span-icon')}>
                        <HeartLikeIcon />
                    </span>
                    <strong className={cx('feed-video-span-icon-value')}>{data.likes_count} </strong>
                </button>
            )}
        </div>
    );
}

export default VideoACtion;
