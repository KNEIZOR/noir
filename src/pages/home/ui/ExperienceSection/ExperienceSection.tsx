import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ExperienceSection.scss';

gsap.registerPlugin(ScrollTrigger);

const experienceDetails = [
    'An intimate dining room',
    'A seasonal tasting menu',
    'An evening worth remembering',
];

export function ExperienceSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const eyebrowRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const backgroundWordRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const image = imageRef.current;
            const overlay = overlayRef.current;
            const eyebrow = eyebrowRef.current;
            const title = titleRef.current;
            const description = descriptionRef.current;
            const details = detailsRef.current;
            const line = lineRef.current;
            const backgroundWord = backgroundWordRef.current;

            if (
                !section ||
                !image ||
                !overlay ||
                !eyebrow ||
                !title ||
                !description ||
                !details ||
                !line ||
                !backgroundWord
            ) {
                return;
            }

            const detailItems = details.querySelectorAll(
                '.experience-section__detail',
            );

            const titleLines = title.querySelectorAll(
                '.experience-section__title-line',
            );

            const intro = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    end: 'top 25%',
                    toggleActions: 'play none none reverse',
                },
            });

            intro
                .fromTo(
                    image,
                    {
                        scale: 1.18,
                    },
                    {
                        scale: 1,
                        duration: 1.8,
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
                        duration: 1.3,
                        ease: 'power2.out',
                    },
                    '-=1.5',
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
                    '-=0.8',
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
                    '-=0.5',
                )
                .fromTo(
                    titleLines,
                    {
                        opacity: 0,
                        yPercent: 100,
                    },
                    {
                        opacity: 1,
                        yPercent: 0,
                        duration: 1.1,
                        stagger: 0.12,
                        ease: 'power4.out',
                    },
                    '-=0.6',
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
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power3.out',
                    },
                    '-=0.45',
                );

            gsap.to(image, {
                yPercent: 10,
                scale: 1.12,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.8,
                },
            });

            gsap.to(title, {
                yPercent: -12,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

            gsap.to(description, {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2,
                },
            });

            gsap.to(backgroundWord, {
                xPercent: -15,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2.5,
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
            className="experience-section"
            id="experience"
        >
            <div ref={imageRef} className="experience-section__background" />

            <div ref={overlayRef} className="experience-section__overlay" />

            <div
                ref={backgroundWordRef}
                className="experience-section__background-word"
                aria-hidden="true"
            >
                EXPERIENCE
            </div>

            <div className="experience-section__container container">
                <div className="experience-section__header">
                    <p
                        ref={eyebrowRef}
                        className="experience-section__eyebrow eyebrow"
                    >
                        05 — The Experience
                    </p>

                    <div
                        ref={lineRef}
                        className="experience-section__line"
                        aria-hidden="true"
                    />
                </div>

                <div className="experience-section__content">
                    <h2
                        ref={titleRef}
                        className="experience-section__title display-title"
                    >
                        <span className="experience-section__title-mask">
                            <span className="experience-section__title-line">
                                More than
                            </span>
                        </span>

                        <span className="experience-section__title-mask">
                            <span className="experience-section__title-line experience-section__title-line--offset">
                                dinner.
                            </span>
                        </span>
                    </h2>

                    <p
                        ref={descriptionRef}
                        className="experience-section__description"
                    >
                        An evening at NOIRÉ is not simply a meal. It is a
                        sequence of moments — light, sound, aroma, texture and
                        taste — carefully composed from the moment you arrive.
                    </p>
                </div>

                <div ref={detailsRef} className="experience-section__details">
                    {experienceDetails.map((detail) => (
                        <div
                            key={detail}
                            className="experience-section__detail"
                        >
                            <span className="experience-section__detail-number">
                                0{experienceDetails.indexOf(detail) + 1}
                            </span>

                            <span>{detail}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
