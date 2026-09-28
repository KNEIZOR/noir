import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { galleryItems } from '@/entities/gallery/model/galleryData';
import { LazyImage } from '@/shared/ui/LazyImage/LazyImage';

import './GallerySection.scss';

gsap.registerPlugin(ScrollTrigger);

export function GallerySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const track = trackRef.current;

            if (!section || !track) {
                return;
            }

            const media = window.matchMedia('(prefers-reduced-motion: reduce)');

            if (media.matches) {
                return;
            }

            const getDistance = () =>
                Math.max(0, track.scrollWidth - window.innerWidth);

            const getScrollDistance = () =>
                getDistance() * 1.15 + window.innerHeight;

            const horizontalTween = gsap.to(track, {
                x: () => -getDistance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${getScrollDistance()}`,
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });

            const items = gsap.utils.toArray<HTMLElement>(
                '.gallery-card',
                track,
            );

            items.forEach((item) => {
                const speed = Number(item.dataset.speed ?? 1);

                const image = item.querySelector<HTMLElement>(
                    '.gallery-card__image img',
                );

                if (!image) {
                    return;
                }

                gsap.to(image, {
                    x: () => `${(speed - 1) * -140}px`,
                    scale: 1.08,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: () => `+=${getScrollDistance()}`,
                        scrub: 1.2,
                        invalidateOnRefresh: true,
                    },
                });
            });

            gsap.fromTo(
                '.gallery-section__eyebrow',
                {
                    opacity: 0,
                    y: 30,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                        end: 'top 40%',
                        scrub: 1,
                    },
                },
            );

            gsap.fromTo(
                '.gallery-section__title',
                {
                    opacity: 0,
                    y: 80,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 70%',
                        end: 'top 35%',
                        scrub: 1,
                    },
                },
            );

            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });

            return () => {
                horizontalTween.scrollTrigger?.kill();
                horizontalTween.kill();
            };
        },
        {
            scope: sectionRef,
        },
    );

    return (
        <section ref={sectionRef} className="gallery-section" id="gallery">
            <div className="gallery-section__intro container">
                <p className="gallery-section__eyebrow">06 — The gallery</p>

                <h2 className="gallery-section__title display-title">
                    A room
                    <br />
                    <em>in motion.</em>
                </h2>

                <p className="gallery-section__hint">Scroll to explore</p>
            </div>

            <div ref={trackRef} className="gallery-section__track">
                {galleryItems.map((item) => (
                    <Link
                        key={item.id}
                        to={`/gallery/${item.slug}`}
                        className={`gallery-card gallery-card--${item.size}`}
                        data-speed={item.speed}
                        data-cursor="view"
                        style={{
                            ['--card-rotate' as string]: `${item.rotate}deg`,
                        }}
                    >
                        <span className="gallery-card__number">
                            {String(item.id).padStart(2, '0')}
                        </span>

                        <div className="gallery-card__image">
                            <LazyImage src={item.image} alt={item.alt} />

                            <span
                                className="gallery-card__view"
                                aria-hidden="true"
                            >
                                View
                                <span>↗</span>
                            </span>
                        </div>

                        <div className="gallery-card__caption">
                            <span>{item.title}</span>

                            <span>{String(item.id).padStart(2, '0')} / 06</span>
                        </div>
                    </Link>
                ))}
            </div>

            <div
                className="gallery-section__background-word"
                aria-hidden="true"
            >
                NOIRÉ
            </div>
        </section>
    );
}
