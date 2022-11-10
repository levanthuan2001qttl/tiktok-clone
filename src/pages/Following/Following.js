import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './Following.module.scss';
import VideoContainer from '~/components/VideoContainer';
import { useScrollToTop } from '~/hooks';
import { fetchGetVideoListForYou } from '~/modules/homeSlice/homeSlice';
import { getVideoListForYouSelector } from '~/modules/homeSlice/homeSelector';
import { fetchGetCurrentUser } from '~/modules/authenticationSlice/authenticationSlice';
import loadingGif from '~/assets/gifs/loading.gif';

const cx = classNames.bind(styles);
const FETCH_TYPE_VIDEOS = 'following';
// const TOTAL_VIDEOS = 15;

function Following() {
    const [pagination, setPagination] = useState({
        page: 1,
    });
    const [isHasMore, setIsHasMore] = useState(true);

    const dispatch = useDispatch();

    const videosListForYou = useSelector(getVideoListForYouSelector);

    useEffect(() => {
        dispatch(fetchGetVideoListForYou({ page: pagination.page, type: FETCH_TYPE_VIDEOS }));
    }, [dispatch, pagination.page]);

    const token = JSON.parse(localStorage.getItem('token'));
    useEffect(() => {
        if (token) {
            dispatch(fetchGetCurrentUser(token));
        }
    }, [dispatch, token]);

    useScrollToTop();

    return (
        <div className={cx('wrapper')}>
            <InfiniteScroll
                dataLength={videosListForYou.length}
                next={async () => {
                    await setPagination((pagination) => ({
                        ...pagination,
                        page: pagination.page + 1,
                    }));
                    setIsHasMore(true);
                }}
                loader={<img src={loadingGif} alt="" style={{ width: '150px', objectFit: 'cover' }} />}
                hasMore={isHasMore}
            >
                {videosListForYou.length > 0 &&
                    videosListForYou
                        .filter((video) => video.user.is_followed)
                        .map((video, index) => {
                            return <VideoContainer index={index} data={video} key={index} />;
                        })}
            </InfiniteScroll>
        </div>
    );
}

export default Following;
