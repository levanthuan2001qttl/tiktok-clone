import Header from '../components/Header/Header';
// import classNames from 'classnames/bind';
import './HeaderOnly.scss';

// const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
