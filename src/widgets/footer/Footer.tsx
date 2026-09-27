import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import './Footer.scss';

type FooterLink = {
    label: string;
    href: string;
};

const navigationLinks: FooterLink[] = [
    {
        label: 'Home',
        href: '#top',
    },
    {
        label: 'Menu',
        href: '#menu',
    },
    {
        label: 'About',
        href: '#about',
    },
    {
        label: 'Gallery',
        href: '#gallery',
    },
    {
        label: 'Reservation',
        href: '#reservation',
    },
];

const socialLinks: FooterLink[] = [
    {
        label: 'Instagram',
        href: '#',
    },
    {
        label: 'Facebook',
        href: '#',
    },
];

const footerDetails = [
    'Tuesday — Saturday',
    '18:00 — 00:00',
    '12 Rue du Bac, Paris',
];

export function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLHeadingElement>(null);
    const backgroundWordRef = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);
    const columnsRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const footer = footerRef.current;
            const logo = logoRef.current;
            const backgroundWord = backgroundWordRef.current;
            const top = topRef.current;
            const columns = columnsRef.current;
            const bottom = bottomRef.current;

            if (
                !footer ||
                !logo ||
                !backgroundWord ||
                !top ||
                !columns ||
                !bottom
            ) {
                return;
            }

            const logoLetters = logo.querySelectorAll('.footer__logo-letter');

            const columnItems = columns.querySelectorAll('.footer__column');

            const intro = gsap.timeline({
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 85%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse',
                },
            });

            intro
                .fromTo(
                    top,
                    {
                        opacity: 0,
                        y: 40,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                    },
                )
                .fromTo(
                    logoLetters,
                    {
                        opacity: 0,
                        yPercent: 100,
                    },
                    {
                        opacity: 1,
                        yPercent: 0,
                        duration: 1,
                        stagger: 0.06,
                        ease: 'power4.out',
                    },
                    '-=0.45',
                )
                .fromTo(
                    columnItems,
                    {
                        opacity: 0,
                        y: 25,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        stagger: 0.08,
                        ease: 'power3.out',
                    },
                    '-=0.55',
                )
                .fromTo(
                    bottom,
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 1,
                        duration: 0.7,
                    },
                    '-=0.35',
                );

            gsap.to(backgroundWord, {
                xPercent: -12,
                yPercent: -5,
                ease: 'none',
                scrollTrigger: {
                    trigger: footer,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2,
                },
            });

            gsap.to(logo, {
                yPercent: -8,
                ease: 'none',
                scrollTrigger: {
                    trigger: footer,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });
        },
        {
            scope: footerRef,
        },
    );

    const handleAnchorClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        href: string,
    ) => {
        if (!href.startsWith('#')) {
            return;
        }

        event.preventDefault();

        const targetId = href.slice(1);

        if (targetId === 'top') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });

            return;
        }

        const target = document.getElementById(targetId);

        target?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <footer ref={footerRef} className="footer">
            <div
                ref={backgroundWordRef}
                className="footer__background-word"
                aria-hidden="true"
            >
                NOIRÉ
            </div>

            <div className="footer__container container">
                <div ref={topRef} className="footer__top">
                    <p className="footer__eyebrow eyebrow">The art of dining</p>

                    <span className="footer__top-location">Paris · France</span>
                </div>

                <div className="footer__brand">
                    <h2
                        ref={logoRef}
                        className="footer__logo display-title"
                        aria-label="NOIRÉ"
                    >
                        {'NOIRÉ'.split('').map((letter, index) => (
                            <span
                                key={`${letter}-${index}`}
                                className="footer__logo-mask"
                            >
                                <span className="footer__logo-letter">
                                    {letter === ' ' ? '\u00A0' : letter}
                                </span>
                            </span>
                        ))}
                    </h2>

                    <p className="footer__tagline">
                        Modern European cuisine,
                        <br />
                        composed with intention.
                    </p>
                </div>

                <div ref={columnsRef} className="footer__columns">
                    <div className="footer__column">
                        <span className="footer__column-title">Navigate</span>

                        <nav className="footer__links">
                            {navigationLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="footer__link"
                                    onClick={(event) =>
                                        handleAnchorClick(event, link.href)
                                    }
                                >
                                    <span>{link.label}</span>
                                    <span className="footer__link-arrow">
                                        ↗
                                    </span>
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="footer__column">
                        <span className="footer__column-title">Visit</span>

                        <div className="footer__details">
                            {footerDetails.map((detail) => (
                                <span key={detail} className="footer__detail">
                                    {detail}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="footer__column">
                        <span className="footer__column-title">Contact</span>

                        <div className="footer__contact">
                            <a
                                href="tel:+33100000000"
                                className="footer__contact-link"
                            >
                                +33 1 00 00 00 00
                            </a>

                            <a
                                href="mailto:hello@noire.restaurant"
                                className="footer__contact-link"
                            >
                                hello@noire.restaurant
                            </a>
                        </div>

                        <div className="footer__socials">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="footer__social"
                                    onClick={(event) => event.preventDefault()}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div ref={bottomRef} className="footer__bottom">
                    <span>© {new Date().getFullYear()} NOIRÉ</span>

                    <span>All rights reserved.</span>

                    <button
                        type="button"
                        className="footer__back-top"
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth',
                            })
                        }
                    >
                        Back to top
                        <span>↑</span>
                    </button>
                </div>
            </div>
        </footer>
    );
}
