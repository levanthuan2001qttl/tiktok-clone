import Skeleton from 'react-loading-skeleton';

function VideoSkeleton({ card }) {
    return Array(card)
        .fill(0)
        .map((_i, index) => {
            return (
                <div key={index} style={{ marginBottom: '180px', marginTop: '20px' }}>
                    <div className="d-flex">
                        <Skeleton circle width={50} height={50} />
                        <div className="d-lex flex-column" style={{ marginLeft: '16px' }}>
                            <Skeleton width={250} />
                            <Skeleton width={200} />
                        </div>
                    </div>
                    <div>
                        <Skeleton width={300} />
                        <Skeleton width={260} />
                    </div>
                </div>
            );
        });
}

export default VideoSkeleton;
