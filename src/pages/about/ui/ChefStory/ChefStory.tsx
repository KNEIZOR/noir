import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ChefStory.scss';

gsap.registerPlugin(ScrollTrigger);

export function ChefStory() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const image = imageRef.current;
            const content = contentRef.current;

            if (!section || !image || !content) {
                return;
            }

            gsap.to(image, {
                yPercent: -9,
                scale: 1.06,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.6,
                },
            });

            gsap.fromTo(
                content.children,
                {
                    opacity: 0,
                    y: 40,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    stagger: 0.13,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: content,
                        start: 'top 72%',
                    },
                },
            );
        },
        {
            scope: sectionRef,
        },
    );

    return (
        <section ref={sectionRef} className="chef-story">
            <div className="container chef-story__grid">
                <div className="chef-story__content" ref={contentRef}>
                    <p className="eyebrow">04 — The chef</p>

                    <h2 className="section-title">
                        Nicolas <em>Moreau</em>
                    </h2>

                    <p className="chef-story__role">Founder & Executive Chef</p>

                    <p className="chef-story__text">
                        Nicolas Moreau spent years moving between the kitchens
                        of Paris, Copenhagen, and the Mediterranean before
                        opening NOIRÉ.
                    </p>

                    <p className="chef-story__text">
                        His cooking combines classical French technique with a
                        fascination for smoke, fermentation, and unexpected
                        textures.
                    </p>

                    <blockquote className="chef-story__quote">
                        “The best dishes are the ones that leave you wanting to
                        remember them.”
                    </blockquote>
                </div>

                <div className="chef-story__visual">
                    <div ref={imageRef} className="chef-story__image" />

                    <span className="chef-story__image-number">04</span>
                </div>
            </div>
        </section>
    );
}
