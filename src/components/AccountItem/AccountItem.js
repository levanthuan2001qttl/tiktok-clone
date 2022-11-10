import PropTypes from 'prop-types';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from '../Image/Image';
import styles from './AccountItem.module.scss';
import { Link } from 'react-router-dom';
import { memo } from 'react';

const cx = classNames.bind(styles);

function AccountItem({ data, onHideSearchResult }) {
    return (
        <Link to={`/@${data.nickname}/${data.id}`} className={cx('wrapper')} onClick={onHideSearchResult}>
            <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
            <div className={cx('info')}>
                <p className={cx('name')}>
                    <span>{data.full_name}</span>
                    {data.tick && <FontAwesomeIcon className={cx('icon-check')} icon={faCheckCircle} />}
                </p>
                <span className={cx('user-name')}>{data.nickname}</span>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default memo(AccountItem);
