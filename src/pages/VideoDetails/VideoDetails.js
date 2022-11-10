import classNames from 'classnames/bind';
import styles from './VideoDetails.module.scss';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback, useMemo, useState, useLayoutEffect } from 'react';
import {
    videoIndexSelectedSelector,
    videoStatusSelector,
    getAVideoSelector,
} from '~/modules/detailVideoSlice/detailVideoSelector';
import 'tippy.js/dist/tippy.css'; // optional
import Comment from './containers/Comments';
import VideoComment from './containers/VideoComment';
import { ArrowDownIcon, ArrowUpIcon, CloseTikTokIcon, TikTokLogoICon } from '~/components/Icons';
import useScrollToTop from './../../hooks/useScrollToTop';
import VideoInformation from './components/VideoInformation/VideoInformation';
import { fetchGetCurrentUser } from '~/modules/authenticationSlice/authenticationSlice';
import { getVideoListForYouSelector } from '~/modules/homeSlice/homeSelector';
import detailVideoSlice, { fetchGetAVideo } from '~/modules/detailVideoSlice/detailVideoSlice';
import InformationSkeleton from './components/InformationSkeleton/InformationSkeleton';
import { fetchGetVideoListForYou } from '~/modules/homeSlice/homeSlice';

const cx = classNames.bind(styles);
const TOTAL_VIDEOS = 15;

function VideoDetail() {
    let { uid, videoId } = useParams();
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    useScrollToTop();

    let indexVideoSelected = useSelector(videoIndexSelectedSelector) || JSON.parse(localStorage.getItem('videoIndex'));

    const [indexCurrent, setIndexCurrent] = useState(indexVideoSelected);

    const token = JSON.parse(localStorage.getItem('token'));
    const videoDetailSelected = useSelector(getAVideoSelector);
    const videosListForYou = useSelector(getVideoListForYouSelector);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchGetVideoListForYou(page));
    }, [dispatch, page]);

    useEffect(() => {
        dispatch(fetchGetAVideo(uid));
    }, [dispatch, uid]);

    useEffect(() => {
        localStorage.setItem('videoIndex', indexCurrent);
        if (indexCurrent === 14) {
            setPage((prevPage) => prevPage + 1);
        }
        if (indexCurrent) {
            dispatch(detailVideoSlice.actions.saveVideo(videosListForYou[indexCurrent]));
        }
    }, [indexCurrent]);

    useLayoutEffect(() => {
        if (videoDetailSelected) {
            navigate(
                `/@${videoDetailSelected.user.nickname}/video/${videoDetailSelected.uuid}/${videoDetailSelected.id}`,
            );
        }
    }, [videoDetailSelected]);

    useEffect(() => {
        const handle = (e) => {
            if (e.code === 'ArrowDown') {
                setIndexCurrent((preIndex) => preIndex + 1);
            }
            if (e.code === 'ArrowUp') {
                setIndexCurrent((preIndex) => {
                    return preIndex - 1;
                });
            }
        };
        document.addEventListener('keydown', handle);
        return () => document.removeEventListener('keydown', handle);
    }, []);
    const handleNextVideo = () => {
        setIndexCurrent((preIndex) => preIndex + 1);
    };
    const handlePreVideo = () => {
        if (indexCurrent !== 0) {
            setIndexCurrent((preIndex) => preIndex - 1);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-details-container')}>
                <div
                    className={cx('video-details-blur-background')}
                    style={{
                        backgroundImage: `url(${videoDetailSelected?.thumb_url})`,
                    }}
                ></div>
                <div className={cx('video-details-close')}>
                    <Link to={'/'}>
                        <button className={cx('video-details-close-btn')}>
                            <CloseTikTokIcon />
                        </button>
                    </Link>
                    <div>
                        <TikTokLogoICon />
                    </div>
                </div>
                <div className="d-flex flex-column">
                    {indexCurrent !== 0 && (
                        <button className={cx('prev-video')} onClick={handlePreVideo}>
                            <ArrowUpIcon />
                        </button>
                    )}
                    <button className={cx('next-video')} onClick={handleNextVideo}>
                        <ArrowDownIcon />
                    </button>
                </div>
                <div className="d-flex justify-content-center align-center" style={{ height: '100%' }}>
                    {videoDetailSelected && <VideoComment data={videoDetailSelected} />}
                </div>
            </div>
            <div className={cx('video-details-comment')}>
                {videoDetailSelected ? <VideoInformation data={videoDetailSelected} /> : <InformationSkeleton />}
                <Comment videoUid={uid} videoId={videoId} />
            </div>
        </div>
    );
}

export default VideoDetail;
