import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import './Header.scss';

const navigationItems = [
    { label: 'Menu', href: '#menu' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Reserve', href: '#reservation' },
];

export function Header() {
    const headerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const header = headerRef.current;

            if (!header) {
                return;
            }

            gsap.fromTo(
                header,
                {
                    y: -30,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.4,
                    ease: 'power3.out',
                },
            );

            const handleScroll = () => {
                header.classList.toggle(
                    'header--scrolled',
                    window.scrollY > 80,
                );
            };

            window.addEventListener('scroll', handleScroll, {
                passive: true,
            });

            handleScroll();

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        },
        {
            scope: headerRef,
        },
    );

    return (
        <header ref={headerRef} className="header">
            <div className="header__inner container">
                <Link className="header__logo" to="/" data-cursor="link">
                    NOIRÉ
                </Link>

                <nav className="header__nav" aria-label="Main navigation">
                    {navigationItems.map((item) => (
                        <a key={item.href} href={item.href} data-cursor="link">
                            {item.label}
                        </a>
                    ))}
                </nav>

                <button
                    type="button"
                    className="header__menu-button"
                    aria-label="Open menu"
                    data-cursor="button"
                >
                    <span />
                    <span />
                </button>
            </div>
        </header>
    );
}
