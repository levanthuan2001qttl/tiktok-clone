import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '~/components/Button';
import { EditProfileIcon } from '~/components/Icons';
import Image from '~/components/Image';
import { userService } from '~/services';
import styles from './EditProfile.module.scss';
const cx = classNames.bind(styles);

function EditProfile({ data, onRequestClose, onSaveProfile }) {
    const [disabled, setDisabled] = useState(true);
    const [avatarFile, setAvatarFile] = useState('');
    const [formValues, setFormValues] = useState({
        first_name: data.first_name,
        last_name: data.last_name,
        bio: data.bio,
    });

    const avatarFileRef = useRef();
    const onEditBackgroundButtonClick = () => {
        avatarFileRef?.current?.click();
    };

    const onChangeAvatarFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event?.target?.files?.item(0);
        file.preview = URL.createObjectURL(file);
        setAvatarFile(file);
    };

    const handleChange = (e) => {
        const { value, name } = e.target;

        setFormValues({ ...formValues, [name]: value });
    };

    const handleFocus = () => {
        setDisabled(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        if (avatarFile) formData.append('avatar', avatarFile);
        formData.append('first_name', formValues.first_name);
        formData.append('last_name', formValues.last_name);
        formData.append('bio', formValues.bio);

        const response = await userService.editProfile(formData);

        if (response.message) {
            toast.error(response.message);
        } else {
            toast.success('Update profile successfully');
            onRequestClose();
            onSaveProfile(response);
        }
    };

    return (
        <form className={cx('update-profile')} onSubmit={handleSubmit}>
            <div className={cx('profile-heading')}>Edit Profile</div>
            <div className={cx('edit-avatar')}>
                <span className={cx('edit-avatar-title')}>Ảnh hồ sơ</span>
                <div className={cx('edit-avatar-user')}>
                    <Image src={avatarFile?.preview || data.avatar} alt={data.nickname} />
                    <div className={cx('edit-icon')} onClick={onEditBackgroundButtonClick}>
                        <EditProfileIcon />
                        <input
                            type="file"
                            id="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={onChangeAvatarFile}
                            ref={avatarFileRef}
                        />
                    </div>
                </div>
            </div>
            <div className={cx('edit-form-control')}>
                <span className={cx('edit-avatar-title')}>First name</span>
                <div>
                    <input
                        className={cx('input-edit')}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        value={formValues.first_name}
                        name="first_name"
                    />
                    <p className={cx('profile-site')}>www.tiktok.com/@dyxex7vlj3vu</p>
                </div>
            </div>
            <div className={cx('edit-form-control')}>
                <span className={cx('edit-avatar-title')}>Last name</span>
                <div>
                    <input
                        className={cx('input-edit')}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        value={formValues.last_name}
                        name="last_name"
                    />
                    <p className={cx('profile-site')}>Bạn chỉ có thể thay đổi biệt danh 7 ngày một lần.</p>
                </div>
            </div>
            <div className={cx('edit-form-control')}>
                <span className={cx('edit-avatar-title')}>Tiểu sử</span>
                <div>
                    <textarea
                        className={cx('edit-text-area')}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        value={formValues.bio}
                        name="bio"
                    />
                </div>
            </div>

            <div className="d-flex justify-content-center align-center" style={{ marginTop: '20px' }}>
                <Button disabled={disabled} primary>
                    Lưu
                </Button>
            </div>
        </form>
    );
}

export default EditProfile;
