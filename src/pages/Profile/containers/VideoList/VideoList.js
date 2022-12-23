import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import { memo, useState } from 'react';
import { LockIcon, UserAvatarIcon } from '~/components/Icons';
import StatusVideo from '../../components/StatusVideo';
import VideoItem from '../../components/VideoItem/VideoItem';
import styles from './VideoList.module.scss';
const cx = classNames.bind(styles);

function VideoList({ data }) {
    const [isLinesBottomVideoList, setIsLinesBottomVideoList] = useState(false);
    const linesBottomClassName = cx('bottom-lines', isLinesBottomVideoList ? 'is-likes' : 'is-videos');

    const renderVideoList = () => {
        return (
            <div className={cx('video-list-container')}>
                <div className={cx('user-list-post')}>
                    {data.length > 0 ? (
                        <Row gutter={[16, 48]}>
                            {data.map((video, index) => {
                                return (
                                    <Col key={index} xl={4} lg={6} md={6} sm={8} xs={12}>
                                        <VideoItem data={video} />
                                    </Col>
                                );
                            })}
                        </Row>
                    ) : (
                        <StatusVideo
                            icon={<UserAvatarIcon />}
                            title="Không có nội dung"
                            subtitle={`Người dùng này chưa đăng bất kỳ video nào.`}
                        />
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className={cx('video-list')}>
            <div className={cx('video-list-tab')}>
                <p
                    className={cx('videos-tab')}
                    onClick={() => setIsLinesBottomVideoList(false)}
                    onMouseEnter={() => setIsLinesBottomVideoList(false)}
                >
                    <span>Video</span>
                </p>
                <p
                    className={cx('videos-tab')}
                    onMouseEnter={() => setIsLinesBottomVideoList(true)}
                    onClick={() => setIsLinesBottomVideoList(true)}
                >
                    <span>Đã thích</span>
                </p>
                <div className={linesBottomClassName}></div>
            </div>
            {!isLinesBottomVideoList ? (
                renderVideoList()
            ) : (
                <StatusVideo
                    icon={<LockIcon />}
                    title=" Video đã thích của người dùng này ở trạng thái riêng tư"
                    subtitle={` Các video được thích hiện đang ẩn`}
                />
            )}
        </div>
    );
}

export default memo(VideoList);
