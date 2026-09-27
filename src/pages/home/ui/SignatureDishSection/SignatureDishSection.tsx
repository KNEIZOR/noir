import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './SignatureDishSection.scss';

gsap.registerPlugin(ScrollTrigger);

const ingredients = ['Black garlic', 'Smoked lemon', 'Wild herbs'];

export function SignatureDishSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageWrapRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const eyebrowRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const ingredientsRef = useRef<HTMLUListElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const numberRef = useRef<HTMLSpanElement>(null);
    const backgroundWordRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const imageWrap = imageWrapRef.current;
            const image = imageRef.current;
            const eyebrow = eyebrowRef.current;
            const title = titleRef.current;
            const ingredientsList = ingredientsRef.current;
            const description = descriptionRef.current;
            const number = numberRef.current;
            const backgroundWord = backgroundWordRef.current;

            if (
                !section ||
                !imageWrap ||
                !image ||
                !eyebrow ||
                !title ||
                !ingredientsList ||
                !description ||
                !number ||
                !backgroundWord
            ) {
                return;
            }

            const ingredientItems = ingredientsList.querySelectorAll('li');

            const introTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 72%',
                    end: 'top 25%',
                    toggleActions: 'play none none reverse',
                },
            });

            introTimeline
                .fromTo(
                    imageWrap,
                    {
                        clipPath: 'inset(0 100% 0 0)',
                    },
                    {
                        clipPath: 'inset(0 0% 0 0)',
                        duration: 1.4,
                        ease: 'power4.inOut',
                    },
                )
                .fromTo(
                    image,
                    {
                        scale: 1.2,
                    },
                    {
                        scale: 1,
                        duration: 1.8,
                        ease: 'power3.out',
                    },
                    '-=1.15',
                )
                .fromTo(
                    eyebrow,
                    {
                        opacity: 0,
                        x: 35,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                    },
                    '-=0.9',
                )
                .fromTo(
                    title,
                    {
                        opacity: 0,
                        y: 60,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power4.out',
                    },
                    '-=0.55',
                )
                .fromTo(
                    ingredientItems,
                    {
                        opacity: 0,
                        x: 30,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.65,
                        stagger: 0.1,
                        ease: 'power3.out',
                    },
                    '-=0.6',
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
                        duration: 0.7,
                        ease: 'power3.out',
                    },
                    '-=0.4',
                )
                .fromTo(
                    number,
                    {
                        opacity: 0,
                        scale: 0.8,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                    },
                    '-=0.55',
                );

            gsap.to(image, {
                yPercent: -9,
                scale: 1.08,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

            gsap.to(title, {
                yPercent: -8,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.8,
                },
            });

            gsap.to(backgroundWord, {
                xPercent: -12,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2.2,
                },
            });

            gsap.to(number, {
                yPercent: 70,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
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
        <section ref={sectionRef} className="signature-section" id="signature">
            <div
                ref={backgroundWordRef}
                className="signature-section__background-word"
                aria-hidden="true"
            >
                TASTE
            </div>

            <div className="signature-section__container container">
                <div className="signature-section__visual">
                    <div
                        ref={imageWrapRef}
                        className="signature-section__image-wrap"
                    >
                        <img
                            ref={imageRef}
                            className="signature-section__image"
                            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&q=90"
                            alt="Charred octopus served with herbs"
                        />

                        <div className="signature-section__image-overlay" />
                    </div>

                    <span className="signature-section__visual-caption">
                        NOIRÉ · SIGNATURE
                    </span>
                </div>

                <div className="signature-section__content">
                    <div className="signature-section__header">
                        <p
                            ref={eyebrowRef}
                            className="signature-section__eyebrow eyebrow"
                        >
                            02 — Signature
                        </p>

                        <span
                            ref={numberRef}
                            className="signature-section__number"
                        >
                            02
                        </span>
                    </div>

                    <h2
                        ref={titleRef}
                        className="signature-section__title display-title"
                    >
                        Charred
                        <span>Octopus</span>
                    </h2>

                    <ul
                        ref={ingredientsRef}
                        className="signature-section__ingredients"
                    >
                        {ingredients.map((ingredient) => (
                            <li key={ingredient}>
                                <span className="signature-section__ingredient-dot" />
                                {ingredient}
                            </li>
                        ))}
                    </ul>

                    <p
                        ref={descriptionRef}
                        className="signature-section__description"
                    >
                        A study in contrast — fire and freshness, depth and
                        brightness, simplicity and precision.
                    </p>
                </div>
            </div>
        </section>
    );
}
