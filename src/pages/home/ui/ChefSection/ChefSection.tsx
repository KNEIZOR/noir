import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ChefSection.scss';

gsap.registerPlugin(ScrollTrigger);

const chefDetails = ['Paris', 'Copenhagen', 'Tokyo'];

const chefImage =
    'https://images.openai.com/static-rsc-4/ihbUZeEf8-qoTfIlvp4A9H6GTQR_rYwVJo0-yUoQFRfTZ4ZJ6nQZetK9edsP7GBUbsiq4TgJD2KLSOKUeMbkbWzS5wAS2lmHHV4EbdVsHtMbVZ77HUjaVOEHUA_nf9Xqs5B3AwXf_HHVzEv9OsP_zNusGCZsZuhl28G9Llmuv0Qk7SgRCeY9LxaepYBPjHW3?purpose=fullsize';

export function ChefSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageWrapRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const eyebrowRef = useRef<HTMLParagraphElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const quoteRef = useRef<HTMLQuoteElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);
    const verticalNameRef = useRef<HTMLSpanElement>(null);
    const numberRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const imageWrap = imageWrapRef.current;
            const image = imageRef.current;
            const eyebrow = eyebrowRef.current;
            const name = nameRef.current;
            const quote = quoteRef.current;
            const details = detailsRef.current;
            const verticalName = verticalNameRef.current;
            const number = numberRef.current;

            if (
                !section ||
                !imageWrap ||
                !image ||
                !eyebrow ||
                !name ||
                !quote ||
                !details ||
                !verticalName ||
                !number
            ) {
                return;
            }

            const reducedMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)',
            );

            if (reducedMotion.matches) {
                return;
            }

            const detailItems = details.querySelectorAll(
                '.chef-section__detail',
            );

            const intro = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 78%',
                    end: 'top 38%',
                    toggleActions: 'play none none reverse',
                },
            });

            intro
                .fromTo(
                    imageWrap,
                    {
                        clipPath: 'inset(0 0 100% 0)',
                    },
                    {
                        clipPath: 'inset(0 0 0% 0)',
                        duration: 1.25,
                        ease: 'power3.inOut',
                    },
                )
                .fromTo(
                    image,
                    {
                        scale: 1.1,
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
                        x: -20,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.65,
                        ease: 'power3.out',
                    },
                    '-=0.75',
                )
                .fromTo(
                    name,
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
                    '-=0.4',
                )
                .fromTo(
                    quote,
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
                    detailItems,
                    {
                        opacity: 0,
                        y: 15,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.55,
                        stagger: 0.08,
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
                        duration: 0.6,
                        ease: 'power3.out',
                    },
                    '-=0.45',
                );

            gsap.to(image, {
                yPercent: -6,
                scale: 1.05,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2,
                },
            });

            gsap.to(verticalName, {
                yPercent: -12,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2.5,
                },
            });

            gsap.to(number, {
                yPercent: 55,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2.5,
                },
            });

            gsap.to(quote, {
                yPercent: -4,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2.2,
                },
            });
        },
        {
            scope: sectionRef,
        },
    );

    return (
        <section ref={sectionRef} className="chef-section" id="chef">
            <div className="chef-section__background" aria-hidden="true">
                <span className="chef-section__background-letter">C</span>
            </div>

            <div className="chef-section__container container">
                <div className="chef-section__visual">
                    <div
                        ref={imageWrapRef}
                        className="chef-section__image-wrap"
                    >
                        <img
                            ref={imageRef}
                            className="chef-section__image"
                            src={chefImage}
                            alt="Professional chef preparing food in a restaurant kitchen"
                            loading="lazy"
                            decoding="async"
                        />

                        <div className="chef-section__image-overlay" />
                    </div>

                    <span className="chef-section__image-caption">
                        Alexandre Moreau · Executive Chef
                    </span>
                </div>

                <div className="chef-section__content">
                    <div className="chef-section__top">
                        <p
                            ref={eyebrowRef}
                            className="chef-section__eyebrow eyebrow"
                        >
                            04 — The Chef
                        </p>

                        <span ref={numberRef} className="chef-section__number">
                            04
                        </span>
                    </div>

                    <h2
                        ref={nameRef}
                        className="chef-section__name display-title"
                    >
                        Alexandre
                        <span>Moreau</span>
                    </h2>

                    <blockquote ref={quoteRef} className="chef-section__quote">
                        “Cooking is the language between memory and taste.”
                    </blockquote>

                    <div ref={detailsRef} className="chef-section__details">
                        {chefDetails.map((detail) => (
                            <div key={detail} className="chef-section__detail">
                                <span className="chef-section__detail-line" />
                                <span>{detail}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <span
                    ref={verticalNameRef}
                    className="chef-section__vertical-name"
                    aria-hidden="true"
                >
                    ALEXANDRE MOREAU
                </span>
            </div>
        </section>
    );
}
