import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import VideoContainer from '~/components/VideoContainer';
import VideoSkeleton from './components/VideoSkeleton';
import { useState, useEffect } from 'react';
import { useScrollToTop } from '~/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetVideoListForYou } from '~/modules/homeSlice/homeSlice';
import { getVideoListForYouSelector } from '~/modules/homeSlice/homeSelector';
import { fetchGetCurrentUser } from '~/modules/authenticationSlice/authenticationSlice';
import GoToTop from '~/components/GoToTop/GoToTop';

const cx = classNames.bind(styles);
const FETCH_TYPE_VIDEOS = 'for-you';
const TOTAL_VIDEOS = 15;

function Home() {
    const [pagination, setPagination] = useState({
        page: 1,
    });
    const [isHasMore, setIsHasMore] = useState(true);

    const dispatch = useDispatch();

    // console.log('set Video');

    const videosListForYou = useSelector(getVideoListForYouSelector);

    useEffect(() => {
        dispatch(fetchGetVideoListForYou(pagination.page));
    }, [pagination.page, dispatch]);

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
                }}
                loader={<p>Loading...</p>}
                hasMore={isHasMore}
            >
                {videosListForYou.length > 0 ? (
                    videosListForYou.map((video, index) => <VideoContainer index={index} data={video} key={index} />)
                ) : (
                    <VideoSkeleton card={TOTAL_VIDEOS} />
                )}
            </InfiniteScroll>
        </div>
    );
}

export default Home;
