import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './AboutHero.scss';

gsap.registerPlugin(ScrollTrigger);

export function AboutHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const eyebrowRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const numberRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const image = imageRef.current;
            const overlay = overlayRef.current;
            const eyebrow = eyebrowRef.current;
            const title = titleRef.current;
            const subtitle = subtitleRef.current;
            const number = numberRef.current;

            if (
                !section ||
                !image ||
                !overlay ||
                !eyebrow ||
                !title ||
                !subtitle ||
                !number
            ) {
                return;
            }

            const titleLines = title.querySelectorAll(
                '.about-hero__title-line',
            );

            const intro = gsap.timeline({
                defaults: {
                    ease: 'power4.out',
                },
            });

            intro
                .fromTo(
                    image,
                    {
                        scale: 1.16,
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
                        duration: 1.2,
                    },
                    '-=1.45',
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
                    '-=0.7',
                )
                .fromTo(
                    titleLines,
                    {
                        opacity: 0,
                        yPercent: 110,
                        rotateX: -30,
                    },
                    {
                        opacity: 1,
                        yPercent: 0,
                        rotateX: 0,
                        duration: 1.15,
                        stagger: 0.12,
                    },
                    '-=0.55',
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
                    '-=0.65',
                );

            gsap.to(image, {
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

            gsap.to(number, {
                yPercent: 45,
                xPercent: -12,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 2,
                },
            });
        },
        {
            scope: sectionRef,
        },
    );

    return (
        <section ref={sectionRef} className="about-hero">
            <div
                ref={imageRef}
                className="about-hero__image"
                aria-hidden="true"
            />

            <div
                ref={overlayRef}
                className="about-hero__overlay"
                aria-hidden="true"
            />

            <span
                ref={numberRef}
                className="about-hero__number"
                aria-hidden="true"
            >
                01
            </span>

            <div className="about-hero__content container">
                <p ref={eyebrowRef} className="about-hero__eyebrow eyebrow">
                    01 — About NOIRÉ
                </p>

                <h1 ref={titleRef} className="about-hero__title display-title">
                    <span className="about-hero__title-mask">
                        <span className="about-hero__title-line">Beyond</span>
                    </span>

                    <span className="about-hero__title-mask">
                        <span className="about-hero__title-line about-hero__title-line--offset">
                            the plate.
                        </span>
                    </span>
                </h1>

                <p ref={subtitleRef} className="about-hero__subtitle">
                    A restaurant shaped by fire, seasonality, and the belief
                    that an evening can become a memory.
                </p>

                <div className="about-hero__scroll" aria-hidden="true">
                    <span>Scroll to discover</span>
                    <span className="about-hero__scroll-line" />
                </div>
            </div>
        </section>
    );
}
