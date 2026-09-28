import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { MenuItem } from '@/entities/menu/model/menuData';

import './MenuItemHero.scss';

gsap.registerPlugin(ScrollTrigger);

type MenuItemHeroProps = {
    item: MenuItem;
};

export function MenuItemHero({ item }: MenuItemHeroProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const metaRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const image = imageRef.current;
            const content = contentRef.current;
            const category = categoryRef.current;
            const title = titleRef.current;
            const description = descriptionRef.current;
            const meta = metaRef.current;
            const number = numberRef.current;

            if (
                !section ||
                !image ||
                !content ||
                !category ||
                !title ||
                !description ||
                !meta ||
                !number
            ) {
                return;
            }

            const reduceMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)',
            ).matches;

            if (reduceMotion) {
                gsap.set(
                    [
                        image,
                        content,
                        category,
                        title,
                        description,
                        meta,
                        number,
                    ],
                    {
                        clearProps: 'all',
                    },
                );

                return;
            }

            const titleLines = title.querySelectorAll(
                '.menu-item-hero__title-line',
            );

            const intro = gsap.timeline({
                defaults: {
                    ease: 'power4.out',
                },
            });

            intro
                .fromTo(
                    image,
                    {
                        scale: 1.16,
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
                    titleLines,
                    {
                        opacity: 0,
                        yPercent: 110,
                        rotateX: -20,
                    },
                    {
                        opacity: 1,
                        yPercent: 0,
                        rotateX: 0,
                        duration: 1,
                        stagger: 0.1,
                    },
                    '-=0.45',
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
                        duration: 0.7,
                    },
                    '-=0.45',
                )
                .fromTo(
                    meta,
                    {
                        opacity: 0,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                    },
                    '-=0.4',
                );

            gsap.to(image, {
                yPercent: 10,
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
        <section ref={sectionRef} className="menu-item-hero">
            <div className="menu-item-hero__image-frame">
                <img
                    ref={imageRef}
                    className="menu-item-hero__image"
                    src={item.image}
                    alt={item.name}
                />
            </div>

            <div className="menu-item-hero__overlay" />

            <span
                ref={numberRef}
                className="menu-item-hero__number"
                aria-hidden="true"
            >
                {item.number}
            </span>

            <div ref={contentRef} className="menu-item-hero__content container">
                <div className="menu-item-hero__main">
                    <p
                        ref={categoryRef}
                        className="menu-item-hero__category eyebrow"
                    >
                        {item.category}
                    </p>

                    <h1
                        ref={titleRef}
                        className="menu-item-hero__title display-title"
                    >
                        <span className="menu-item-hero__title-mask">
                            <span className="menu-item-hero__title-line">
                                {item.name}
                            </span>
                        </span>
                    </h1>

                    <p
                        ref={descriptionRef}
                        className="menu-item-hero__description"
                    >
                        {item.description}
                    </p>
                </div>

                <div ref={metaRef} className="menu-item-hero__meta">
                    <span className="menu-item-hero__price">€{item.price}</span>

                    <span className="menu-item-hero__meta-label">
                        Seasonal selection
                    </span>
                </div>
            </div>

            <div className="menu-item-hero__scroll">
                <span>Discover the dish</span>

                <span
                    className="menu-item-hero__scroll-line"
                    aria-hidden="true"
                />
            </div>
        </section>
    );
}
