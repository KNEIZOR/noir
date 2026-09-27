import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ChefSection.scss';

gsap.registerPlugin(ScrollTrigger);

const chefDetails = ['Paris', 'Copenhagen', 'Tokyo'];

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

            const detailItems = details.querySelectorAll(
                '.chef-section__detail',
            );

            const intro = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 72%',
                    end: 'top 28%',
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
                        duration: 1.4,
                        ease: 'power4.inOut',
                    },
                )
                .fromTo(
                    image,
                    {
                        scale: 1.15,
                    },
                    {
                        scale: 1,
                        duration: 1.7,
                        ease: 'power3.out',
                    },
                    '-=1.1',
                )
                .fromTo(
                    eyebrow,
                    {
                        opacity: 0,
                        x: -30,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.7,
                        ease: 'power3.out',
                    },
                    '-=0.9',
                )
                .fromTo(
                    name,
                    {
                        opacity: 0,
                        y: 70,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power4.out',
                    },
                    '-=0.45',
                )
                .fromTo(
                    quote,
                    {
                        opacity: 0,
                        y: 35,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        ease: 'power3.out',
                    },
                    '-=0.55',
                )
                .fromTo(
                    detailItems,
                    {
                        opacity: 0,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power3.out',
                    },
                    '-=0.5',
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
                        duration: 0.7,
                        ease: 'power3.out',
                    },
                    '-=0.5',
                );

            gsap.to(image, {
                yPercent: -10,
                scale: 1.08,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

            gsap.to(verticalName, {
                yPercent: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2,
                },
            });

            gsap.to(number, {
                yPercent: 90,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2.2,
                },
            });

            gsap.to(quote, {
                yPercent: -8,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.7,
                },
            });
        },
        {
            scope: sectionRef,
        },
    );

    return (
        <section ref={sectionRef} className="chef-section" id="chef">
            <div className="chef-section__background">
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
                            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1600&q=90"
                            alt="Chef preparing a dish in the NOIRÉ kitchen"
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
