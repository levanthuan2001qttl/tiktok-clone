import classNames from 'classnames/bind';
import styles from './VideoContainer.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { CommentIcon, HeartIcon, ShareIcon } from './../Icons/Icons';
import Video from './Video';
import { secondToMinute } from '~/helps/secondToMinute';
import MenuShare from './components/MenuShare';

const cx = classNames.bind(styles);

function VideoContainer({ data }) {
    console.log({ data });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-avatar')}>
                <img loading="lazy" src={data.user.avatar} alt="" />
            </div>
            <div className={cx('video-container')}>
                <div className={cx('video-container-info')}>
                    <Link to="" className={cx('video-container-author')}>
                        <h3 className={cx('video-container-nickname')}>{data.user.nickname}</h3>
                        <h4 className={cx('video-container-bio')}>{data.user.last_name}. </h4>
                        <h3 className={cx('video-container-created_at')}>
                            {secondToMinute(data.meta.playtime_seconds)}
                        </h3>
                    </Link>
                </div>
                <div className={cx('video-container-has-tag')}>
                    <span className={cx('video-container-has-tag-description')}>{data.description}</span>
                    <a
                        className={cx('video-container-has-tag-link')}
                        href="/#"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <strong> #viral</strong>
                    </a>
                    <a
                        className={cx('video-container-has-tag-link')}
                        href="/#"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <strong> #viral</strong>
                    </a>
                    <a
                        className={cx('video-container-has-tag-link')}
                        href="/#"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <strong> #viral</strong>
                    </a>
                </div>
                <div className={cx('video-container-video-music')}>
                    <Link className={cx('video-container-video-music-link')} to={'#'}>
                        <FontAwesomeIcon icon={faMusic} className={cx('video-container-music-icon')} />
                        nhạc nền - Bùi Thu Trà
                    </Link>
                </div>
                <div className={cx('video-container-wrapper')}>
                    <Video data={data} />
                    <div className={cx('feed-video-action')}>
                        <MenuShare>
                            <button className={cx('feed-video-button')}>
                                <span className={cx('feed-video-span-icon')}>
                                    <ShareIcon />
                                </span>
                                <strong>{data.shares_count}</strong>
                            </button>
                        </MenuShare>

                        <button className={cx('feed-video-button')}>
                            <span className={cx('feed-video-span-icon')}>
                                <CommentIcon />
                            </span>
                            <strong>{data.comments_count}</strong>
                        </button>
                        <button className={cx('feed-video-button')}>
                            <span className={cx('feed-video-span-icon')}>
                                <HeartIcon />
                            </span>
                            <strong>{data.likes_count}</strong>
                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('video-container-follow')}>
                <Button outline>Follow</Button>
            </div>
        </div>
    );
}

export default VideoContainer;
