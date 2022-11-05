import { useRef, useState, useEffect } from 'react';
import { useElementOnScreen } from '~/hooks';
import classNames from 'classnames/bind';
import styles from './VideoWrapper.module.scss';
import { Slider } from 'antd';
import { VolumeIcon, VolumeMutedIcon } from '~/components/Icons';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { secondToMinute } from '~/helps/secondToMinute';
import { useNavigate } from 'react-router-dom';
import detailVideoSlice from '~/modules/detailVideoSlice/detailVideoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoListForYouSelector } from '~/modules/homeSlice/homeSelector';

const cx = classNames.bind(styles);

function Video({ data, index }) {
    const [playing, setPlaying] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [songDuration, setSongDuration] = useState(data.meta.playtime_seconds);
    const [songCurrentTime, setSongCurrentTime] = useState(0);

    const videoRef = useRef(null);
    const options = { root: null, rootMargin: '0px', threshold: 0.6 };
    const isVisible = useElementOnScreen(options, videoRef);

    const onVideoClick = () => {
        if (playing) {
            videoRef?.current?.pause();
            setPlaying(!playing);
        } else {
            videoRef?.current?.play();
            setPlaying(!playing);
        }
    };

    useEffect(() => {
        if (isVisible) {
            if (!playing) {
                videoRef.current.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
    }, [isVisible]);

    const [volume, setVolume] = useState(100);

    const handleChangeVolume = (value) => {
        videoRef.current.volume = value / 100;
        setVolume(value);
    };

    const handleToggleMuteVolume = (value) => {
        setVolume(value);
        videoRef.current.volume = value / 100;
    };

    const onTimeUpdate = () => {
        setSongCurrentTime(videoRef.current.currentTime);
    };
    const handleChangeCurrentTime = (value) => {
        let currentTime = (songDuration * value) / 100;
        videoRef.current.currentTime = currentTime;
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickSeeDetailVideo = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            navigate(`/@${data.user.nickname}/video/${data.uuid}/${data.id}`);
            localStorage.setItem('videoIndex', index);
            dispatch(detailVideoSlice.actions.selectedVideoIndex(index));
            dispatch(detailVideoSlice.actions.saveVideo(data));
        } else {
            navigate('/sign-in');
        }
    };

    return (
        <div className={cx('feed-video')} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {
                <video
                    ref={videoRef}
                    onClick={handleClickSeeDetailVideo}
                    className={cx('feed-video-container')}
                    src={data.file_url}
                    loop
                    onTimeUpdate={onTimeUpdate}
                />
            }
            {isHover && (
                <div>
                    {playing ? (
                        <button className={cx('feed-video-button-play')} onClick={onVideoClick}>
                            <FontAwesomeIcon className={cx('feed-video-button-play-icon')} icon={faPause} />
                        </button>
                    ) : (
                        <button className={cx('feed-video-button-play')} onClick={onVideoClick}>
                            <FontAwesomeIcon className={cx('feed-video-button-play-icon')} icon={faPlay} />
                        </button>
                    )}

                    <div className={cx('feed-video-button-volume-off')}>
                        <div className={cx('feed-video-button-volume-off-slider')}>
                            <Slider
                                tooltip={{ open: false }}
                                vertical
                                defaultValue={volume}
                                value={volume}
                                onChange={handleChangeVolume}
                            />
                        </div>
                        <div className={cx('feed-video-button-volume-off-icon')}>
                            {volume === 0 ? (
                                <button
                                    style={{ background: 'none', cursor: 'pointer' }}
                                    onClick={() => handleToggleMuteVolume(100)}
                                >
                                    <VolumeMutedIcon />
                                </button>
                            ) : (
                                <button
                                    style={{ background: 'none', cursor: 'pointer' }}
                                    onClick={() => handleToggleMuteVolume(0)}
                                >
                                    <VolumeIcon />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {Math.floor(songDuration) > 30 && isHover && (
                <div className={cx('video-player-slider')}>
                    <div className={cx('video-player-slider-duration')}>
                        <Slider
                            value={(songCurrentTime / songDuration) * 100 || 0}
                            defaultValue={songCurrentTime}
                            onChange={handleChangeCurrentTime}
                            tooltip={{ open: false }}
                        />
                    </div>
                    <div className={cx('video-player-seek-bar-time')}>
                        {secondToMinute(songCurrentTime)}/{secondToMinute(songDuration)}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Video;
