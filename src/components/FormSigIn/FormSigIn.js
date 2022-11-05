/* eslint-disable no-template-curly-in-string */
import classNames from 'classnames/bind';
import styles from './FormSigIn.module.scss';
// import { QRIcon, UserIcon, FacebookIcon, GoogleIcon, TwitterIcon } from './../Icons/Icons';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import Modal from '~/components/Modal';
import { userService } from '~/services';
import { fetchGetCurrentUser } from '~/modules/authenticationSlice/authenticationSlice';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function FormSigIn({ isOpen, onRequestClose }) {
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (formName) => {
        try {
            const response = await userService.signIn(formName.user);
            localStorage.setItem('token', JSON.stringify(response.meta.token));
            localStorage.setItem('currentUser', true);
            if (response.data) {
                toast.success('Sign in successfully');
                onRequestClose();
                dispatch(fetchGetCurrentUser(response.meta.token));
                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            console.log(error.response.data);
            toast.error(`Failure ${error.response.data.status_code} ${error.response.data.message} `);
        }
    };

    const renderForm = () => {
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
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            {renderForm()}
        </Modal>
    );
}

export default FormSigIn;
