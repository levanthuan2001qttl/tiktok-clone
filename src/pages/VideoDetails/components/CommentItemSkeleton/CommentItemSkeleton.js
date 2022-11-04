import Skeleton from 'react-loading-skeleton';

function CommentItemSkeleton({ card }) {
    return Array(card)
        .fill(0)
        .map((_i, index) => {
            return (
                <div className="d-flex" key={index} style={{ padding: '16px 0' }}>
                    <Skeleton circle width={40} height={40} />
                    <div className="d-flex flex-column ml-16">
                        <Skeleton height={30} width={200} />
                        <Skeleton height={20} width={500} />
                        <Skeleton height={10} width={100} />
                    </div>
                </div>
            );
        });
}

export default CommentItemSkeleton;
