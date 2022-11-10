import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountPreview({ data, children }) {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                {data.is_followed ? (
                    <Button outlineBrow className={cx('follow-btn')}>
                        Đang Follow
                    </Button>
                ) : (
                    <Button primary className={cx('follow-btn')}>
                        Follow
                    </Button>
                )}
            </header>
            <div className={cx('body')}>
                <Link to={`/@${data.nickname}/${data.id}`}>
                    <p className={cx('nick-name')}>
                        <strong>{data.nickname} </strong>
                        {data.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />}
                    </p>
                    <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                    <p className={cx('analytics')}>
                        <strong className={cx('value')}>{data.followers_count} </strong>
                        <span className={cx('label')}>Follower</span>
                        <strong className={cx('value')}>{data.likes_count} </strong>
                        <span className={cx('label')}>Likes</span>
                    </p>
                </Link>
            </div>
            {children}
        </div>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
};
export default AccountPreview;
