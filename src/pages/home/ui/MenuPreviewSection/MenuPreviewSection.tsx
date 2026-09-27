import { useRef, useState } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './MenuPreviewSection.scss';

gsap.registerPlugin(ScrollTrigger);

type MenuItem = {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
};

const menuItems: MenuItem[] = [
    {
        id: 1,
        name: 'Cured Salmon',
        description: 'Fennel · Citrus · Dill oil',
        price: '24',
        image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=1200&q=90',
    },
    {
        id: 2,
        name: 'Charred Octopus',
        description: 'Black garlic · Smoked lemon · Wild herbs',
        price: '32',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=90',
    },
    {
        id: 3,
        name: 'Wild Mushroom',
        description: 'Truffle · Hazelnut · Brown butter',
        price: '26',
        image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=1200&q=90',
    },
    {
        id: 4,
        name: 'Duck Confit',
        description: 'Pear · Juniper · Red wine jus',
        price: '34',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=90',
    },
];

export function MenuPreviewSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const eyebrowRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const imageFrameRef = useRef<HTMLDivElement>(null);
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

            const intro = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 72%',
                    end: 'top 30%',
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
                    title,
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
                    '-=0.4',
                )
                .fromTo(
                    imageFrame,
                    {
                        clipPath: 'inset(8% 8% 8% 8%)',
                        opacity: 0,
                    },
                    {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        opacity: 1,
                        duration: 1.2,
                        ease: 'power4.inOut',
                    },
                    '-=0.6',
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
                    '-=0.65',
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
        },
        {
            scope: sectionRef,
        },
    );

    const handleItemEnter = (item: MenuItem) => {
        if (item.id === activeItem.id) {
            return;
        }

        const image = imageRef.current;

        if (!image) {
            setActiveItem(item);
            return;
        }

        gsap.to(image, {
            opacity: 0,
            scale: 1.04,
            duration: 0.22,
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
                        A taste of
                        <span>NOIRÉ</span>
                    </h2>
                </header>

                <div className="menu-preview__content">
                    <div ref={listRef} className="menu-preview__list">
                        {menuItems.map((item) => {
                            const isActive = item.id === activeItem.id;

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    className={`menu-preview__item ${
                                        isActive
                                            ? 'menu-preview__item--active'
                                            : ''
                                    }`}
                                    onMouseEnter={() => handleItemEnter(item)}
                                    onFocus={() => handleItemEnter(item)}
                                    onClick={() => handleItemEnter(item)}
                                >
                                    <span className="menu-preview__item-main">
                                        <span className="menu-preview__item-number">
                                            {String(item.id).padStart(2, '0')}
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
                                </button>
                            );
                        })}
                    </div>

                    <div className="menu-preview__visual">
                        <div
                            ref={imageFrameRef}
                            className="menu-preview__image-frame"
                        >
                            <img
                                ref={imageRef}
                                className="menu-preview__image"
                                src={activeItem.image}
                                alt={activeItem.name}
                            />

                            <div className="menu-preview__image-overlay" />

                            <span className="menu-preview__image-label">
                                {activeItem.name}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="menu-preview__footer">
                    <span>Seasonal selection</span>

                    <span className="menu-preview__footer-line" />

                    <span>View full menu</span>
                </div>
            </div>
        </section>
    );
}
