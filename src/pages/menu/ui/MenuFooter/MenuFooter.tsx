import { Link } from 'react-router-dom';

import './MenuFooter.scss';

const footerLinks = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Reservation',
        href: '/#reservation',
    },
];

export function MenuFooter() {
    const handleTopClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer className="menu-footer">
            <div className="menu-footer__background" aria-hidden="true">
                NOIRÉ
            </div>

            <div className="menu-footer__container container">
                <div className="menu-footer__top">
                    <span className="menu-footer__eyebrow eyebrow">NOIRÉ</span>

                    <button
                        type="button"
                        className="menu-footer__top-button"
                        onClick={handleTopClick}
                    >
                        <span>Back to top</span>
                        <span aria-hidden="true">↑</span>
                    </button>
                </div>

                <div className="menu-footer__main">
                    <h2 className="menu-footer__title display-title">
                        Until
                        <span>next time.</span>
                    </h2>

                    <div className="menu-footer__aside">
                        <p>
                            A menu shaped by the seasons, the finest ingredients
                            and the simple pleasure of being together.
                        </p>

                        <nav
                            className="menu-footer__links"
                            aria-label="Menu page navigation"
                        >
                            {footerLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    data-cursor="arrow"
                                >
                                    <span>{link.label}</span>
                                    <span aria-hidden="true">↗</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="menu-footer__bottom">
                    <span>12 Rue du Bac, Paris</span>
                    <span>Tuesday — Saturday · 18:00 — 00:00</span>
                    <span>© {new Date().getFullYear()} NOIRÉ</span>
                </div>
            </div>
        </footer>
    );
}
