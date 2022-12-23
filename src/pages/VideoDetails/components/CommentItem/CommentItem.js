import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './CommentItem.module.scss';
import { HearLikeComment, HeartLikeIcon } from '~/components/Icons';
import Image from '~/components/Image';
import { fetchLikeComments, fetchUnLikeComments } from '~/modules/detailVideoSlice/detailVideoSlice';
import { compareToDate } from '~/helps';

const cx = classNames.bind(styles);

function CommentItem({ data }) {
    const dispatch = useDispatch();

    const handleUnLikeComments = (commentId) => {
        dispatch(fetchUnLikeComments(commentId));
        data.is_liked = !data.is_liked;
        data.likes_count--;
    };

    const handleLikeComments = (commentId) => {
        dispatch(fetchLikeComments(commentId));
        data.is_liked = !data.is_liked;
        data.likes_count++;
    };

    return (
        <div className={cx('comment-item')}>
            <div className={cx('comment-item-information')}>
                <Image src={data.user.avatar} alt="" />
                <div>
                    <Link to="" className={cx('info-name-link')}>
                        <p className={cx('info-name-comment')}>{data.user.nickname}</p>
                    </Link>
                    <p className={cx('content-comment')}>{data.comment}</p>
                    <p className={cx('info-time-reply')}>
                        <span>{compareToDate(data.created_at)}</span>
                        <span>trả lời</span>
                    </p>
                </div>
            </div>
            <div>
                <span className={cx('comment-item-heart-icon')}>
                    {data.is_liked ? (
                        <div className="d-flex flex-column align-center">
                            <button
                                className={cx('comment-item-heart-btn')}
                                onClick={() => handleUnLikeComments(data.id)}
                            >
                                <HeartLikeIcon />
                            </button>
                            <span>{data.likes_count}</span>
                        </div>
                    ) : (
                        <div className="d-flex flex-column align-center">
                            <button
                                className={cx('comment-item-heart-btn')}
                                onClick={() => handleLikeComments(data.id)}
                            >
                                <HearLikeComment />
                            </button>
                            <span>{data.likes_count}</span>
                        </div>
                    )}
                </span>
            </div>
        </div>
    );
}

export default CommentItem;
