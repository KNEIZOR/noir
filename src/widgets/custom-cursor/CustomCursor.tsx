import { useEffect, useRef } from 'react';

import gsap from 'gsap';

import './CustomCursor.scss';

type CursorMode = 'default' | 'link' | 'view' | 'arrow';

const CURSOR_SELECTOR = 'a, button, [data-cursor], input, textarea, select';

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    const positionRef = useRef({
        x: -100,
        y: -100,
    });

    const targetPositionRef = useRef({
        x: -100,
        y: -100,
    });

    const modeRef = useRef<CursorMode>('default');

    useEffect(() => {
        const cursor = cursorRef.current;
        const label = labelRef.current;

        if (!cursor || !label) {
            return;
        }

        const mediaQuery = window.matchMedia(
            '(hover: hover) and (pointer: fine)',
        );

        const reducedMotionQuery = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        );

        if (!mediaQuery.matches || reducedMotionQuery.matches) {
            return;
        }

        let animationFrame = 0;

        const render = () => {
            const current = positionRef.current;
            const target = targetPositionRef.current;

            current.x += (target.x - current.x) * 0.18;
            current.y += (target.y - current.y) * 0.18;

            gsap.set(cursor, {
                x: current.x,
                y: current.y,
            });

            animationFrame = requestAnimationFrame(render);
        };

        const setMode = (mode: CursorMode, customLabel?: string) => {
            if (modeRef.current === mode && !customLabel) {
                return;
            }

            modeRef.current = mode;

            cursor.dataset.mode = mode;

            if (customLabel) {
                label.textContent = customLabel;
            } else {
                label.textContent = getDefaultLabel(mode);
            }

            if (mode === 'default') {
                gsap.to(cursor, {
                    scale: 1,
                    duration: 0.35,
                    ease: 'power3.out',
                });

                return;
            }

            gsap.to(cursor, {
                scale: 1.45,
                duration: 0.45,
                ease: 'power3.out',
            });
        };

        const handlePointerMove = (event: PointerEvent) => {
            targetPositionRef.current.x = event.clientX;
            targetPositionRef.current.y = event.clientY;
        };

        const handlePointerOver = (event: PointerEvent) => {
            const target = event.target;

            if (!(target instanceof Element)) {
                return;
            }

            const interactiveElement = target.closest(CURSOR_SELECTOR);

            if (!interactiveElement) {
                setMode('default');
                return;
            }

            const customMode = interactiveElement.getAttribute('data-cursor');

            const customLabel =
                interactiveElement.getAttribute('data-cursor-label');

            if (
                customMode === 'view' ||
                customMode === 'arrow' ||
                customMode === 'link'
            ) {
                setMode(customMode, customLabel ?? undefined);
                return;
            }

            if (interactiveElement.matches('button')) {
                setMode('arrow', customLabel ?? undefined);
                return;
            }

            if (interactiveElement.matches('input, textarea, select')) {
                setMode('default');
                return;
            }

            setMode('link', customLabel ?? undefined);
        };

        const handlePointerLeave = () => {
            setMode('default');

            gsap.to(cursor, {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.out',
            });
        };

        const handlePointerEnter = () => {
            gsap.to(cursor, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                gsap.to(cursor, {
                    opacity: 0,
                    duration: 0.15,
                });

                return;
            }

            gsap.to(cursor, {
                opacity: 1,
                duration: 0.25,
            });
        };

        window.addEventListener('pointermove', handlePointerMove, {
            passive: true,
        });

        document.addEventListener('pointerover', handlePointerOver);

        document.documentElement.addEventListener(
            'mouseleave',
            handlePointerLeave,
        );

        document.documentElement.addEventListener(
            'mouseenter',
            handlePointerEnter,
        );

        document.addEventListener('visibilitychange', handleVisibilityChange);

        animationFrame = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrame);

            window.removeEventListener('pointermove', handlePointerMove);

            document.removeEventListener('pointerover', handlePointerOver);

            document.documentElement.removeEventListener(
                'mouseleave',
                handlePointerLeave,
            );

            document.documentElement.removeEventListener(
                'mouseenter',
                handlePointerEnter,
            );

            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange,
            );
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="custom-cursor"
            data-mode="default"
            aria-hidden="true"
        >
            <span ref={labelRef} className="custom-cursor__label" />
        </div>
    );
}

function getDefaultLabel(mode: CursorMode) {
    switch (mode) {
        case 'view':
            return 'VIEW';

        case 'arrow':
            return '↗';

        case 'link':
            return '';

        default:
            return '';
    }
}
