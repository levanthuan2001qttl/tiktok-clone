import { useState } from 'react';
import FormSigIn from '~/components/FormSigIn';

function SignIn() {
    const [modalIsOpen, setIsOpen] = useState(true);

    function closeModal() {
        setIsOpen(false);
    }

    return <FormSigIn isOpen={modalIsOpen} onRequestClose={closeModal} />;
}

export default SignIn;
