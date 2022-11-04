import { useRef, useState, useEffect } from 'react';
import styles from './VideoComment.module.scss';
import classNames from 'classnames/bind';
import { Slider } from 'antd';

import { VolumeIcon, VolumeMutedIcon } from '~/components/Icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { secondToMinute } from '~/helps/secondToMinute';

const cx = classNames.bind(styles);

function VideoComment({ data }) {
    const [playing, setPlaying] = useState(true);
    const [isHover, setIsHover] = useState(false);
    const [songDuration, setSongDuration] = useState(data.meta.playtime_seconds);
    const [songCurrentTime, setSongCurrentTime] = useState(0);

    const videoRef = useRef(null);

    useEffect(() => {
        videoRef?.current?.play();
    }, [data]);

    useEffect(() => {
        const handle = (e) => {
            if (e.code === 'Space') {
                if (playing) {
                    videoRef?.current?.pause();
                    setPlaying(!playing);
                } else {
                    videoRef?.current?.play();
                    setPlaying(!playing);
                }
            }
        };
        document.addEventListener('keydown', handle);
        return () => document.removeEventListener('keydown', handle);
    }, [playing]);

    const onVideoClick = () => {
        if (playing) {
            videoRef?.current?.pause();
            setPlaying(!playing);
        } else {
            videoRef?.current?.play();
            setPlaying(!playing);
        }
    };

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

    return (
        <div className={cx('feed-video')} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {
                <video
                    ref={videoRef}
                    onClick={onVideoClick}
                    className={cx('feed-video-container')}
                    src={data.file_url}
                    loop
                    onTimeUpdate={onTimeUpdate}
                />
            }
            {
                <div>
                    {!playing && (
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
            }
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

export default VideoComment;
