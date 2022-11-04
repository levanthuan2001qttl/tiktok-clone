import classNames from 'classnames/bind';
import styles from './VideoContainer.module.scss';
import Button from '~/components/Button';
import Image from '../Image';
import { VideoAction, VideoInfo, VideoWrapper } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFollowUser, fetchUnFollowUser } from '~/modules/homeSlice/homeSlice';
import { getCurrentUserSelector } from '~/modules/authenticationSlice/authSelector';

const cx = classNames.bind(styles);

function VideoContainer({ data, index }) {
    const dispatch = useDispatch();
    const getCurrentUser = useSelector(getCurrentUserSelector);

    const handleUnFollow = (userId) => {
        dispatch(fetchUnFollowUser(userId));
    };

    const handleFollow = (userId) => {
        dispatch(fetchFollowUser(userId));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-avatar')}>
                <Image loading="lazy" src={data.user.avatar} alt="" />
            </div>
            <div className={cx('video-container')}>
                <VideoInfo data={data} />
                <div className={cx('video-container-wrapper')}>
                    <VideoWrapper data={data} index={index} />
                    <VideoAction data={data} />
                </div>
            </div>
            {getCurrentUser.id !== data.user.id && (
                <div className={cx('video-container-follow')}>
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
    );
}

export default VideoContainer;
