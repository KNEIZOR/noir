import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LazyImage } from '@/shared/ui/LazyImage/LazyImage';

import './SignatureDishSection.scss';

gsap.registerPlugin(ScrollTrigger);

type Ingredient = {
    id: number;
    label: string;
};

const ingredients: Ingredient[] = [
    {
        id: 1,
        label: 'Black garlic',
    },
    {
        id: 2,
        label: 'Smoked lemon',
    },
    {
        id: 3,
        label: 'Wild herbs',
    },
];

const signatureDish = {
    name: 'Charred Octopus',
    image: '/images/dishes/charred-octopus.webp',
    alt: 'Charred octopus with potatoes and greens served on an elegant plate',
};

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

            const reducedMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)',
            );

            if (reducedMotion.matches) {
                return;
            }

            const ingredientItems = ingredientsList.querySelectorAll('li');

            const introTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 78%',
                    end: 'top 42%',
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
                        duration: 1.25,
                        ease: 'power3.inOut',
                    },
                )
                .fromTo(
                    image,
                    {
                        scale: 1.12,
                    },
                    {
                        scale: 1,
                        duration: 1.5,
                        ease: 'power3.out',
                    },
                    '-=1',
                )
                .fromTo(
                    eyebrow,
                    {
                        opacity: 0,
                        x: 24,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.7,
                        ease: 'power3.out',
                    },
                    '-=0.8',
                )
                .fromTo(
                    title,
                    {
                        opacity: 0,
                        y: 45,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.85,
                        ease: 'power3.out',
                    },
                    '-=0.45',
                )
                .fromTo(
                    ingredientItems,
                    {
                        opacity: 0,
                        x: 20,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.55,
                        stagger: 0.08,
                        ease: 'power3.out',
                    },
                    '-=0.4',
                )
                .fromTo(
                    description,
                    {
                        opacity: 0,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.65,
                        ease: 'power3.out',
                    },
                    '-=0.35',
                )
                .fromTo(
                    number,
                    {
                        opacity: 0,
                        scale: 0.9,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.65,
                        ease: 'power3.out',
                    },
                    '-=0.45',
                );

            gsap.to(image, {
                yPercent: -5,
                scale: 1.05,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2,
                    invalidateOnRefresh: true,
                },
            });

            gsap.to(title, {
                yPercent: -5,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2.4,
                    invalidateOnRefresh: true,
                },
            });

            gsap.to(backgroundWord, {
                xPercent: -7,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 3,
                    invalidateOnRefresh: true,
                },
            });

            gsap.to(number, {
                yPercent: 35,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2.5,
                    invalidateOnRefresh: true,
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
                        <LazyImage
                            ref={imageRef}
                            className="signature-section__image"
                            src={signatureDish.image}
                            alt={signatureDish.alt}
                        />

                        <div
                            className="signature-section__image-overlay"
                            aria-hidden="true"
                        />
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
                            aria-hidden="true"
                        >
                            02
                        </span>
                    </div>

                    <h2
                        ref={titleRef}
                        className="signature-section__title display-title"
                    >
                        <span className="signature-section__title-line">
                            Charred
                        </span>

                        <span className="signature-section__title-line signature-section__title-line--offset">
                            Octopus
                        </span>
                    </h2>

                    <ul
                        ref={ingredientsRef}
                        className="signature-section__ingredients"
                    >
                        {ingredients.map((ingredient) => (
                            <li key={ingredient.id}>
                                <span
                                    className="signature-section__ingredient-dot"
                                    aria-hidden="true"
                                />

                                <span>{ingredient.label}</span>
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
