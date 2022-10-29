import Skeleton from 'react-loading-skeleton';

function VideoSkeleton({ card }) {
    return Array(card)
        .fill(0)
        .map((_i, index) => {
            return (
                <div key={index}>
                    <div className="d-lex">
                        <Skeleton circle width={50} height={50} />
                        <div className="d-lex flex-column">
                            <Skeleton width={100} />
                            <Skeleton width={90} />
                        </div>
                    </div>
                    <div>
                        <Skeleton width={150} />
                        <Skeleton width={140} />
                    </div>
                </div>
            );
        });
}

export default VideoSkeleton;
