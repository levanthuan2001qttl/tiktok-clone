import Skeleton from 'react-loading-skeleton';

function InformationSkeleton() {
    return (
        <div className="d-flex ml-16" style={{ padding: '16px 0' }}>
            <Skeleton circle width={40} height={40} />
            <div className="d-flex flex-column ml-16">
                <Skeleton height={30} width={200} />
                <Skeleton height={20} width={500} />
                <Skeleton height={10} width={100} />

                <div style={{ padding: '16px 0' }}>
                    <Skeleton height={20} width={300} />
                    <Skeleton height={15} width={500} />
                    <Skeleton count={2} height={10} width={200} />
                </div>
            </div>
        </div>
    );
}

export default InformationSkeleton;
