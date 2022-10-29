import classNames from 'classnames/bind';
import styles from './SuggestAccount.module.scss';
import PropTypes from 'prop-types';
import AccountItem from './AccountItem';
import SkeletonAccountItem from './SkeletonAccountItem';

const cx = classNames.bind(styles);

function SuggestAccount({ label, data = [], loading = true }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {loading ? (
                <SkeletonAccountItem card={5} />
            ) : (
                data.map((account) => <AccountItem key={account.id} data={account} />)
            )}
            <p className={cx('more-btn')}>See all</p>
        </div>
    );
}
SuggestAccount.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
    onSeeAll: PropTypes.func,
};
export default SuggestAccount;
