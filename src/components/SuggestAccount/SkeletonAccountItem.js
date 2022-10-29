import styles from './SuggestAccount.module.scss';
import classNames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';

const cx = classNames.bind(styles);

function SkeletonAccountItem({ card }) {
    return Array(card)
        .fill()
        .map((_i, key) => (
            <div className={cx('account-item')} key={key}>
                <Skeleton circle height={32} width={32} />
                <div className={cx('item-info')}>
                    <p className={cx('nick-name')}>
                        <strong>
                            <Skeleton width={130} borderRadius="0.5rem" />
                        </strong>
                    </p>

                    <p className={cx('name')}>
                        <Skeleton width={70} borderRadius="0.5rem" />
                    </p>
                </div>
            </div>
        ));
}

export default SkeletonAccountItem;
