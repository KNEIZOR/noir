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

            const titleLines = title.querySelectorAll(
                '.philosophy-section__title-line',
            );

            const intro = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    end: 'top 30%',
                    toggleActions: 'play none none reverse',
                },
            });

            intro
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
                        ease: 'power3.inOut',
                    },
                    '-=0.45',
                )
                .fromTo(
                    titleLines,
                    {
                        opacity: 0,
                        yPercent: 110,
                        rotateX: -35,
                    },
                    {
                        opacity: 1,
                        yPercent: 0,
                        rotateX: 0,
                        duration: 1.1,
                        stagger: 0.13,
                        ease: 'power4.out',
                    },
                    '-=0.55',
                )
                .fromTo(
                    description,
                    {
                        opacity: 0,
                        y: 30,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        ease: 'power3.out',
                    },
                    '-=0.55',
                )
                .fromTo(
                    number,
                    {
                        opacity: 0,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: 'power3.out',
                    },
                    '-=0.7',
                );

            gsap.to(title, {
                yPercent: -10,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.4,
                },
            });

            gsap.to(number, {
                yPercent: 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.8,
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
            <div className="philosophy-section__background">
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
                        {philosophyLines.map((line) => (
                            <span
                                key={line}
                                className="philosophy-section__title-mask"
                            >
                                <span className="philosophy-section__title-line">
                                    {line}
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
