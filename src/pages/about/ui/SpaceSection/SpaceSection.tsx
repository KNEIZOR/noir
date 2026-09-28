import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './SpaceSection.scss';

gsap.registerPlugin(ScrollTrigger);

const spaces = [
    {
        number: '01',
        title: 'The dining room',
        image: '/images/gallery/dining-room.webp',
    },
    {
        number: '02',
        title: 'The table',
        image: '/images/gallery/table.webp',
    },
    {
        number: '03',
        title: 'After dark',
        image: '/images/gallery/evening-light.webp',
    },
];

export function SpaceSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;

            if (!section) {
                return;
            }

            const cards = section.querySelectorAll('.space-section__card');

            cards.forEach((card) => {
                const image = card.querySelector('.space-section__card-image');

                if (!image) {
                    return;
                }

                gsap.fromTo(
                    image,
                    {
                        yPercent: -4,
                        scale: 1.02,
                    },
                    {
                        yPercent: 10,
                        scale: 1.08,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1.5,
                        },
                    },
                );
            });

            gsap.fromTo(
                cards,
                {
                    opacity: 0,
                    y: 50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.14,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    },
                },
            );
        },
        {
            scope: sectionRef,
        },
    );

    return (
        <section ref={sectionRef} className="space-section">
            <div className="container">
                <div className="space-section__heading">
                    <p className="eyebrow">05 — The space</p>

                    <h2 className="section-title">
                        Designed for <em>lingering.</em>
                    </h2>

                    <p>
                        Warm light, natural textures, and enough space between
                        tables to let conversations become the evening.
                    </p>
                </div>

                <div className="space-section__grid">
                    {spaces.map((space) => (
                        <article
                            key={space.number}
                            className="space-section__card"
                        >
                            <div className="space-section__card-visual">
                                <div
                                    className="space-section__card-image"
                                    style={{
                                        backgroundImage: `url("${space.image}")`,
                                    }}
                                    aria-hidden="true"
                                />
                            </div>

                            <div className="space-section__card-meta">
                                <span>{space.number}</span>

                                <h3>{space.title}</h3>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="space-section__footer">
                    <span className="space-section__footer-label">
                        The atmosphere
                    </span>

                    <p className="space-section__footer-title">
                        Designed for lingering.
                    </p>
                </div>
            </div>
        </section>
    );
}
