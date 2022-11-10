import classNames from 'classnames/bind';
import ProfileInfo from './containers/ProfileInfo';
import VideoList from './containers/VideoList';
import styles from './Profile.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetUserProfile } from '~/modules/userVideos/userVideosSlice';
import { userProfileSelector } from '~/modules/userVideos/userVideoSelector';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Profile() {
    const { nickname } = useParams();
    const dispatch = useDispatch();
    const userProfile = useSelector(userProfileSelector);
    useEffect(() => {
        dispatch(fetchGetUserProfile(nickname));
    }, [dispatch, nickname]);

    return (
        <div className={cx('profile')}>
            {userProfile && (
                <div>
                    <ProfileInfo data={userProfile} />
                    <VideoList data={userProfile.videos} />
                </div>
            )}
        </div>
    );
}

export default Profile;
