import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { MagneticLink } from '@/shared/ui/MagneticButton/MagneticButton';

import './ReservationSection.scss';

gsap.registerPlugin(ScrollTrigger);

const reservationDetails = [
    'Tuesday — Saturday',
    '18:00 — 00:00',
    '12 Rue du Bac, Paris',
];

export function ReservationSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const eyebrowRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLSpanElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const background = backgroundRef.current;
            const overlay = overlayRef.current;
            const content = contentRef.current;
            const eyebrow = eyebrowRef.current;
            const title = titleRef.current;
            const description = descriptionRef.current;
            const button = buttonRef.current;
            const details = detailsRef.current;
            const number = numberRef.current;
            const line = lineRef.current;

            if (
                !section ||
                !background ||
                !overlay ||
                !content ||
                !eyebrow ||
                !title ||
                !description ||
                !button ||
                !details ||
                !number ||
                !line
            ) {
                return;
            }

            const titleLines = title.querySelectorAll(
                '.reservation-section__title-line',
            );

            const detailItems = details.querySelectorAll(
                '.reservation-section__detail',
            );

            const intro = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 72%',
                    end: 'top 25%',
                    toggleActions: 'play none none reverse',
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
                        duration: 1.5,
                        ease: 'power2.out',
                    },
                    '-=1.7',
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
                        ease: 'power3.out',
                    },
                    '-=1',
                )
                .fromTo(
                    line,
                    {
                        scaleX: 0,
                        transformOrigin: 'left center',
                    },
                    {
                        scaleX: 1,
                        duration: 1,
                        ease: 'power4.inOut',
                    },
                    '-=0.55',
                )
                .fromTo(
                    titleLines,
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
                        ease: 'power4.out',
                    },
                    '-=0.6',
                )
                .fromTo(
                    description,
                    {
                        opacity: 0,
                        y: 25,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                    },
                    '-=0.55',
                )
                .fromTo(
                    button,
                    {
                        opacity: 0,
                        y: 25,
                        scale: 0.96,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                    },
                    '-=0.55',
                )
                .fromTo(
                    detailItems,
                    {
                        opacity: 0,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.65,
                        stagger: 0.1,
                        ease: 'power3.out',
                    },
                    '-=0.45',
                );

            gsap.to(background, {
                yPercent: 12,
                scale: 1.1,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.8,
                },
            });

            gsap.to(content, {
                yPercent: -8,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

            gsap.to(number, {
                yPercent: 80,
                xPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2.2,
                },
            });

            gsap.to(line, {
                scaleX: 0.7,
                transformOrigin: 'left center',
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
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
            className="reservation-section"
            id="reservation"
        >
            <div
                ref={backgroundRef}
                className="reservation-section__background"
                aria-hidden="true"
            />

            <div
                ref={overlayRef}
                className="reservation-section__overlay"
                aria-hidden="true"
            />

            <span
                ref={numberRef}
                className="reservation-section__number"
                aria-hidden="true"
            >
                07
            </span>

            <div
                ref={contentRef}
                className="reservation-section__content container"
            >
                <div className="reservation-section__header">
                    <p
                        ref={eyebrowRef}
                        className="reservation-section__eyebrow eyebrow"
                    >
                        07 — Reservation
                    </p>

                    <div
                        ref={lineRef}
                        className="reservation-section__line"
                        aria-hidden="true"
                    />
                </div>

                <div className="reservation-section__main">
                    <h2
                        ref={titleRef}
                        className="reservation-section__title display-title"
                    >
                        <span className="reservation-section__title-mask">
                            <span className="reservation-section__title-line">
                                Your table
                            </span>
                        </span>

                        <span className="reservation-section__title-mask">
                            <span className="reservation-section__title-line reservation-section__title-line--offset">
                                awaits.
                            </span>
                        </span>
                    </h2>

                    <div className="reservation-section__aside">
                        <p
                            ref={descriptionRef}
                            className="reservation-section__description"
                        >
                            Join us for an evening where every detail has been
                            considered, every course has a story, and time is
                            allowed to slow down.
                        </p>

                        <MagneticLink
                            ref={buttonRef}
                            className="reservation-section__magnetic"
                            href="/reservation"
                            strength={0.14}
                        >
                            <span className="reservation-section__button">
                                <span>Reserve a table</span>

                                <span
                                    className="reservation-section__button-icon"
                                    aria-hidden="true"
                                >
                                    →
                                </span>
                            </span>
                        </MagneticLink>
                    </div>
                </div>

                <div ref={detailsRef} className="reservation-section__details">
                    {reservationDetails.map((detail, index) => (
                        <div
                            key={detail}
                            className="reservation-section__detail"
                        >
                            <span className="reservation-section__detail-index">
                                0{index + 1}
                            </span>

                            <span>{detail}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
