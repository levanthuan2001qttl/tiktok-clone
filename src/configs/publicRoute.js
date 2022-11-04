import { Suspense } from 'react';

export const PublicRoute = (props) => {
    const { children, element } = props;
    return <Suspense>{element || children}</Suspense>;
};
