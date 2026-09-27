import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './GallerySection.scss';

gsap.registerPlugin(ScrollTrigger);

type GalleryItem = {
    id: number;
    image: string;
    alt: string;
    size: 'large' | 'medium' | 'small';
};

const galleryItems: GalleryItem[] = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=90',
        alt: 'Elegant restaurant interior',
        size: 'large',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=90',
        alt: 'Atmospheric dining room',
        size: 'medium',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=90',
        alt: 'Fine dining table setting',
        size: 'small',
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=90',
        alt: 'Chef preparing a dish',
        size: 'large',
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?auto=format&fit=crop&w=1600&q=90',
        alt: 'Restaurant atmosphere',
        size: 'medium',
    },
];

export function GallerySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const backgroundWordRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const header = headerRef.current;
            const title = titleRef.current;
            const description = descriptionRef.current;
            const track = trackRef.current;
            const backgroundWord = backgroundWordRef.current;

            if (
                !section ||
                !header ||
                !title ||
                !description ||
                !track ||
                !backgroundWord
            ) {
                return;
            }

            const cards = track.querySelectorAll('.gallery-section__card');

            const images = track.querySelectorAll('.gallery-section__image');

            const titleLines = title.querySelectorAll(
                '.gallery-section__title-line',
            );

            const intro = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    end: 'top 35%',
                    toggleActions: 'play none none reverse',
                },
            });

            intro
                .fromTo(
                    header,
                    {
                        opacity: 0,
                        y: 30,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                    },
                )
                .fromTo(
                    titleLines,
                    {
                        opacity: 0,
                        yPercent: 100,
                        rotateX: -25,
                    },
                    {
                        opacity: 1,
                        yPercent: 0,
                        rotateX: 0,
                        duration: 1.1,
                        stagger: 0.12,
                        ease: 'power4.out',
                    },
                    '-=0.45',
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
                        ease: 'power3.out',
                    },
                    '-=0.6',
                )
                .fromTo(
                    cards,
                    {
                        opacity: 0,
                        y: 60,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.08,
                        ease: 'power4.out',
                    },
                    '-=0.35',
                );

            const getHorizontalDistance = () =>
                Math.max(track.scrollWidth - section.clientWidth, 0);

            gsap.to(track, {
                x: () => -getHorizontalDistance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                },
            });

            gsap.to(images, {
                xPercent: -8,
                scale: 1.08,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2,
                },
            });

            gsap.to(backgroundWord, {
                xPercent: -18,
                yPercent: -8,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2.5,
                },
            });
        },
        {
            scope: sectionRef,
        },
    );

    return (
        <section ref={sectionRef} className="gallery-section" id="gallery">
            <div
                ref={backgroundWordRef}
                className="gallery-section__background-word"
                aria-hidden="true"
            >
                GALLERY
            </div>

            <div ref={headerRef} className="gallery-section__header container">
                <div className="gallery-section__eyebrow-row">
                    <p className="gallery-section__eyebrow eyebrow">
                        06 — The Space
                    </p>

                    <span className="gallery-section__counter">05 / 05</span>
                </div>

                <div className="gallery-section__heading">
                    <h2
                        ref={titleRef}
                        className="gallery-section__title display-title"
                    >
                        <span className="gallery-section__title-mask">
                            <span className="gallery-section__title-line">
                                A room
                            </span>
                        </span>

                        <span className="gallery-section__title-mask">
                            <span className="gallery-section__title-line gallery-section__title-line--offset">
                                in motion.
                            </span>
                        </span>
                    </h2>

                    <p
                        ref={descriptionRef}
                        className="gallery-section__description"
                    >
                        Light, texture and silence come together to create a
                        space where every evening feels different.
                    </p>
                </div>
            </div>

            <div className="gallery-section__stage">
                <div ref={trackRef} className="gallery-section__track">
                    {galleryItems.map((item, index) => (
                        <article
                            key={item.id}
                            className={`gallery-section__card gallery-section__card--${item.size}`}
                        >
                            <div className="gallery-section__image-wrap">
                                <img
                                    className="gallery-section__image"
                                    src={item.image}
                                    alt={item.alt}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                />

                                <span className="gallery-section__card-number">
                                    0{item.id}
                                </span>
                            </div>
                        </article>
                    ))}

                    <div className="gallery-section__end">
                        <span className="gallery-section__end-line" />
                        <span>NOIRÉ</span>
                        <span className="gallery-section__end-line" />
                    </div>
                </div>
            </div>

            <div className="gallery-section__bottom container">
                <span>Scroll to explore</span>
                <span className="gallery-section__bottom-line" />
                <span>Paris · Copenhagen · Tokyo</span>
            </div>
        </section>
    );
}
