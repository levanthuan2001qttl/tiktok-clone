import classNames from 'classnames/bind';
import styles from '../FormSigIn.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, key, onClick }) {
    return (
        <div className={cx('sign-body-item')} onClick={onClick}>
            <div className={cx('sign-body-item-icon')}>{data.icon}</div>
            <p className={cx('sign-body-item-title')}>{data.title}</p>
        </div>
    );
}

export default MenuItem;
