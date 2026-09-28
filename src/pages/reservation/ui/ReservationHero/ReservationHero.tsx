import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ReservationHero.scss';

gsap.registerPlugin(ScrollTrigger);

export function ReservationHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const eyebrowRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const metaRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const background = backgroundRef.current;
            const overlay = overlayRef.current;
            const content = contentRef.current;
            const eyebrow = eyebrowRef.current;
            const title = titleRef.current;
            const description = descriptionRef.current;
            const meta = metaRef.current;
            const scroll = scrollRef.current;

            if (
                !section ||
                !background ||
                !overlay ||
                !content ||
                !eyebrow ||
                !title ||
                !description ||
                !meta ||
                !scroll
            ) {
                return;
            }

            const titleLines = title.querySelectorAll(
                '.reservation-hero__title-line',
            );

            const intro = gsap.timeline({
                defaults: {
                    ease: 'power3.out',
                },
            });

            intro
                .fromTo(
                    background,
                    {
                        scale: 1.14,
                    },
                    {
                        scale: 1,
                        duration: 2,
                        ease: 'power3.out',
                    },
                )
                .fromTo(
                    overlay,
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 1,
                        duration: 1.4,
                    },
                    '-=1.7',
                )
                .fromTo(
                    eyebrow,
                    {
                        opacity: 0,
                        y: 24,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                    },
                    '-=0.9',
                )
                .fromTo(
                    titleLines,
                    {
                        opacity: 0,
                        yPercent: 110,
                        rotateX: -20,
                    },
                    {
                        opacity: 1,
                        yPercent: 0,
                        rotateX: 0,
                        duration: 1.15,
                        stagger: 0.12,
                        ease: 'power4.out',
                    },
                    '-=0.55',
                )
                .fromTo(
                    description,
                    {
                        opacity: 0,
                        y: 24,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                    },
                    '-=0.55',
                )
                .fromTo(
                    meta,
                    {
                        opacity: 0,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                    },
                    '-=0.5',
                )
                .fromTo(
                    scroll,
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 1,
                        duration: 0.8,
                    },
                    '-=0.35',
                );

            gsap.to(background, {
                yPercent: 14,
                scale: 1.08,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.8,
                },
            });

            gsap.to(content, {
                yPercent: -12,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

            gsap.to(scroll, {
                y: 12,
                opacity: 0.45,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
        },
        {
            scope: sectionRef,
        },
    );

    return (
        <section
            ref={sectionRef}
            className="reservation-hero"
            aria-labelledby="reservation-title"
        >
            <div
                ref={backgroundRef}
                className="reservation-hero__background"
                aria-hidden="true"
            />

            <div
                ref={overlayRef}
                className="reservation-hero__overlay"
                aria-hidden="true"
            />

            <div
                ref={contentRef}
                className="reservation-hero__content container"
            >
                <div className="reservation-hero__header">
                    <p
                        ref={eyebrowRef}
                        className="reservation-hero__eyebrow eyebrow"
                    >
                        07 — Reservation
                    </p>

                    <span className="reservation-hero__line" />
                </div>

                <div className="reservation-hero__main">
                    <h1
                        ref={titleRef}
                        id="reservation-title"
                        className="reservation-hero__title display-title"
                    >
                        <span className="reservation-hero__title-mask">
                            <span className="reservation-hero__title-line">
                                Your table
                            </span>
                        </span>

                        <span className="reservation-hero__title-mask">
                            <span className="reservation-hero__title-line reservation-hero__title-line--offset">
                                awaits.
                            </span>
                        </span>
                    </h1>

                    <p
                        ref={descriptionRef}
                        className="reservation-hero__description"
                    >
                        Join us for an evening of thoughtful cooking, intimate
                        atmosphere and time allowed to slow down.
                    </p>
                </div>

                <div ref={metaRef} className="reservation-hero__meta">
                    <span>Tuesday — Saturday</span>
                    <span>18:00 — 00:00</span>
                    <span>12 Rue du Bac, Paris</span>
                </div>

                <div
                    ref={scrollRef}
                    className="reservation-hero__scroll"
                    aria-hidden="true"
                >
                    <span className="reservation-hero__scroll-line" />
                    <span>Scroll to reserve</span>
                </div>
            </div>
        </section>
    );
}
