import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import './Header.scss';

type NavigationItem =
    | {
          label: string;
          href: string;
          type: 'route';
      }
    | {
          label: string;
          href: string;
          type: 'anchor';
      };

const navigationItems: NavigationItem[] = [
    {
        label: 'Menu',
        href: '/menu',
        type: 'route',
    },
    {
        label: 'About',
        href: '/about',
        type: 'route',
    },
    {
        label: 'Experience',
        href: '/#experience',
        type: 'anchor',
    },
    {
        label: 'Reserve',
        href: '/reservation',
        type: 'route',
    },
];

export function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const mobileNavRef = useRef<HTMLElement>(null);
    const mobileItemsRef = useRef<HTMLAnchorElement[]>([]);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const menuLabelRef = useRef<HTMLSpanElement>(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const addMobileItemRef = (element: HTMLAnchorElement | null) => {
        if (!element) {
            return;
        }

        if (!mobileItemsRef.current.includes(element)) {
            mobileItemsRef.current.push(element);
        }
    };

    useGSAP(
        () => {
            const header = headerRef.current;
            const mobileMenu = mobileMenuRef.current;
            const mobileNav = mobileNavRef.current;

            if (!header) {
                return;
            }

            const intro = gsap.fromTo(
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

            if (mobileMenu) {
                gsap.set(mobileMenu, {
                    autoAlpha: 0,
                    pointerEvents: 'none',
                });
            }

            if (mobileNav) {
                gsap.set(mobileNav, {
                    y: 35,
                    opacity: 0,
                });
            }

            return () => {
                intro.kill();

                window.removeEventListener('scroll', handleScroll);
            };
        },
        {
            scope: headerRef,
        },
    );

    useGSAP(
        () => {
            const mobileMenu = mobileMenuRef.current;
            const mobileNav = mobileNavRef.current;
            const items = mobileItemsRef.current;

            if (!mobileMenu || !mobileNav) {
                return;
            }

            if (isMenuOpen) {
                document.body.classList.add('menu-open');

                gsap.killTweensOf([mobileMenu, mobileNav, ...items]);

                gsap.set(mobileMenu, {
                    pointerEvents: 'auto',
                });

                gsap.to(mobileMenu, {
                    autoAlpha: 1,
                    duration: 0.45,
                    ease: 'power2.out',
                });

                gsap.fromTo(
                    mobileNav,
                    {
                        y: 35,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.75,
                        delay: 0.12,
                        ease: 'power3.out',
                    },
                );

                gsap.fromTo(
                    items,
                    {
                        y: 40,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        stagger: 0.07,
                        delay: 0.18,
                        ease: 'power3.out',
                    },
                );
            } else {
                document.body.classList.remove('menu-open');

                gsap.killTweensOf([mobileMenu, mobileNav, ...items]);

                gsap.to(items, {
                    y: -20,
                    opacity: 0,
                    duration: 0.25,
                    stagger: 0.035,
                    ease: 'power2.in',
                });

                gsap.to(mobileNav, {
                    y: -20,
                    opacity: 0,
                    duration: 0.3,
                    delay: 0.1,
                    ease: 'power2.in',
                });

                gsap.to(mobileMenu, {
                    autoAlpha: 0,
                    duration: 0.45,
                    delay: 0.18,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        gsap.set(mobileMenu, {
                            pointerEvents: 'none',
                        });
                    },
                });
            }
        },
        {
            dependencies: [isMenuOpen],
            scope: headerRef,
        },
    );

    const handleMenuToggle = () => {
        setIsMenuOpen((current) => !current);
    };

    const handleNavigationClick = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            <header
                ref={headerRef}
                className={`header ${isMenuOpen ? 'header--menu-open' : ''}`}
            >
                <div className="header__inner container">
                    <Link
                        className="header__logo"
                        to="/"
                        data-cursor="link"
                        onClick={handleNavigationClick}
                    >
                        NOIRÉ
                    </Link>

                    <nav
                        className="header__nav"
                        aria-label="Main navigation"
                    >
                        {navigationItems.map((item) => {
                            if (item.type === 'route') {
                                return (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        data-cursor="link"
                                        onClick={handleNavigationClick}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            }

                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    data-cursor="link"
                                    onClick={handleNavigationClick}
                                >
                                    {item.label}
                                </a>
                            );
                        })}
                    </nav>

                    <button
                        ref={menuButtonRef}
                        type="button"
                        className={`header__menu-button ${
                            isMenuOpen
                                ? 'header__menu-button--open'
                                : ''
                        }`}
                        aria-label={
                            isMenuOpen ? 'Close menu' : 'Open menu'
                        }
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-navigation"
                        data-cursor="button"
                        onClick={handleMenuToggle}
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </header>

            <div
                ref={mobileMenuRef}
                className="header-mobile-menu"
                aria-hidden={!isMenuOpen}
            >
                <div className="header-mobile-menu__inner container">
                    <div className="header-mobile-menu__top">
                        <span className="header-mobile-menu__eyebrow">
                            NOIRÉ — PARIS
                        </span>

                        <span
                            ref={menuLabelRef}
                            className="header-mobile-menu__label"
                        >
                            Navigation
                        </span>
                    </div>

                    <nav
                        id="mobile-navigation"
                        ref={mobileNavRef}
                        className="header-mobile-menu__nav"
                        aria-label="Mobile navigation"
                    >
                        {navigationItems.map((item, index) => {
                            const content = (
                                <>
                                    <span className="header-mobile-menu__number">
                                        0{index + 1}
                                    </span>

                                    <span className="header-mobile-menu__text">
                                        {item.label}
                                    </span>

                                    <span
                                        className="header-mobile-menu__arrow"
                                        aria-hidden="true"
                                    >
                                        →
                                    </span>
                                </>
                            );

                            if (item.type === 'route') {
                                return (
                                    <Link
                                        key={item.href}
                                        ref={addMobileItemRef}
                                        to={item.href}
                                        className="header-mobile-menu__link"
                                        onClick={handleNavigationClick}
                                        data-cursor="link"
                                    >
                                        {content}
                                    </Link>
                                );
                            }

                            return (
                                <a
                                    key={item.href}
                                    ref={addMobileItemRef}
                                    href={item.href}
                                    className="header-mobile-menu__link"
                                    onClick={handleNavigationClick}
                                    data-cursor="link"
                                >
                                    {content}
                                </a>
                            );
                        })}
                    </nav>

                    <div className="header-mobile-menu__footer">
                        <span>Tuesday — Saturday</span>
                        <span>18:00 — 00:00</span>
                        <span>Paris, France</span>
                    </div>
                </div>
            </div>
        </>
    );
}