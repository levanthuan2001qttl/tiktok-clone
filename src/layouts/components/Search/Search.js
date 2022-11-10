import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
import { useDebounced } from '~/hooks';
// import * as searchService from '~/services/searchService';
import { searchService } from '~/services';
import HeadlessTippy from '@tippyjs/react/headless';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResults, setShowResults] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const debounced = useDebounced(searchValue, 500);

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const results = await searchService.search({ q: debounced });

            setSearchResult(results.data);
            setLoading(false);
        };
        fetchApi();
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleClickOutside = () => {
        setShowResults(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowResults(false);

        if (location.pathname !== '/search') {
            navigate(`/search/users?q=${searchValue}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <HeadlessTippy
                interactive
                visible={showResults && searchResult.length > 0}
                render={(attrs) => {
                    return (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h3 className={cx('search-title')}>Account</h3>
                                {searchResult.map((result) => (
                                    <AccountItem
                                        key={result.id}
                                        data={result}
                                        onHideSearchResult={() => setShowResults(false)}
                                    />
                                ))}
                            </PopperWrapper>
                        </div>
                    );
                }}
                onClickOutside={handleClickOutside}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue.trim() && searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResults(true)}
                    />

                    {!!searchValue.trim() && !loading && (
                        <span className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </span>
                    )}

                    {loading && (
                        <span className={cx('loading')}>
                            <FontAwesomeIcon icon={faSpinner} />
                        </span>
                    )}
                    <button className={cx('search-button')}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </form>
    );
}

export default Search;
