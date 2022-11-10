import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useLocation } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { searchService } from '~/services';
import UserItem from './components/UserItem';
import StatusVideo from '../Profile/components/StatusVideo';
import { LockIcon, SeeAllIcon, UserAvatarIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
const TYPE_SEARCH = 'more';

function Search() {
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [page, setPage] = useState(1);

    const search = useLocation().search;
    const query = new URLSearchParams(search).get('q');

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const results = await searchService.search({ q: query, type: TYPE_SEARCH, page });
            setSearchResult(results.data);
            setLoading(false);
        };
        fetchApi();
    }, [page, query]);

    // useEffect(() => {
    //     setSearchResult([]);
    // }, [query]);

    const [isLinesBottomAccountUser, setIsLinesBottomAccountUser] = useState(true);
    const linesBottomClassName = cx('bottom-lines', isLinesBottomAccountUser ? 'is-account' : 'is-videos');

    return (
        <Fragment>
            <div className={cx('video-list')}>
                <div className={cx('search-user-list-tab')}>
                    <p className={cx('search-user-tab')} onClick={() => setIsLinesBottomAccountUser(true)}>
                        <span>Tài khoản</span>
                    </p>
                    <p className={cx('search-user-tab')} onClick={() => setIsLinesBottomAccountUser(false)}>
                        <span>Video</span>
                    </p>
                    <div className={linesBottomClassName}></div>
                </div>
            </div>

            {isLinesBottomAccountUser ? (
                !loading && searchResult.length > 0 ? (
                    searchResult
                        .slice()
                        .sort((pre, next) => next.followings_count - pre.followings_count)
                        .map((data, index) => <UserItem key={index} item={data} />)
                ) : (
                    <StatusVideo
                        icon={<UserAvatarIcon />}
                        title={`Vui lòng nhập đúng tên cần tìm kiếm`}
                        subtitle={`Người dùng ${query} không tồn tại`}
                    />
                )
            ) : (
                <>
                    <StatusVideo
                        icon={<LockIcon />}
                        title="Chưa cập nhật Videos người dùng"
                        subtitle={`Các video hiện đang ẩn`}
                    />
                </>
            )}
            <div className={cx('search-see-all')}>
                <button type="button" className={cx('search-see-all-btn')}>
                    Tải thêm
                    <SeeAllIcon className={cx('search-see-all-icon')} />
                </button>
            </div>
        </Fragment>
    );
}

export default Search;
