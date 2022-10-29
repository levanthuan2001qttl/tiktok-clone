import VideoContainer from '~/components/VideoContainer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetVideoListForYou } from '~/modules/homeSlice/homeSlice';
import { getVideoListForYou } from '~/modules/homeSlice/homeSelector';
import VideoSkeleton from './components/VideoSkeleton';

function Home() {
    const dispatch = useDispatch();

    const listVideosForYou = useSelector(getVideoListForYou);

    useEffect(() => {
        dispatch(fetchGetVideoListForYou());
    }, [dispatch]);

    return (
        <div>
            {listVideosForYou.length > 0 ? (
                listVideosForYou.map((video, index) => <VideoContainer data={video} key={index} />)
            ) : (
                <VideoSkeleton card={5} />
            )}
        </div>
    );
}

export default Home;
