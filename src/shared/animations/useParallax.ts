import { useEffect } from 'react';
import type { RefObject } from 'react';

type ParallaxOptions = {
    defaultAmount?: number;
};

export function useParallax<T extends HTMLElement>(
    containerRef: RefObject<T | null>,
    options: ParallaxOptions = {},
) {
    const { defaultAmount = 0.05 } = options;

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        if (reducedMotion) {
            return;
        }

        const elements =
            container.querySelectorAll<HTMLElement>('[data-parallax]');

        if (!elements.length) {
            return;
        }

        let frameId = 0;

        const update = () => {
            const viewportHeight = window.innerHeight;

            elements.forEach((element) => {
                const rect = element.getBoundingClientRect();

                const amount =
                    Number(element.dataset.parallax) || defaultAmount;

                const xAmount = Number(element.dataset.parallaxX) || 0;

                const scaleAmount = Number(element.dataset.parallaxScale) || 0;

                const rotateAmount =
                    Number(element.dataset.parallaxRotate) || 0;

                const elementCenter = rect.top + rect.height / 2;

                const viewportCenter = viewportHeight / 2;

                const distance = elementCenter - viewportCenter;

                const progress = distance / viewportHeight;

                const y = progress * viewportHeight * amount;

                const x = progress * viewportHeight * xAmount;

                const scale = 1 - progress * scaleAmount;

                const rotate = progress * rotateAmount;

                element.style.setProperty('--parallax-x', `${x}px`);

                element.style.setProperty('--parallax-y', `${y}px`);

                element.style.setProperty('--parallax-scale', `${scale}`);

                element.style.setProperty('--parallax-rotate', `${rotate}deg`);
            });

            frameId = 0;
        };

        const requestUpdate = () => {
            if (frameId) {
                return;
            }

            frameId = requestAnimationFrame(update);
        };

        window.addEventListener('scroll', requestUpdate, {
            passive: true,
        });

        window.addEventListener('resize', requestUpdate);

        requestUpdate();

        return () => {
            window.removeEventListener('scroll', requestUpdate);

            window.removeEventListener('resize', requestUpdate);

            if (frameId) {
                cancelAnimationFrame(frameId);
            }
        };
    }, [containerRef, defaultAmount]);
}
