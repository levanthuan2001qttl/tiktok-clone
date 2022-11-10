import { Suspense } from 'react';
import { Navigate } from 'react-router';

export const PrivateRoute = (props) => {
    const { children, element } = props;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return currentUser ? <Suspense>{element || children}</Suspense> : <Navigate to="/sign-in" />;
};

export const PublicRoute = (props) => {
    const { children, element } = props;
    return <Suspense>{element || children}</Suspense>;
};
