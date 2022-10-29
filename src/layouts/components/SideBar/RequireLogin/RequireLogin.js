import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './RequireLogin.module.scss';

const cx = classNames.bind(styles);

function RequireLogin({ title }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{title}</p>
            <div>
                <Button outline large>
                    Đăng nhập
                </Button>
            </div>
        </div>
    );
}

export default RequireLogin;
