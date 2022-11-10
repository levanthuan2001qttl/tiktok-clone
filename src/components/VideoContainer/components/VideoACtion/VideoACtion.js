import { CommentIcon, HeartIcon, HeartLikeIcon, ShareIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './VideoACtion.module.scss';

import MenuShare from '../MenuShare/MenuShare';
import { useDispatch } from 'react-redux';
import { fetchLikeVideo, fetchUnLikeVideo } from '~/modules/homeSlice/homeSlice';
import { useNavigate } from 'react-router-dom';
import detailVideoSlice from '~/modules/detailVideoSlice/detailVideoSlice';
const cx = classNames.bind(styles);

function VideoACtion({ data, index }) {
    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem('token'));
    const handleLikeVideo = async (uid) => {
        if (token) {
            dispatch(fetchLikeVideo(uid));
        } else {
            navigate('/sign-in');
        }
    };

    const handleUnLikeVideo = async (uid) => {
        if (token) {
            dispatch(fetchUnLikeVideo(uid));
        } else {
            navigate('/sign-in');
        }
    };
    const navigate = useNavigate();
    const handleClickSeeDetailVideo = () => {
        navigate(`/@${data.user.nickname}/video/${data.uuid}/${data.id}`);
        localStorage.setItem('videoIndex', index);
        dispatch(detailVideoSlice.actions.selectedVideoIndex(index));
        dispatch(detailVideoSlice.actions.saveVideo(data));
    };
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

            <button className={cx('feed-video-button')} onClick={handleClickSeeDetailVideo}>
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
