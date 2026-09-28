import { useRef } from 'react';

import { Link } from 'react-router-dom';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './AboutCta.scss';

gsap.registerPlugin(ScrollTrigger);

export function AboutCta() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const image = imageRef.current;
            const content = contentRef.current;

            if (!section || !image || !content) {
                return;
            }

            gsap.fromTo(
                content.children,
                {
                    opacity: 0,
                    y: 40,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 70%',
                    },
                },
            );

            gsap.to(image, {
                yPercent: 12,
                scale: 1.08,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.6,
                },
            });
        },
        {
            scope: sectionRef,
        },
    );

    return (
        <section ref={sectionRef} className="about-cta">
            <div
                ref={imageRef}
                className="about-cta__image"
                aria-hidden="true"
            />

            <div className="about-cta__overlay" aria-hidden="true" />

            <div ref={contentRef} className="container about-cta__content">
                <p className="eyebrow">07 — Continue the evening</p>

                <h2 className="display-title">
                    Come and <em>stay awhile.</em>
                </h2>

                <p>
                    Discover the menu, find your table, and let the evening take
                    its time.
                </p>

                <div className="about-cta__actions">
                    <Link to="/reservation" className="about-cta__button">
                        <span>Reserve a table</span>
                        <span aria-hidden="true">↗</span>
                    </Link>

                    <Link to="/menu" className="about-cta__link">
                        Explore the menu
                    </Link>
                </div>
            </div>
        </section>
    );
}
