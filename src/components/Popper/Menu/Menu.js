import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { useState } from 'react';

import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

function Menu({ children, items = [], onChange, hideOnClick = false }) {
    const [history, setHistory] = useState([{ data: items }]);

    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const hasParent = !!item.children;
            return (
                <MenuItem
                    data={item}
                    key={index}
                    onClick={() => {
                        if (hasParent) {
                            setHistory((pre) => [...pre, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBackMenu = () => {
        setHistory((pre) => pre.slice(0, history.length - 1));
    };

    const renderResult = (attrs) => {
        return (
            <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                <PopperWrapper className={cx('menu-popper')}>
                    {history.length > 1 && <Header title={current.title} onBack={handleBackMenu}></Header>}
                    <div className={cx('menu-body')}> {renderItems()}</div>
                </PopperWrapper>
            </div>
        );
    };

    const handleResetToFirstPage = () => setHistory((pre) => pre.slice(0, 1));

    return (
        <Tippy
            delay={[0, 500]}
            offset={[13, 12]}
            interactive
            placement="bottom-end"
            hideOnClick={hideOnClick}
            render={renderResult}
            onHide={handleResetToFirstPage}
            // visible
        >
            {children}
        </Tippy>
    );
}
Menu.propTypes = {
    children: PropTypes.node,
    items: PropTypes.array,
    onChange: PropTypes.func,
    hideOnClick: PropTypes.bool,
};
export default Menu;
