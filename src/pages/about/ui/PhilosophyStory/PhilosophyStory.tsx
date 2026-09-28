import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './PhilosophyStory.scss';

gsap.registerPlugin(ScrollTrigger);

export function PhilosophyStory() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const image = imageRef.current;
            const text = textRef.current;

            if (!section || !image || !text) {
                return;
            }

            gsap.fromTo(
                text.children,
                {
                    opacity: 0,
                    y: 50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 70%',
                    },
                },
            );

            gsap.to(image, {
                yPercent: -10,
                scale: 1.06,
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
        <section ref={sectionRef} className="philosophy-story">
            <div className="container philosophy-story__grid">
                <div className="philosophy-story__image-wrap">
                    <div ref={imageRef} className="philosophy-story__image" />

                    <span className="philosophy-story__image-label">
                        The beginning
                    </span>
                </div>

                <div ref={textRef} className="philosophy-story__content">
                    <p className="philosophy-story__eyebrow eyebrow">
                        02 — Our philosophy
                    </p>

                    <h2 className="philosophy-story__title section-title">
                        We believe <em>simplicity</em> is the highest form of
                        sophistication.
                    </h2>

                    <p className="philosophy-story__text">
                        NOIRÉ was born from a simple idea: create a place where
                        food, space, music, and people exist in perfect balance.
                    </p>

                    <p className="philosophy-story__text">
                        Nothing is added without intention. Nothing is rushed.
                        We let exceptional ingredients speak for themselves and
                        allow every evening to unfold at its own pace.
                    </p>

                    <div className="philosophy-story__signature">
                        <span>NOIRÉ</span>
                        <span>Paris — Est. 2018</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
