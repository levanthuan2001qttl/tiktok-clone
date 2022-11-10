/* eslint-disable no-template-curly-in-string */
import classNames from 'classnames/bind';
import styles from './FormSignUp.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import Modal from '~/components/Modal';
import { userService } from '~/services';
import { fetchGetCurrentUser } from '~/modules/authenticationSlice/authenticationSlice';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function FormSignUp({ isOpen, onRequestClose }) {
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

    const navigate = useNavigate();
    const onFinish = async (formName) => {
        try {
            const response = await userService.signUp({ type: 'email', ...formName.user });
            localStorage.setItem('token', JSON.stringify(response.meta.token));
            localStorage.setItem('currentUser', true);
            if (response.data) {
                toast.success('Sign up successfully');
                onRequestClose();
                navigate('/sign-in');
            }
        } catch (error) {
            console.log(error.response.data);
            toast.error(` ${error.response.data.message} `);
        }
    };

    const renderForm = () => {
        return (
            <div className={cx('sign-in-modal')}>
                <h4 className={cx('sign-in-modal-title')}>Đăng ký tài khoản TikTok</h4>
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
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className={cx('sign-in-modal-footer')}>
                    <span>Bạn đã có tài khoản?</span>
                    <Link to={'/sign-in'}>Đăng nhập.</Link>
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

export default FormSignUp;
