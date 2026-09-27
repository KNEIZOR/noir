import {
    forwardRef,
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type PropsWithChildren,
    type Ref,
    useImperativeHandle,
    useRef,
} from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import './MagneticButton.scss';

type MagneticProps = PropsWithChildren<{
    strength?: number;
    className?: string;
}>;

type MagneticButtonProps = MagneticProps &
    ButtonHTMLAttributes<HTMLButtonElement>;

type MagneticLinkProps = MagneticProps &
    AnchorHTMLAttributes<HTMLAnchorElement>;

function useMagnetic(
    strength: number,
    wrapperRef: React.RefObject<HTMLDivElement | null>,
) {
    useGSAP(
        () => {
            const wrapper = wrapperRef.current;

            if (!wrapper) {
                return;
            }

            const hoverQuery = window.matchMedia(
                '(hover: hover) and (pointer: fine)',
            );

            const reducedMotionQuery = window.matchMedia(
                '(prefers-reduced-motion: reduce)',
            );

            if (!hoverQuery.matches || reducedMotionQuery.matches) {
                return;
            }

            const handlePointerMove = (event: PointerEvent) => {
                const rect = wrapper.getBoundingClientRect();

                const centerX = rect.left + rect.width / 2;

                const centerY = rect.top + rect.height / 2;

                const x = (event.clientX - centerX) * strength;

                const y = (event.clientY - centerY) * strength;

                gsap.to(wrapper, {
                    x,
                    y,
                    duration: 0.6,
                    ease: 'power3.out',
                    overwrite: true,
                });
            };

            const handlePointerLeave = () => {
                gsap.to(wrapper, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.35)',
                    overwrite: true,
                });
            };

            wrapper.addEventListener('pointermove', handlePointerMove);

            wrapper.addEventListener('pointerleave', handlePointerLeave);

            return () => {
                wrapper.removeEventListener('pointermove', handlePointerMove);

                wrapper.removeEventListener('pointerleave', handlePointerLeave);

                gsap.killTweensOf(wrapper);
            };
        },
        {
            scope: wrapperRef,
        },
    );
}

function useForwardedRef<T>(
    forwardedRef: Ref<T>,
    internalRef: React.RefObject<T | null>,
) {
    useImperativeHandle(forwardedRef, () => internalRef.current as T, [
        internalRef,
    ]);
}

export const MagneticButton = forwardRef<HTMLDivElement, MagneticButtonProps>(
    function MagneticButton(
        { children, strength = 0.18, className = '', type, ...props },
        forwardedRef,
    ) {
        const internalRef = useRef<HTMLDivElement>(null);

        useForwardedRef(forwardedRef, internalRef);

        useMagnetic(strength, internalRef);

        return (
            <div ref={internalRef} className={`magnetic ${className}`.trim()}>
                <button {...props} type={type ?? 'button'} data-cursor="arrow">
                    {children}
                </button>
            </div>
        );
    },
);

MagneticButton.displayName = 'MagneticButton';

export const MagneticLink = forwardRef<HTMLDivElement, MagneticLinkProps>(
    function MagneticLink(
        { children, strength = 0.18, className = '', ...props },
        forwardedRef,
    ) {
        const internalRef = useRef<HTMLDivElement>(null);

        useForwardedRef(forwardedRef, internalRef);

        useMagnetic(strength, internalRef);

        return (
            <div ref={internalRef} className={`magnetic ${className}`.trim()}>
                <a {...props} data-cursor="arrow">
                    {children}
                </a>
            </div>
        );
    },
);

MagneticLink.displayName = 'MagneticLink';
