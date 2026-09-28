import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './HeroSection.scss';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const eyebrowRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLSpanElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const background = backgroundRef.current;
            const content = contentRef.current;
            const eyebrow = eyebrowRef.current;
            const title = titleRef.current;
            const description = descriptionRef.current;
            const scroll = scrollRef.current;
            const number = numberRef.current;
            const glow = glowRef.current;

            if (
                !section ||
                !background ||
                !content ||
                !eyebrow ||
                !title ||
                !description ||
                !scroll ||
                !number ||
                !glow
            ) {
                return;
            }

            const reducedMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)',
            );

            const titleLines =
                title.querySelectorAll<HTMLElement>('.hero__title-line');

            if (reducedMotion.matches) {
                gsap.set(
                    [
                        background,
                        content,
                        eyebrow,
                        titleLines,
                        description,
                        scroll,
                        number,
                        glow,
                    ],
                    {
                        clearProps: 'all',
                    },
                );

                return;
            }

            /*
             * INTRO
             *
             * Эта анимация отвечает только за
             * первое появление Hero.
             *
             * Важно:
             * последующие ScrollTrigger-анимации
             * не должны конфликтовать с opacity
             * до завершения intro.
             */
            const introTimeline = gsap.timeline({
                defaults: {
                    ease: 'power3.out',
                },
            });

            introTimeline
                .fromTo(
                    background,
                    {
                        scale: 1.14,
                        opacity: 0,
                    },
                    {
                        scale: 1.06,
                        opacity: 1,
                        duration: 2.2,
                        ease: 'power2.out',
                    },
                )
                .fromTo(
                    glow,
                    {
                        opacity: 0,
                        scale: 1.2,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1.8,
                        ease: 'power2.out',
                    },
                    '-=1.7',
                )
                .fromTo(
                    eyebrow,
                    {
                        opacity: 0,
                        y: 28,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.85,
                    },
                    '-=1.25',
                )
                .fromTo(
                    titleLines,
                    {
                        opacity: 0,
                        yPercent: 115,
                        rotateX: -25,
                    },
                    {
                        opacity: 1,
                        yPercent: 0,
                        rotateX: 0,
                        duration: 1.15,
                        stagger: 0.1,
                        ease: 'power4.out',
                    },
                    '-=0.55',
                )
                .fromTo(
                    description,
                    {
                        opacity: 0,
                        y: 24,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                    },
                    '-=0.45',
                )
                .fromTo(
                    scroll,
                    {
                        opacity: 0,
                        y: 18,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                    },
                    '-=0.25',
                )
                .fromTo(
                    number,
                    {
                        opacity: 0,
                        x: -20,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.7,
                    },
                    '-=0.5',
                );

            /*
             * BACKGROUND PARALLAX
             */
            gsap.to(background, {
                yPercent: 14,
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

            /*
             * LIGHT PARALLAX
             */
            gsap.to(glow, {
                yPercent: -18,
                xPercent: 8,
                scale: 1.08,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 2,
                    invalidateOnRefresh: true,
                },
            });

            /*
             * CONTENT PARALLAX
             *
             * Здесь больше НЕТ opacity.
             *
             * Это принципиально:
             * пользователь может начать скроллить
             * сразу после открытия страницы,
             * и intro-анимация всё равно сможет
             * показать текст.
             */
            gsap.to(content, {
                yPercent: -16,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '75% top',
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                },
            });

            /*
             * CONTENT FADE OUT
             *
             * Исчезновение запускается отдельно
             * и только после того, как пользователь
             * уже начал покидать Hero.
             *
             * Благодаря start: '18% top'
             * мгновенный скролл после загрузки
             * не убивает intro-анимацию.
             */
            gsap.fromTo(
                content,
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: '18% top',
                        end: '75% top',
                        scrub: 1.2,
                        invalidateOnRefresh: true,
                    },
                },
            );

            /*
             * NUMBER MOVES IN OPPOSITE DIRECTION
             */
            gsap.to(number, {
                yPercent: 70,
                xPercent: 20,
                opacity: 0.35,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 2.2,
                    invalidateOnRefresh: true,
                },
            });

            /*
             * SCROLL INDICATOR
             */
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

            /*
             * SUBTLE TITLE PARALLAX
             */
            gsap.to(titleLines, {
                yPercent: -7,
                stagger: 0.04,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 2,
                    invalidateOnRefresh: true,
                },
            });

            /*
             * После загрузки страницы убеждаемся,
             * что ScrollTrigger знает актуальные
             * размеры Hero.
             */
            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });

            return () => {
                introTimeline.kill();
            };
        },
        {
            scope: sectionRef,
        },
    );

    return (
        <section ref={sectionRef} className="hero">
            <div
                ref={backgroundRef}
                className="hero__background"
                data-cursor="view"
            />

            <div className="hero__overlay" />

            <div ref={glowRef} className="hero__glow" aria-hidden="true" />

            <span ref={numberRef} className="hero__number" aria-hidden="true">
                01
            </span>

            <div ref={contentRef} className="hero__content container">
                <p ref={eyebrowRef} className="hero__eyebrow">
                    Modern European Cuisine
                </p>

                <h1 ref={titleRef} className="hero__title display-title">
                    <span className="hero__title-mask">
                        <span className="hero__title-line">Modern</span>
                    </span>

                    <span className="hero__title-mask">
                        <span className="hero__title-line hero__title-line--offset">
                            Fine
                        </span>
                    </span>

                    <span className="hero__title-mask">
                        <span className="hero__title-line hero__title-line--offset-small">
                            Dining
                        </span>
                    </span>
                </h1>

                <p ref={descriptionRef} className="hero__description">
                    A table beyond ordinary.
                </p>
            </div>

            <div ref={scrollRef} className="hero__scroll">
                <span>Scroll to discover</span>

                <span className="hero__scroll-line" aria-hidden="true" />
            </div>

            <div className="hero__bottom-label" aria-hidden="true">
                <span>Paris</span>
                <span>48°51′24″ N</span>
            </div>
        </section>
    );
}
