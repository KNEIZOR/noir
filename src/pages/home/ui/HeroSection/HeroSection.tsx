import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './HeroSection.scss';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const eyebrowRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const background = backgroundRef.current;
            const content = contentRef.current;
            const eyebrow = eyebrowRef.current;
            const title = titleRef.current;
            const description = descriptionRef.current;
            const scroll = scrollRef.current;

            if (
                !section ||
                !background ||
                !content ||
                !eyebrow ||
                !title ||
                !description ||
                !scroll
            ) {
                return;
            }

            const titleLines = title.querySelectorAll('span');

            const introTimeline = gsap.timeline({
                defaults: {
                    ease: 'power3.out',
                },
            });

            introTimeline
                .fromTo(
                    background,
                    {
                        scale: 1.16,
                        opacity: 0,
                    },
                    {
                        scale: 1.05,
                        opacity: 1,
                        duration: 2,
                        ease: 'power2.out',
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
                        duration: 0.9,
                    },
                    '-=1.2',
                )
                .fromTo(
                    titleLines,
                    {
                        opacity: 0,
                        y: 100,
                        rotateX: -20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        duration: 1.2,
                        stagger: 0.12,
                    },
                    '-=0.55',
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
                    },
                    '-=0.5',
                )
                .fromTo(
                    scroll,
                    {
                        opacity: 0,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                    },
                    '-=0.3',
                );

            gsap.to(background, {
                yPercent: 18,
                scale: 1.12,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            gsap.to(content, {
                yPercent: -18,
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '70% top',
                    scrub: true,
                },
            });

            gsap.to(scroll, {
                opacity: 0,
                y: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '25% top',
                    scrub: true,
                },
            });
        },
        {
            scope: sectionRef,
        },
    );

    return (
        <section ref={sectionRef} className="hero">
            <div ref={backgroundRef} className="hero__background" data-cursor="view"/>

            <div className="hero__overlay" />

            <div ref={contentRef} className="hero__content container">
                <p ref={eyebrowRef} className="hero__eyebrow">
                    Modern European Cuisine
                </p>

                <h1 ref={titleRef} className="hero__title display-title">
                    <span>Modern</span>
                    <span>Fine</span>
                    <span>Dining</span>
                </h1>

                <p ref={descriptionRef} className="hero__description">
                    A table beyond ordinary.
                </p>
            </div>

            <div ref={scrollRef} className="hero__scroll">
                <span>Scroll to discover</span>

                <span className="hero__scroll-line" />
            </div>
        </section>
    );
}
