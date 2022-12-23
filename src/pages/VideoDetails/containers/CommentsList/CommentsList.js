import { memo } from 'react';
import CommentItem from '../../components/CommentItem';

function CommentsList({ data }) {
    return data.length > 0 ? (
        data.map((comment, index) => <CommentItem key={index} data={comment} />)
    ) : (
        <>No comments</>
    );
}

export default memo(CommentsList);
