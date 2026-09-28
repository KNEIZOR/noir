import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './MenuHero.scss';

gsap.registerPlugin(ScrollTrigger);

export function MenuHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const eyebrowRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const numberRef = useRef<HTMLSpanElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const background = backgroundRef.current;
            const content = contentRef.current;
            const eyebrow = eyebrowRef.current;
            const title = titleRef.current;
            const subtitle = subtitleRef.current;
            const number = numberRef.current;
            const line = lineRef.current;

            if (
                !section ||
                !background ||
                !content ||
                !eyebrow ||
                !title ||
                !subtitle ||
                !number ||
                !line
            ) {
                return;
            }

            const reduceMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)',
            ).matches;

            if (reduceMotion) {
                gsap.set(
                    [
                        background,
                        content,
                        eyebrow,
                        title,
                        subtitle,
                        number,
                        line,
                    ],
                    {
                        clearProps: 'all',
                    },
                );

                return;
            }

            const intro = gsap.timeline({
                defaults: {
                    ease: 'power4.out',
                },
            });

            intro
                .fromTo(
                    background,
                    {
                        scale: 1.14,
                        opacity: 0.5,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 2,
                        ease: 'power3.out',
                    },
                )
                .fromTo(
                    eyebrow,
                    {
                        opacity: 0,
                        y: 30,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                    },
                    '-=1.25',
                )
                .fromTo(
                    title.querySelectorAll('.menu-hero__title-line'),
                    {
                        opacity: 0,
                        yPercent: 110,
                        rotateX: -25,
                    },
                    {
                        opacity: 1,
                        yPercent: 0,
                        rotateX: 0,
                        duration: 1.15,
                        stagger: 0.12,
                    },
                    '-=0.5',
                )
                .fromTo(
                    line,
                    {
                        scaleX: 0,
                    },
                    {
                        scaleX: 1,
                        duration: 1,
                        ease: 'power4.inOut',
                    },
                    '-=0.65',
                )
                .fromTo(
                    subtitle,
                    {
                        opacity: 0,
                        y: 25,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                    },
                    '-=0.55',
                );

            gsap.to(background, {
                yPercent: 14,
                scale: 1.08,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

            gsap.to(content, {
                yPercent: -12,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.8,
                },
            });

            gsap.to(number, {
                yPercent: 70,
                xPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 2.2,
                },
            });
        },
        {
            scope: sectionRef,
        },
    );

    return (
        <section ref={sectionRef} className="menu-hero">
            <div ref={backgroundRef} className="menu-hero__background" />

            <div className="menu-hero__overlay" />

            <span
                ref={numberRef}
                className="menu-hero__number"
                aria-hidden="true"
            >
                02
            </span>

            <div ref={contentRef} className="menu-hero__content container">
                <p ref={eyebrowRef} className="menu-hero__eyebrow eyebrow">
                    The Menu
                </p>

                <h1 ref={titleRef} className="menu-hero__title display-title">
                    <span className="menu-hero__title-mask">
                        <span className="menu-hero__title-line">Taste</span>
                    </span>

                    <span className="menu-hero__title-mask">
                        <span className="menu-hero__title-line menu-hero__title-line--offset">
                            the extraordinary.
                        </span>
                    </span>
                </h1>

                <div className="menu-hero__bottom">
                    <div
                        ref={lineRef}
                        className="menu-hero__line"
                        aria-hidden="true"
                    />

                    <p ref={subtitleRef} className="menu-hero__subtitle">
                        A seasonal expression of modern European cuisine, shaped
                        by fire, nature and time.
                    </p>
                </div>
            </div>

            <div className="menu-hero__scroll" aria-hidden="true">
                <span>Scroll to explore</span>
                <span className="menu-hero__scroll-line" />
            </div>
        </section>
    );
}
