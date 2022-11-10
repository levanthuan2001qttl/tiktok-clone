import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './VideoItem.module.scss';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function VideoItem({ data }) {
    const [isHover, setIsHover] = useState(false);

    const videoRef = useRef();

    const handleMouseOverVideo = () => {
        setIsHover(true);
        videoRef?.current?.play();
    };

    const handleMouseLeaveVideo = () => {
        setIsHover(false);
        videoRef?.current?.pause();
    };
    return (
        <div className={cx('video-container')}>
            <div className={cx('video-feed')} onMouseOver={handleMouseOverVideo} onMouseLeave={handleMouseLeaveVideo}>
                <div style={{ height: '100%', width: '100%' }}>
                    <Image className={cx('thumb-url')} src={data.thumb_url} />
                </div>
                {isHover && (
                    <div className={cx('video_mp4')}>
                        <video className={cx('feed-video-container')} src={data.file_url} ref={videoRef} loop />
                    </div>
                )}
                <div className={cx('video-footer')}>
                    <svg
                        className={cx('video-icon')}
                        width={22}
                        height={22}
                        viewBox="0 0 48 48"
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16 10.554V37.4459L38.1463 24L16 10.554ZM12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z"
                        />
                    </svg>
                    <strong className={cx('video-count-strong')}>{data.likes_count}</strong>
                </div>
            </div>
            <div style={{ marginTop: '10px' }}>
                <Link to="">
                    <div className={cx('user-describe')}>
                        <span style={{ fontWeight: '400' }}>{data.description}</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default VideoItem;
