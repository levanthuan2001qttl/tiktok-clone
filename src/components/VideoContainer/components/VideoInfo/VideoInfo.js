import { Fragment } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoInfo.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function VideoInfo({ data }) {
    return (
        <Fragment>
            <div className={cx('video-container-info')}>
                <Link to="" className={cx('video-container-author')}>
                    <h3 className={cx('video-container-nickname')}>{data.user.nickname}</h3>
                    <h4 className={cx('video-container-bio')}>{data.user.last_name}. </h4>
                    <h3 className={cx('video-container-created_at')}>{data.created_at.slice(5, 10)}</h3>
                </Link>
            </div>
            <div className={cx('video-container-has-tag')}>
                <span className={cx('video-container-has-tag-description')}>{data.description}</span>
                <a className={cx('video-container-has-tag-link')} href="/#" target="_blank" rel="noopener noreferrer">
                    <strong> #viral</strong>
                </a>
                <a className={cx('video-container-has-tag-link')} href="/#" target="_blank" rel="noopener noreferrer">
                    <strong> #viral</strong>
                </a>
                <a className={cx('video-container-has-tag-link')} href="/#" target="_blank" rel="noopener noreferrer">
                    <strong> #viral</strong>
                </a>
            </div>
            <div className={cx('video-container-video-music')}>
                <Link className={cx('video-container-video-music-link')} to={'#'}>
                    <FontAwesomeIcon icon={faMusic} className={cx('video-container-music-icon')} />
                    {data.music || 'nhạc nền - Bùi Thu Trà'}
                </Link>
            </div>
        </Fragment>
    );
}

export default VideoInfo;
