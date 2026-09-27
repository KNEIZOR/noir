import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(scope: React.RefObject<HTMLElement | null>) {
    useGSAP(
        () => {
            if (!scope.current) {
                return;
            }

            gsap.from(scope.current, {
                opacity: 0,
                y: 80,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: scope.current,
                    start: 'top 80%',
                    once: true,
                },
            });
        },
        {
            scope,
        },
    );
}
