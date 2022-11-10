import { useState } from 'react';
import FormSignUp from '~/components/FormSignUp';

function SignUp() {
    const [modalIsOpen, setIsOpen] = useState(true);

    function closeModal() {
        setIsOpen(false);
    }

    return <FormSignUp isOpen={modalIsOpen} onRequestClose={closeModal} />;
}

export default SignUp;
