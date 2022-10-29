import { useState } from 'react';
import MenuItem from './MenuItem';
import FormSignEmail from './FormSignEmail/FormSignEmail';

function MenuLogin({ items }) {
    const [history, setHistory] = useState([{ data: items }]);

    const current = history[history.length - 1];
    const handleSelectItem = (item) => {
        console.log(item.title);
        if (item.children) {
            console.log(item.children);

            setHistory((pre) => [...pre, { children: item.children }]);
        }
    };

    const renderItems = () => {
        console.log({ current });

        return current.data.map((item, index) => <MenuItem data={item} key={index} onClick={handleSelectItem} />);
    };

    return <FormSignEmail />;
}

export default MenuLogin;
