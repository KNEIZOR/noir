import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ValuesSection.scss';

gsap.registerPlugin(ScrollTrigger);

const values = [
    {
        number: '01',
        title: 'Seasonality',
        text: 'We follow the seasons rather than forcing them.',
    },
    {
        number: '02',
        title: 'Craft',
        text: 'Technique serves the ingredient, never the other way around.',
    },
    {
        number: '03',
        title: 'Hospitality',
        text: 'Every guest should feel expected, never processed.',
    },
    {
        number: '04',
        title: 'Curiosity',
        text: 'We remain interested in what we have not discovered yet.',
    },
];

export function ValuesSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;

            if (!section) {
                return;
            }

            const items = section.querySelectorAll('.values-section__item');

            gsap.fromTo(
                items,
                {
                    opacity: 0,
                    y: 35,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 72%',
                    },
                },
            );
        },
        {
            scope: sectionRef,
        },
    );

    return (
        <section ref={sectionRef} className="values-section">
            <div className="container">
                <div className="values-section__heading">
                    <p className="eyebrow">06 — What matters</p>

                    <h2 className="section-title">
                        Four things we <em>never compromise.</em>
                    </h2>
                </div>

                <div className="values-section__grid">
                    {values.map((value) => (
                        <article
                            key={value.number}
                            className="values-section__item"
                        >
                            <span>{value.number}</span>

                            <h3>{value.title}</h3>

                            <p>{value.text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
