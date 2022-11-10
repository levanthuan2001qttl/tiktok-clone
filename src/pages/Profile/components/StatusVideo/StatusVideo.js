import classNames from 'classnames/bind';
import styles from './StatusVideo.module.scss';
const cx = classNames.bind(styles);

function StatusVideo({ icon, title, subtitle }) {
    return (
        <div className={cx('div-error-container')}>
            <div style={{ display: 'flex' }}>{icon}</div>
            <p data-e2e="like-title" className={cx('title-error')}>
                {title}
            </p>
            <p data-e2e="like-desc" className="tiktok-z5xf9q-PDesc emuynwa2">
                {subtitle}
            </p>
        </div>
    );
}

export default StatusVideo;
