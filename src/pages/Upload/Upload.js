import classNames from 'classnames/bind';
import styles from './Upload.moudle.scss';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import { Select, Checkbox } from 'antd';
import { useRef, useState } from 'react';
import { videosService } from '~/services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Upload() {
    const [videoFile, setVideoFile] = useState('');
    const [description, setDescription] = useState('');
    const [viewable, setViewable] = useState('public');
    const [allows, setAllows] = useState(true);

    const [videoSrc, setVideoSrc] = useState('');

    const navigate = useNavigate();

    const handleChangeSelected = (target) => {
        setViewable(target.value);
    };

    const handleChangeChecked = (e) => {
        setAllows(e.target.checked);
    };

    const videoInputFile = useRef();
    const onEditBackgroundButtonClick = () => {
        videoInputFile?.current?.click();
    };

    const onChangeVideoFile = (event) => {
        console.log('file');
        event.stopPropagation();
        event.preventDefault();
        var file = event?.target?.files?.item(0);
        var url = URL.createObjectURL(file.originFileObj);

        setVideoFile(file);
    };

    const handleSubmitUploadVideo = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('description', description);
        formData.append('thumbnail_time', 5);
        formData.append('viewable', viewable);
        formData.append('allows[]', 'comment');
        formData.append('upload_file', videoFile);

        const response = videosService.createVideo(formData);
        if (response.message) {
            toast.error(response.message);
        } else {
            toast.success('Video successfully uploaded');
            navigate('/');
        }
    };

    const handleChangeInput = (e) => {
        setDescription(e.target.value);
    };

    return (
        <div className={cx('wrapper')}>
            <PopperWrapper>
                <div className={cx('container')}>
                    <div>
                        <span className={cx('upload-title')}>Tải video lên</span>
                    </div>
                    <div>
                        <span className={cx('upload-sub-title')}>Đăng video vào tài khoản của bạn</span>
                    </div>
                    <div className={cx('upload-container')}>
                        <div className={cx('uploader')}>
                            <img
                                src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg"
                                className={cx('upload-icon')}
                                alt=""
                            />
                            <p className={cx('uploader-title')}>Chọn video để tải lên</p>
                            <p className={cx('uploader-sub-title')}>Hoặc kéo và thả tập tin</p>

                            <div className={cx('text-video-info')}>
                                <div className="jsx-2404389384">
                                    <span className={cx('text-video-info-title')}>MP4 hoặc WebM</span>
                                </div>
                                <div className="jsx-2404389384">
                                    <span className={cx('text-video-info-title')}>Độ phân giải 720x1280 trở lên</span>
                                </div>
                                <div className="jsx-2404389384">
                                    <span className={cx('text-video-info-title')}>Tối đa 10 phút</span>
                                </div>
                                <div className="jsx-2404389384">
                                    <span className={cx('text-video-info-title')}>Nhỏ hơn 2 GB</span>
                                </div>
                            </div>
                            <div className={cx('file-select-btn')}>
                                <Button primary onClick={onEditBackgroundButtonClick} className={cx('upload-text')}>
                                    Chọn tập tin
                                    <input
                                        type="file"
                                        id="file"
                                        ref={videoInputFile}
                                        accept="video/mp4,video/x-m4v,video/*"
                                        onChange={onChangeVideoFile}
                                        style={{ display: 'none' }}
                                    />
                                </Button>
                            </div>
                        </div>

                        <form className={cx('upload-form')} onSubmit={handleSubmitUploadVideo}>
                            <div className={cx('upload-caption')}>
                                <label>Chú thích</label>
                                <input
                                    placeholder="Enter your caption"
                                    onChange={handleChangeInput}
                                    value={description}
                                />
                            </div>
                            <div className={cx('upload-regime')}>
                                <label>Ai có thể xem video này</label>
                                <Select
                                    labelInValue
                                    defaultValue={{ key: 'public', label: 'Công khai' }}
                                    style={{ width: 120 }}
                                    onChange={handleChangeSelected}
                                >
                                    <Select.Option key="public">Công khai</Select.Option>
                                    <Select.Option key="friends">Bạn bè</Select.Option>
                                    <Select.Option key="private">Riêng tư</Select.Option>
                                </Select>
                            </div>

                            <div className={cx('upload-regime')}>
                                <label>Cho phép người dùng:</label>
                                <Checkbox onChange={handleChangeChecked}>Bình luận</Checkbox>
                            </div>
                            <div className="d-flex justify-space-evenly">
                                <Button primary>Đăng</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </PopperWrapper>
        </div>
    );
}

export default Upload;
