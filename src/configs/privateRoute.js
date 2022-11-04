import { Spin } from 'antd';
import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = (props) => {
    const { children, element } = props;

    const isLoggedIn = localStorage.getItem('userInfo');

    return isLoggedIn ? (
        <Suspense fallback={<Spin></Spin>}>{element || children}</Suspense>
    ) : (
        <Navigate to="/sign-in" />
    );
};
