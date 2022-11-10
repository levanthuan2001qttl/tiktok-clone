import PropTypes from 'prop-types';
import styles from './SuggestAccount.module.scss';
import classNames from 'classnames/bind';

import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '../Image';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const renderPreview = (attrs) => {
        return (
            <div className={cx('preview-accounts')} tabIndex="-1" {...attrs}>
                <PopperWrapper>
                    <div className={cx('preview-account-item')}>
                        <AccountPreview data={data} />
                    </div>
                </PopperWrapper>
            </div>
        );
    };
    const navigate = useNavigate();
    return (
        <div>
            <Tippy delay={[800, 0]} offset={[-20, 0]} interactive placement="bottom" render={renderPreview}>
                <div className={cx('account-item')} onClick={() => navigate(`/@${data.nickname}/${data.id}`)}>
                    <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                    <div className={cx('item-info')}>
                        <p className={cx('nick-name')}>
                            <strong>{data.nickname} </strong>
                            {data.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />}
                        </p>

                        <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}
AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
