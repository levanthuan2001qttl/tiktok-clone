import { Fragment } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoInfo.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from '~/components/SuggestAccount/AccountPreview';

const cx = classNames.bind(styles);

function VideoInfo({ data }) {
    const renderPreview = (attrs) => {
        return (
            <div className={cx('preview-accounts')} tabIndex="-1" {...attrs}>
                <PopperWrapper>
                    <div className={cx('preview-account-item')}>
                        <AccountPreview data={data.user}>
                            <p className={cx('user-card-user-bio')}>{data.user.bio}💔</p>
                        </AccountPreview>
                    </div>
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div>
            <div className={cx('video-container-info')}>
                <Tippy delay={[100, 300]} offset={[-20, 0]} interactive placement="bottom" render={renderPreview}>
                    <Link to={`/@${data.user.nickname}/${data.user.id}`} className={cx('video-container-author')}>
                        <h3 className={cx('video-container-nickname')}>{data.user.nickname}</h3>
                        {data.user.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />}
                        <h4 className={cx('video-container-bio')}>{data.user.last_name}. </h4>
                        <h3 className={cx('video-container-created_at')}>{data.created_at.slice(5, 10)}</h3>
                    </Link>
                </Tippy>
            </div>
            <div className={cx('video-container-has-tag')}>
                <span className={cx('video-container-has-tag-description')}>{data.description}</span>

                <div>
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
            </div>
            <div className={cx('video-container-video-music')}>
                <Link className={cx('video-container-video-music-link')} to={'#'}>
                    <FontAwesomeIcon icon={faMusic} className={cx('video-container-music-icon')} />
                    {data.music || 'nhạc nền - Bùi Thu Trà'}
                </Link>
            </div>
        </div>
    );
}

export default VideoInfo;
