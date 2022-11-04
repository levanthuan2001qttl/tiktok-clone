import { memo } from 'react';
import CommentItem from '../../components/CommentItem';

function CommentsList({ data }) {
    return data.map((comment, index) => <CommentItem key={index} data={comment} />);
}

export default memo(CommentsList);
