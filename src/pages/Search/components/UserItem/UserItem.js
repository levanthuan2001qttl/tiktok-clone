import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import styles from './UserItem.module.scss';
const cx = classNames.bind(styles);

function UserItem({ item }) {
    return (
        <div className={cx('search-user-container')}>
            <Link to={`/@${item.nickname}/${item.id}`} className={cx('user-avatar-content')}>
                <div style={{ width: '70px', height: '70px' }}>
                    <Image src={item.avatar} alt={item.nickname} className={cx('search-user-avatar')} />
                </div>
            </Link>
            <Link to={`/@${item.nickname}/${item.id}`}>
                <p className={cx('search-user-unique-id')}>{item.full_name}</p>
                <div className={cx('search-user-count-follow')}>
                    <h2 className={cx('search-user-subtitle')}>{item.nickname}</h2>

                    <strong>
                        {item.followings_count === 0 ? 0 : item.followings_count + 'K'}
                        <span>Follower</span>
                    </strong>
                </div>
                <p className={cx('search-user-description')}>
                    <strong>{item.bio}</strong>
                </p>
            </Link>
        </div>
    );
}

export default UserItem;
