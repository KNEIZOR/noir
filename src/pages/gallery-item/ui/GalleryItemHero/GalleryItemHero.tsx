import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { GalleryItem } from '@/entities/gallery/model/galleryData';

import './GalleryItemHero.scss';

gsap.registerPlugin(ScrollTrigger);

type GalleryItemHeroProps = {
    item: GalleryItem;
};

function getResponsiveImageSources(image: string) {
    const separator = image.includes('?') ? '&' : '?';

    return {
        srcSet: [
            `${image}${separator}w=640 640w`,
            `${image}${separator}w=1024 1024w`,
            `${image}${separator}w=1440 1440w`,
            `${image}${separator}w=1800 1800w`,
        ].join(', '),
        sizes: '100vw',
    };
}

export function GalleryItemHero({ item }: GalleryItemHeroProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const numberRef = useRef<HTMLSpanElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const responsiveImage = getResponsiveImageSources(item.image);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const image = imageRef.current;
            const content = contentRef.current;
            const category = categoryRef.current;
            const title = titleRef.current;
            const number = numberRef.current;
            const scroll = scrollRef.current;

            if (
                !section ||
                !image ||
                !content ||
                !category ||
                !title ||
                !number ||
                !scroll
            ) {
                return;
            }

            const reduceMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)',
            ).matches;

            if (reduceMotion) {
                gsap.set([image, content, category, title, number, scroll], {
                    clearProps: 'all',
                });

                return;
            }

            const intro = gsap.timeline({
                defaults: {
                    ease: 'power4.out',
                },
            });

            intro
                .fromTo(
                    image,
                    {
                        scale: 1.14,
                        opacity: 0,
                    },
                    {
                        scale: 1.04,
                        opacity: 1,
                        duration: 1.8,
                        ease: 'power3.out',
                    },
                )
                .fromTo(
                    category,
                    {
                        opacity: 0,
                        y: 25,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                    },
                    '-=1.1',
                )
                .fromTo(
                    title,
                    {
                        opacity: 0,
                        y: 80,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.1,
                        ease: 'power4.out',
                    },
                    '-=0.45',
                )
                .fromTo(
                    scroll,
                    {
                        opacity: 0,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                    },
                    '-=0.5',
                );

            gsap.to(image, {
                yPercent: 12,
                scale: 1.12,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.8,
                    invalidateOnRefresh: true,
                },
            });

            gsap.to(content, {
                yPercent: -12,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.8,
                    invalidateOnRefresh: true,
                },
            });

            gsap.to(number, {
                yPercent: 60,
                xPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 2,
                    invalidateOnRefresh: true,
                },
            });

            gsap.to(scroll, {
                y: 30,
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '28% top',
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                },
            });

            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });

            return () => {
                intro.kill();
            };
        },
        {
            scope: sectionRef,
        },
    );

    return (
        <section ref={sectionRef} className="gallery-item-hero">
            <div className="gallery-item-hero__image-frame">
                <img
                    ref={imageRef}
                    className="gallery-item-hero__image"
                    src={item.image}
                    srcSet={responsiveImage.srcSet}
                    sizes={responsiveImage.sizes}
                    alt={item.alt}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                />
            </div>

            <div className="gallery-item-hero__overlay" />

            <span
                ref={numberRef}
                className="gallery-item-hero__number"
                aria-hidden="true"
            >
                {String(item.id).padStart(2, '0')}
            </span>

            <div
                ref={contentRef}
                className="gallery-item-hero__content container"
            >
                <p
                    ref={categoryRef}
                    className="gallery-item-hero__category eyebrow"
                >
                    {item.category}
                </p>

                <h1
                    ref={titleRef}
                    className="gallery-item-hero__title display-title"
                >
                    {item.title}
                </h1>
            </div>

            <div ref={scrollRef} className="gallery-item-hero__scroll">
                <span>Discover</span>

                <span
                    className="gallery-item-hero__scroll-line"
                    aria-hidden="true"
                />
            </div>
        </section>
    );
}
