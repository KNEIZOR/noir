import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './KitchenSection.scss';

gsap.registerPlugin(ScrollTrigger);

const kitchenDetails = [
    {
        number: '01',
        title: 'Seasonal',
        text: 'Our menu changes with the rhythm of the seasons and the availability of exceptional produce.',
    },
    {
        number: '02',
        title: 'Fire',
        text: 'Charcoal, flame and smoke bring depth to ingredients while keeping their natural character intact.',
    },
    {
        number: '03',
        title: 'Precise',
        text: 'Technique remains invisible when it is done well. Every element has a reason to be on the plate.',
    },
];

export function KitchenSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const image = imageRef.current;
            const items = itemsRef.current;

            if (!section || !image || !items) {
                return;
            }

            gsap.to(image, {
                yPercent: 12,
                scale: 1.08,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.8,
                },
            });

            gsap.fromTo(
                items.children,
                {
                    opacity: 0,
                    x: 45,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.9,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: items,
                        start: 'top 75%',
                    },
                },
            );
        },
        {
            scope: sectionRef,
        },
    );

    return (
        <section ref={sectionRef} className="kitchen-section">
            <div className="kitchen-section__background" aria-hidden="true" />

            <div className="container kitchen-section__inner">
                <div className="kitchen-section__heading">
                    <p className="eyebrow">03 — The kitchen</p>

                    <h2 className="section-title">
                        Respect the <em>ingredient.</em>
                    </h2>

                    <p className="kitchen-section__intro">
                        Our kitchen is guided by restraint. We source carefully,
                        cook with intention, and let the seasons decide what
                        belongs on the menu.
                    </p>
                </div>

                <div className="kitchen-section__visual">
                    <div ref={imageRef} className="kitchen-section__image" />
                </div>

                <div ref={itemsRef} className="kitchen-section__details">
                    {kitchenDetails.map((item) => (
                        <article
                            key={item.number}
                            className="kitchen-section__item"
                        >
                            <span className="kitchen-section__number">
                                {item.number}
                            </span>

                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
