import classNames from 'classnames/bind';
import styles from './FormSigIn.module.scss';
import { QRIcon, UserIcon, FacebookIcon, GoogleIcon, TwitterIcon } from './../Icons/Icons';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignIn } from '~/modules/authenticationSlice/authenticationSlice';
import { statusSignInSelector, userDetailSelector } from '~/modules/authenticationSlice/authSelector';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const MENU_ITEM = [
    {
        icon: <QRIcon />,
        title: 'Sử dụng mã QR',
    },
    {
        icon: <UserIcon />,
        title: 'Số điện thoại / Email / TikTok ID',
    },
    {
        icon: <FacebookIcon />,
        title: 'Tiếp tục với Facebook',
    },
    {
        icon: <GoogleIcon />,
        title: 'Tiếp tục với Google',
    },
    {
        icon: <TwitterIcon />,
        title: 'Tiếp tục với Twitter',
    },
    {
        icon: <TwitterIcon />,
        title: 'Tiếp tục với Twitter',
    },
    {
        icon: <TwitterIcon />,
        title: 'Tiếp tục với Twitter',
    },
    {
        icon: <TwitterIcon />,
        title: 'Tiếp tục với Twitter',
    },
    {
        icon: <TwitterIcon />,
        title: 'Tiếp tục với Twitter',
    },
    {
        icon: <TwitterIcon />,
        title: 'Tiếp tục với Twitter',
    },
    {
        icon: <TwitterIcon />,
        title: 'Tiếp tục với Twitter',
    },
];

function FormSigIn({ closeModalSignIn }) {
    const dispatch = useDispatch();

    const statusSignIn = useSelector(statusSignInSelector);
    const userDetail = useSelector(userDetailSelector);

    const toastId = useRef();
    console.log({ userDetail, statusSignIn });

    useEffect(() => {
        if (userDetail.message && statusSignIn === 'idle') {
            toast.error(userDetail.message);
        }
        if (userDetail.response && statusSignIn === 'idle') {
            toast.success('Sign in successfully');
            localStorage.setItem('currentUser', true);
            closeModalSignIn();
        }
    }, [userDetail, statusSignIn, closeModalSignIn]);

    useEffect(() => {
        if (statusSignIn === 'loading') {
            toastId.current = toast.loading('Loading');
        } else {
            toast.dismiss(toastId.current || '');
        }
    }, [statusSignIn]);

    const validateMessages = {
        // eslint-disable-next-line no-template-curly-in-string
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = (formName) => {
        dispatch(fetchSignIn(formName.user));
    };
    return (
        <div className={cx('sign-in-modal')}>
            <h4 className={cx('sign-in-modal-title')}>Đăng nhập vào TikTok</h4>
            <div className={cx('sign-body')}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    validateMessages={validateMessages}
                >
                    <Form.Item label="Email" name={['user', 'email']} rules={[{ required: true, type: 'email' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name={['user', 'password']}
                        rules={[{ required: true, min: 1, max: 20 }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className={cx('sign-in-modal-footer')}>
                <span>Bạn không có tài khoản?</span>
                <Link to={'/sign-up'}>Đăng ký.</Link>
            </div>
        </div>
    );
}

export default FormSigIn;
