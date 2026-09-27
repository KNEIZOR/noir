import { useEffect } from 'react';

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

        gsap.ticker.add(update);
        lenis.on('scroll', handleScroll);

        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
            lenis.off('scroll', handleScroll);
            lenis.destroy();
        };
    }, []);

    return null;
}
