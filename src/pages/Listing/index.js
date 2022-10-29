import './Listing.scss';
import { Link } from 'react-router-dom';

function Listing() {
    return (
        <div className="listing-desktop-screen">
            <h3 className="listing-title">
                <span>List Your Asset</span>
            </h3>
            <span className="listing-description">
                Before you begin the listing process, ensure you have created an account on XeggeX and are currently
                logged in. The account you use to submit the application will also be the account you use for managing
                your asset listing in the future. If you need to create a special or separate account, go ahead and do
                that now. We can take the integration payment in Dokdo Token (DKD), you can purchase that token on this
                and other exchanges, including Pancakeswap. Ensure your account is funded before starting, as payment is
                required at time of submission.
            </span>
            <div className="listing-card">
                <div className="listing-card-body">
                    <h5 className="listing-card-body__title">
                        <i
                            aria-hidden="true"
                            className="listing-card-body__title__icon fa-certificate"
                            style={{ color: 'blue' }}
                        />
                        <span>Token Listing</span> + <span>Market Making Service</span>
                    </h5>
                    <h5 className="listing-card-body__integration">
                        <span style={{ fontSize: '18px' }}>
                            <span>Integration Fee</span>: <strong>7,000 DKD</strong> (~ $250){' '}
                            <Link to="https://xeggex.com/market/DKD_USDT">DKD/USDT</Link>
                        </span>
                    </h5>
                    <br />
                    <p className="listing-card-body__requirements">
                        <strong>
                            <span>Requirements</span>
                        </strong>
                        <br />
                    </p>
                    <ul className="listing-card-body__requirements__list">
                        <li className="listing-card-body__requirements__item">
                            <span>
                                Asset must be token on one of the following chains: Ethereum, BSC, Waves, Phoenix, or
                                Tron
                            </span>
                        </li>
                        <li className="listing-card-body__requirements__item">
                            <span>You must NOT be currently having an ICO.</span>
                        </li>
                        <li className="listing-card-body__requirements__item">
                            <span>You must have an Active user community</span>
                        </li>
                        <li className="listing-card-body__requirements__item">
                            <span>Details about your asset must be clear to understand</span>
                        </li>
                    </ul>
                    <br />
                    <p className="listing-card-body__requirements">
                        <strong>
                            <span>What You Get</span>
                        </strong>
                        <br />
                    </p>
                    <ul className="listing-card-body__requirements__list">
                        <li className="listing-card-body__requirements__item">
                            <span>Up to 3 Markets, Your choice of base pairings</span>
                            (BTC, LTC, ETH, BNB, USDC, USDT DOGE)
                        </li>
                        <li className="listing-card-body__requirements__item">
                            <span>Included in the 'Highlighted Assets' list for 3 days</span>
                        </li>
                        <li className="listing-card-body__requirements__item">
                            <span>Announcement on Twitter, Telegram, Discord and News Blog</span>
                        </li>
                        <li className="listing-card-body__requirements__item">
                            <span>Free technical support</span>
                        </li>
                        <li className="listing-card-body__requirements__item">
                            <a href="/marketmaking">
                                <span>XeggeX Professional Market Making</span>
                            </a>
                        </li>
                        <li className="listing-card-body__requirements__item">
                            <span>A notification email about the listing will be sent to all subscribed users</span>
                        </li>
                    </ul>
                    <br />
                    The market making service is included in the price. We will provide the liquidity in your pairings.
                    If you will be bringing your own market making and do not wish to use ours, then let us know after
                    you submit the application.
                    <p />
                    <br />
                    <br />
                    <center>
                        <button className="listing-card-body__btn">I'm Ready to List My Token</button>
                    </center>
                </div>
                <div className="listing-card-body">
                    <h5 className="listing-card-body__title">
                        <i aria-hidden="true" className="fa fa-certificate" style={{ color: 'blue' }} />
                        <span>Token Listing</span>+<span>Market Making Service</span>
                    </h5>
                    <h5 className="listing-card-body__integration">
                        <span style={{ fontSize: '18px' }}>
                            <span>Integration Fee</span>: <strong>7,000 DKD</strong> (~ $250){' '}
                            <a href="https://xeggex.com/market/DKD_USDT">DKD/USDT</a>
                        </span>
                    </h5>
                    <br />
                    <p className="listing-card-body__requirements">
                        <strong>
                            <span>Requirements</span>
                        </strong>
                        <br />
                    </p>
                    <ul className="listing-card-body__requirements__list">
                        <li className="listing-card-body__requirements__item">
                            <span>
                                Asset must be token on one of the following chains: Ethereum, BSC, Waves, Phoenix, or
                                Tron
                            </span>
                        </li>
                        <li className="listing-card-body__requirements__item">
                            <span>You must NOT be currently having an ICO.</span>
                        </li>
                        <li className="listing-card-body__requirements__item">
                            <span>You must have an Active user community</span>
                        </li>
                        <li className="listing-card-body__requirements__item">
                            <span>Details about your asset must be clear to understand</span>
                        </li>
                    </ul>
                    <br />
                    <p className="listing-card-body__requirements">
                        <strong>
                            <span>What You Get</span>
                        </strong>
                        <br />
                    </p>
                    <ul className="listing-card-body__requirements__list">
                        <li className="listing-card-body__requirements__item">
                            <span>Up to 3 Markets, Your choice of base pairings</span>
                            (BTC, LTC, ETH, BNB, USDC, USDT DOGE)
                        </li>
                        <li className="listing-card-body__requirements__item">
                            <span>Included in the 'Highlighted Assets' list for 3 days</span>
                        </li>
                        <li className="listing-card-body__requirements__item">
                            <span>Announcement on Twitter, Telegram, Discord and News Blog</span>
                        </li>
                        <li className="listing-card-body__requirements__item">
                            <span>Free technical support</span>
                        </li>
                        <li className="listing-card-body__requirements__item">
                            <a href="/marketmaking">
                                <span>XeggeX Professional Market Making</span>
                            </a>
                        </li>
                        <li className="listing-card-body__requirements__item">
                            <span>A notification email about the listing will be sent to all subscribed users</span>
                        </li>
                    </ul>
                    <br />
                    The market making service is included in the price. We will provide the liquidity in your pairings.
                    If you will be bringing your own market making and do not wish to use ours, then let us know after
                    you submit the application.
                    <p /> <br />
                    <br />
                    <center>
                        <button className="listing-card-body__btn">I'm Ready to List My Token</button>
                    </center>
                </div>
            </div>
        </div>
    );
}

export default Listing;
