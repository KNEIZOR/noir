import { useEffect } from 'react';

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SCROLL_TOP_EVENT = 'noire:scroll-top';

export function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: false,
            smoothWheel: true,
            lerp: 0.08,
        });

        const update = (time: number) => {
            lenis.raf(time * 1000);
        };

        const handleScroll = () => {
            ScrollTrigger.update();
        };

        const handleScrollTop = () => {
            lenis.scrollTo(0, {
                immediate: true,
            });

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant',
            });
        };

        gsap.ticker.add(update);
        lenis.on('scroll', handleScroll);

        window.addEventListener(SCROLL_TOP_EVENT, handleScrollTop);

        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
            lenis.off('scroll', handleScroll);
            window.removeEventListener(SCROLL_TOP_EVENT, handleScrollTop);

            lenis.destroy();
        };
    }, []);

    return null;
}
