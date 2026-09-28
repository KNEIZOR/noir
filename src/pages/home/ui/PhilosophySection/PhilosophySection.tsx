import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './PhilosophySection.scss';

gsap.registerPlugin(ScrollTrigger);

const philosophyLines = ['We believe', 'dinner should be', 'remembered.'];

export function PhilosophySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const eyebrowRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const numberRef = useRef<HTMLSpanElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const eyebrow = eyebrowRef.current;
            const title = titleRef.current;
            const description = descriptionRef.current;
            const number = numberRef.current;
            const line = lineRef.current;

            if (
                !section ||
                !eyebrow ||
                !title ||
                !description ||
                !number ||
                !line
            ) {
                return;
            }

            const reduceMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)',
            ).matches;

            if (reduceMotion) {
                return;
            }

            const titleLines = title.querySelectorAll<HTMLElement>(
                '.philosophy-section__title-line',
            );

            const intro = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 78%',
                    end: 'top 38%',
                    toggleActions: 'play none none reverse',
                },
            });

            intro
                .fromTo(
                    eyebrow,
                    {
                        opacity: 0,
                        y: 18,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: 'power2.out',
                    },
                )
                .fromTo(
                    line,
                    {
                        scaleX: 0,
                    },
                    {
                        scaleX: 1,
                        duration: 0.9,
                        ease: 'power2.inOut',
                    },
                    '-=0.35',
                )
                .fromTo(
                    titleLines,
                    {
                        opacity: 0,
                        y: 45,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        stagger: 0.1,
                        ease: 'power3.out',
                    },
                    '-=0.35',
                )
                .fromTo(
                    description,
                    {
                        opacity: 0,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: 'power2.out',
                    },
                    '-=0.5',
                )
                .fromTo(
                    number,
                    {
                        opacity: 0,
                        y: 15,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: 'power2.out',
                    },
                    '-=0.45',
                );

            gsap.to(title, {
                y: -35,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.8,
                },
            });

            gsap.to(number, {
                y: 55,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
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
        <section
            ref={sectionRef}
            className="philosophy-section"
            id="philosophy"
        >
            <div className="philosophy-section__background" aria-hidden="true">
                <span className="philosophy-section__background-word">
                    NOIRÉ
                </span>
            </div>

            <div className="philosophy-section__container container">
                <div className="philosophy-section__meta">
                    <p
                        ref={eyebrowRef}
                        className="philosophy-section__eyebrow eyebrow"
                    >
                        01 — The Philosophy
                    </p>

                    <div
                        ref={lineRef}
                        className="philosophy-section__line"
                        aria-hidden="true"
                    />
                </div>

                <div className="philosophy-section__content">
                    <h2
                        ref={titleRef}
                        className="philosophy-section__title display-title"
                    >
                        {philosophyLines.map((text) => (
                            <span
                                key={text}
                                className="philosophy-section__title-mask"
                            >
                                <span className="philosophy-section__title-line">
                                    {text}
                                </span>
                            </span>
                        ))}
                    </h2>

                    <div className="philosophy-section__side">
                        <p
                            ref={descriptionRef}
                            className="philosophy-section__description"
                        >
                            At NOIRÉ, every detail has a purpose. From the first
                            gesture in the kitchen to the final note on the
                            plate, we create an experience designed to stay with
                            you.
                        </p>

                        <span
                            ref={numberRef}
                            className="philosophy-section__number"
                        >
                            01
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
