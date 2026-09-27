import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function useReveal(scope: React.RefObject<HTMLElement | null>) {
    useGSAP(
        () => {
            if (!scope.current) {
                return;
            }

            gsap.from(scope.current, {
                opacity: 0,
                y: 40,
                duration: 1,
                ease: 'power3.out',
            });
        },
        {
            scope,
        },
    );
}
