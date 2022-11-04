import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './RequireLogin.module.scss';
import { useState } from 'react';
import Modal from '~/components/Modal';
import FormSigIn from '~/components/FormSigIn';

const cx = classNames.bind(styles);

function RequireLogin({ title }) {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{title}</p>
            <div>
                <Button outline large w100 onClick={openModal}>
                    Đăng nhập
                </Button>
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <FormSigIn closeModalSignIn={closeModal} />
            </Modal>
        </div>
    );
}

export default RequireLogin;
