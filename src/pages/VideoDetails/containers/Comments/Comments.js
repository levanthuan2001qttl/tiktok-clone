import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import Button from '~/components/Button';
import 'tippy.js/dist/tippy.css'; // optional
import { Fragment, useState, useEffect, useRef } from 'react';
import CommentItem from '../../components/CommentItem';
import { useDispatch, useSelector } from 'react-redux';
import detailVideoSlice, { fetchComments } from '~/modules/detailVideoSlice/detailVideoSlice';
import { memo } from 'react';
import {
    commentsListSelector,
    getAVideoSelector,
    videoStatusSelector,
} from '~/modules/detailVideoSlice/detailVideoSelector';
import CommentsList from '../CommentsList/CommentsList';
import { commentsService } from '~/services';
import CommentItemSkeleton from '../../components/CommentItemSkeleton/CommentItemSkeleton';
const cx = classNames.bind(styles);

function Comment({ videoUid, videoId }) {
    const [comment, setComment] = useState('');
    const [newComments, setNewComments] = useState('');
    const inputCommentRef = useRef();

    const dispatch = useDispatch();
    const commentsList = useSelector(commentsListSelector);
    const commentLoading = useSelector(videoStatusSelector);

    useEffect(() => {
        dispatch(fetchComments(videoId));
    }, [dispatch, videoId]);

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        const response = await commentsService.createNewComment({ videoUid, comment });
        setNewComments((newComments) => [...newComments, response]);
        setComment('');
        inputCommentRef.current.focus();
        dispatch(detailVideoSlice.actions.inCreaseQuantityComments());
    };

    return (
        <Fragment>
            <div className={cx('comment-container')}>
                {newComments && newComments.map((comment) => <CommentItem key={comment.id} data={comment} />)}
                {commentsList.length > 0 && <CommentsList data={commentsList} />}
                {commentLoading === 'loading' && <CommentItemSkeleton card={2} />}
            </div>
            <div className={cx('comment-input')}>
                <form className={cx('comment-input-form')} onSubmit={handleSubmitComment}>
                    <input
                        value={comment}
                        ref={inputCommentRef}
                        onChange={handleChange}
                        placeholder="Thêm bình luận..."
                        className={cx('input-comment-values')}
                    />
                    <Button onClick={handleSubmitComment}>Đăng</Button>
                </form>
            </div>
        </Fragment>
    );
}

export default memo(Comment);
