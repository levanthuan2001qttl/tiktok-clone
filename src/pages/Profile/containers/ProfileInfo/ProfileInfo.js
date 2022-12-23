import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
import { memo, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button';
import { EditProfileIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Modal from '~/components/Modal';
import { getCurrentUserSelector } from '~/modules/authenticationSlice/authSelector';
import { fetchFollowAUser, fetchUnFollowAUser } from '~/modules/detailVideoSlice/detailVideoSlice';
import EditProfile from '../../components/EditProfile';
import styles from './ProfileInfo.module.scss';
const cx = classNames.bind(styles);

function ProfileInfo({ data }) {
    const [dataProfile, setDataProfile] = useState(data);
    const [isFetchFollow, setIsFetchFollow] = useState(data.is_followed);
    const [countFollower, setCountFollower] = useState(data.followers_count);
    const [isOpen, setIsOpen] = useState(false);
    const getCurrentUser = useSelector(getCurrentUserSelector);

    // console.log({ data });
    // console.log({ dataProfile });

    const totalLikes = useMemo(() => {
        return data.videos.reduce((acc, item) => {
            return acc + item.user.likes_count;
        }, 0);
    }, [data]);

    useLayoutEffect(() => {
        setDataProfile(data);
    }, [data]);

    const dispatch = useDispatch();
    const handleFollow = () => {
        dispatch(fetchFollowAUser(data.id));
        setIsFetchFollow(true);
        setCountFollower(countFollower + 1);
    };

    const handleUnFollow = () => {
        dispatch(fetchUnFollowAUser(data.id));
        setIsFetchFollow(false);
        setCountFollower(countFollower - 1);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSaveProfile = (newProfile) => {
        setDataProfile(newProfile);
    };

    return (
        <div className={cx('profile-info')}>
            <div className={cx('profile-info-desc')}>
                <div className={cx('profile-avatar')}>
                    <Image src={dataProfile.avatar} alt="" />
                </div>
                <div className={cx('profile-info-description')}>
                    <h2 className={cx('user-title')}>{dataProfile.nickname}</h2>
                    <h1 className={cx('user-subtitle')}>{dataProfile.first_name + ' ' + dataProfile.last_name}</h1>
                    {getCurrentUser.id !== dataProfile.id ? (
                        <div style={{ width: '140px', marginTop: '10px' }}>
                            {!isFetchFollow ? (
                                <Button w100 primary onClick={handleFollow}>
                                    Follow
                                </Button>
                            ) : (
                                <Button w100 outlineBrow onClick={handleUnFollow}>
                                    Đang Follow
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div style={{ width: '140px', marginTop: '10px' }}>
                            <Button w100 outlineBrow leftIcon={<EditProfileIcon />} onClick={openModal}>
                                Sửa hồ sơ
                            </Button>
                        </div>
                    )}
                </div>
                <Modal isOpen={isOpen} onRequestClose={closeModal}>
                    <EditProfile data={dataProfile} onRequestClose={closeModal} onSaveProfile={handleSaveProfile} />
                </Modal>
            </div>
            <h2 className={cx('user-count-info')}>
                <div className={cx('user-count-div')}>
                    <strong>{data.followings_count}</strong>
                    <span className={cx('user-count-title')}>Đang Follow</span>
                </div>
                <div className={cx('user-count-div')}>
                    <strong>{countFollower}</strong>
                    <span className={cx('user-count-title')}> Follow</span>
                </div>
                <div className={cx('user-count-div')}>
                    <strong>{totalLikes}</strong>
                    <span className={cx('user-count-title')}>Thích</span>
                </div>
            </h2>
            <h2 className={cx('user-share-desc')}>cảm ơn🙏</h2>
        </div>
    );
}

export default memo(ProfileInfo);
