import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { MenuItem } from '@/entities/menu/model/menuData';

import './MenuCategory.scss';

gsap.registerPlugin(ScrollTrigger);

type MenuCategoryProps = {
    number: string;
    title: string;
    subtitle: string;
    items: MenuItem[];
};

export function MenuCategory({
    number,
    title,
    subtitle,
    items,
}: MenuCategoryProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const categoryTitle = titleRef.current;
            const categorySubtitle = subtitleRef.current;
            const list = listRef.current;
            const categoryNumber = numberRef.current;

            if (
                !section ||
                !categoryTitle ||
                !categorySubtitle ||
                !list ||
                !categoryNumber
            ) {
                return;
            }

            const itemsElements = list.querySelectorAll('.menu-category__item');

            const titleLine = categoryTitle.querySelector(
                '.menu-category__title-line',
            );

            if (!titleLine) {
                return;
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 72%',
                    end: 'top 25%',
                    toggleActions: 'play none none reverse',
                },
            });

            timeline
                .fromTo(
                    categoryNumber,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.7,
                        ease: 'power3.out',
                    },
                )
                .fromTo(
                    categorySubtitle,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: 'power3.out',
                    },
                    '-=0.5',
                )
                .fromTo(
                    titleLine,
                    { opacity: 0, yPercent: 100 },
                    {
                        opacity: 1,
                        yPercent: 0,
                        duration: 0.9,
                        ease: 'power4.out',
                    },
                    '-=0.55',
                )
                .fromTo(
                    itemsElements,
                    { opacity: 0, y: 35 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.65,
                        stagger: 0.08,
                        ease: 'power3.out',
                    },
                    '-=0.45',
                );

            gsap.to(categoryNumber, {
                yPercent: 50,
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
        <section ref={sectionRef} className="menu-category">
            <div className="menu-category__container container">
                <header className="menu-category__header">
                    <div className="menu-category__meta">
                        <span ref={numberRef} className="menu-category__number">
                            {number}
                        </span>

                        <p
                            ref={subtitleRef}
                            className="menu-category__subtitle"
                        >
                            {subtitle}
                        </p>
                    </div>

                    <h2
                        ref={titleRef}
                        className="menu-category__title display-title"
                    >
                        <span className="menu-category__title-mask">
                            <span className="menu-category__title-line">
                                {title}
                            </span>
                        </span>
                    </h2>
                </header>

                <div ref={listRef} className="menu-category__list">
                    {items.map((item) => (
                        <Link
                            key={item.slug}
                            to={`/menu/${item.slug}`}
                            className="menu-category__item"
                            data-cursor="arrow"
                        >
                            <span className="menu-category__item-index">
                                {item.number}
                            </span>

                            <span className="menu-category__item-content">
                                <span className="menu-category__item-name">
                                    {item.name}
                                </span>

                                <span className="menu-category__item-description">
                                    {item.description}
                                </span>
                            </span>

                            <span className="menu-category__item-price">
                                €{item.price}
                            </span>

                            <span
                                className="menu-category__item-arrow"
                                aria-hidden="true"
                            >
                                ↗
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
