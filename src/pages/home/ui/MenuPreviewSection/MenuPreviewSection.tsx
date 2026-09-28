import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { allMenuItems, type MenuItem } from '@/entities/menu/model/menuData';
import { LazyImage } from '@/shared/ui/LazyImage/LazyImage';

import './MenuPreviewSection.scss';

gsap.registerPlugin(ScrollTrigger);

const menuItems = allMenuItems.slice(0, 4);

export function MenuPreviewSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const eyebrowRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const imageFrameRef = useRef<HTMLAnchorElement>(null);
    const backgroundWordRef = useRef<HTMLDivElement>(null);

    const [activeItem, setActiveItem] = useState<MenuItem>(menuItems[0]);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const eyebrow = eyebrowRef.current;
            const title = titleRef.current;
            const list = listRef.current;
            const imageFrame = imageFrameRef.current;
            const backgroundWord = backgroundWordRef.current;

            if (
                !section ||
                !eyebrow ||
                !title ||
                !list ||
                !imageFrame ||
                !backgroundWord
            ) {
                return;
            }

            const items = list.querySelectorAll('.menu-preview__item');

            const titleLines = title.querySelectorAll(
                '.menu-preview__title-line',
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
                    eyebrow,
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
                        stagger: 0.12,
                        ease: 'power4.out',
                    },
                    '-=0.4',
                )
                .fromTo(
                    imageFrame,
                    {
                        clipPath: 'inset(8% 8% 8% 8%)',
                        opacity: 0,
                        y: 30,
                    },
                    {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: 'power4.inOut',
                    },
                    '-=0.55',
                )
                .fromTo(
                    items,
                    {
                        opacity: 0,
                        x: -30,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: 'power3.out',
                    },
                    '-=0.7',
                );

            gsap.to(backgroundWord, {
                xPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2,
                },
            });

            const image = imageRef.current;

            if (image) {
                gsap.fromTo(
                    image,
                    {
                        scale: 1.08,
                    },
                    {
                        scale: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1.5,
                        },
                    },
                );
            }
        },
        {
            scope: sectionRef,
        },
    );

    const handleItemEnter = (item: MenuItem) => {
        if (item.slug === activeItem.slug) {
            return;
        }

        const image = imageRef.current;

        if (!image) {
            setActiveItem(item);
            return;
        }

        gsap.killTweensOf(image);

        gsap.to(image, {
            opacity: 0,
            scale: 1.04,
            duration: 0.2,
            ease: 'power2.out',
            onComplete: () => {
                setActiveItem(item);

                gsap.fromTo(
                    image,
                    {
                        opacity: 0,
                        scale: 1.04,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.65,
                        ease: 'power3.out',
                    },
                );
            },
        });
    };

    return (
        <section ref={sectionRef} className="menu-preview" id="menu">
            <div
                ref={backgroundWordRef}
                className="menu-preview__background-word"
                aria-hidden="true"
            >
                MENU
            </div>

            <div className="menu-preview__container container">
                <header className="menu-preview__header">
                    <p
                        ref={eyebrowRef}
                        className="menu-preview__eyebrow eyebrow"
                    >
                        03 — Menu
                    </p>

                    <h2
                        ref={titleRef}
                        className="menu-preview__title display-title"
                    >
                        <span className="menu-preview__title-line">
                            A taste of
                        </span>

                        <span className="menu-preview__title-line menu-preview__title-line--gold">
                            NOIRÉ
                        </span>
                    </h2>
                </header>

                <div className="menu-preview__content">
                    <div ref={listRef} className="menu-preview__list">
                        {menuItems.map((item) => {
                            const isActive = item.slug === activeItem.slug;

                            return (
                                <Link
                                    key={item.slug}
                                    to={`/menu/${item.slug}`}
                                    className={`menu-preview__item ${
                                        isActive
                                            ? 'menu-preview__item--active'
                                            : ''
                                    }`}
                                    data-cursor="arrow"
                                    onMouseEnter={() => handleItemEnter(item)}
                                    onFocus={() => handleItemEnter(item)}
                                >
                                    <span className="menu-preview__item-main">
                                        <span className="menu-preview__item-number">
                                            {item.number}
                                        </span>

                                        <span className="menu-preview__item-info">
                                            <span className="menu-preview__item-name">
                                                {item.name}
                                            </span>

                                            <span className="menu-preview__item-description">
                                                {item.description}
                                            </span>
                                        </span>
                                    </span>

                                    <span className="menu-preview__item-price">
                                        €{item.price}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="menu-preview__visual">
                        <Link
                            ref={imageFrameRef}
                            to={`/menu/${activeItem.slug}`}
                            className="menu-preview__image-frame"
                            data-cursor="view"
                        >
                            <LazyImage
                                ref={imageRef}
                                className="menu-preview__image"
                                src={activeItem.image}
                                alt={activeItem.name}
                            />

                            <div className="menu-preview__image-overlay" />

                            <div className="menu-preview__image-meta">
                                <span className="menu-preview__image-number">
                                    {activeItem.number}
                                </span>

                                <span className="menu-preview__image-label">
                                    {activeItem.name}
                                </span>

                                <span
                                    className="menu-preview__image-arrow"
                                    aria-hidden="true"
                                >
                                    ↗
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="menu-preview__footer">
                    <span>Seasonal selection</span>

                    <span
                        className="menu-preview__footer-line"
                        aria-hidden="true"
                    />

                    <Link
                        className="menu-preview__full-menu"
                        to="/menu"
                        data-cursor="arrow"
                    >
                        <span>View full menu</span>

                        <span
                            className="menu-preview__full-menu-arrow"
                            aria-hidden="true"
                        >
                            ↗
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
