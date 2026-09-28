import { useEffect, useRef } from 'react';

import gsap from 'gsap';

import './CustomCursor.scss';

type CursorMode = 'default' | 'link' | 'view' | 'arrow';

const CURSOR_SELECTOR = 'a, button, [data-cursor], input, textarea, select';

const INITIAL_POSITION = -100;

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    const positionRef = useRef({
        x: INITIAL_POSITION,
        y: INITIAL_POSITION,
    });

    const targetPositionRef = useRef({
        x: INITIAL_POSITION,
        y: INITIAL_POSITION,
    });

    const modeRef = useRef<CursorMode>('default');
    const isPointerActiveRef = useRef(false);
    const hasPointerPositionRef = useRef(false);

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
        let isDisposed = false;

        const current = positionRef.current;
        const target = targetPositionRef.current;

        const setCursorPosition = (x: number, y: number, immediate = false) => {
            target.x = x;
            target.y = y;

            if (immediate) {
                current.x = x;
                current.y = y;

                gsap.set(cursor, {
                    x,
                    y,
                });
            }
        };

        const showCursor = (immediate = false) => {
            if (!hasPointerPositionRef.current) {
                return;
            }

            isPointerActiveRef.current = true;

            gsap.killTweensOf(cursor, 'opacity');

            if (immediate) {
                gsap.set(cursor, {
                    opacity: 1,
                });

                return;
            }

            gsap.to(cursor, {
                opacity: 1,
                duration: 0.2,
                ease: 'power2.out',
                overwrite: true,
            });
        };

        const hideCursor = () => {
            isPointerActiveRef.current = false;

            gsap.killTweensOf(cursor, 'opacity');

            gsap.to(cursor, {
                opacity: 0,
                duration: 0.15,
                ease: 'power2.out',
                overwrite: true,
            });
        };

        const render = () => {
            if (isDisposed) {
                return;
            }

            current.x += (target.x - current.x) * 0.2;
            current.y += (target.y - current.y) * 0.2;

            gsap.set(cursor, {
                x: current.x,
                y: current.y,
            });

            animationFrame = requestAnimationFrame(render);
        };

        const setMode = (mode: CursorMode, customLabel?: string) => {
            const nextLabel = customLabel ?? getDefaultLabel(mode);

            const modeChanged = modeRef.current !== mode;
            const labelChanged = label.textContent !== nextLabel;

            if (!modeChanged && !labelChanged) {
                return;
            }

            modeRef.current = mode;

            cursor.dataset.mode = mode;
            label.textContent = nextLabel;

            gsap.killTweensOf(cursor, 'scale');

            gsap.to(cursor, {
                scale: mode === 'default' ? 1 : 1.45,
                duration: mode === 'default' ? 0.3 : 0.4,
                ease: 'power3.out',
                overwrite: true,
            });
        };

        const handlePointerMove = (event: PointerEvent) => {
            if (event.pointerType === 'touch') {
                return;
            }

            const { clientX, clientY } = event;

            if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) {
                return;
            }

            const isFirstPointerMove = !hasPointerPositionRef.current;

            hasPointerPositionRef.current = true;

            setCursorPosition(clientX, clientY, isFirstPointerMove);

            if (isFirstPointerMove) {
                showCursor(true);
            } else if (!isPointerActiveRef.current) {
                showCursor();
            }
        };

        const handlePointerOver = (event: PointerEvent) => {
            if (!hasPointerPositionRef.current) {
                return;
            }

            const targetElement = event.target;

            if (!(targetElement instanceof Element)) {
                return;
            }

            const interactiveElement = targetElement.closest(CURSOR_SELECTOR);

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
            hideCursor();
            setMode('default');
        };

        const handlePointerEnter = (event: PointerEvent) => {
            if (event.pointerType === 'touch') {
                return;
            }

            if (
                Number.isFinite(event.clientX) &&
                Number.isFinite(event.clientY)
            ) {
                const hasPosition = hasPointerPositionRef.current;

                hasPointerPositionRef.current = true;

                setCursorPosition(event.clientX, event.clientY, !hasPosition);
            }

            if (hasPointerPositionRef.current) {
                showCursor(true);
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                hideCursor();
                return;
            }

            if (hasPointerPositionRef.current) {
                showCursor(true);
            }
        };

        const handleWindowBlur = () => {
            hideCursor();
        };

        const handleWindowFocus = () => {
            if (hasPointerPositionRef.current) {
                showCursor(true);
            }
        };

        gsap.set(cursor, {
            x: INITIAL_POSITION,
            y: INITIAL_POSITION,
            opacity: 0,
            scale: 1,
        });

        animationFrame = requestAnimationFrame(render);

        window.addEventListener('pointermove', handlePointerMove, {
            passive: true,
        });

        document.addEventListener('pointerover', handlePointerOver);

        document.documentElement.addEventListener(
            'pointerleave',
            handlePointerLeave,
        );

        document.documentElement.addEventListener(
            'pointerenter',
            handlePointerEnter,
        );

        document.addEventListener('visibilitychange', handleVisibilityChange);

        window.addEventListener('blur', handleWindowBlur);

        window.addEventListener('focus', handleWindowFocus);

        requestAnimationFrame(() => {
            if (!isDisposed && hasPointerPositionRef.current) {
                showCursor(true);
            }
        });

        return () => {
            isDisposed = true;

            cancelAnimationFrame(animationFrame);

            gsap.killTweensOf(cursor);

            window.removeEventListener('pointermove', handlePointerMove);

            document.removeEventListener('pointerover', handlePointerOver);

            document.documentElement.removeEventListener(
                'pointerleave',
                handlePointerLeave,
            );

            document.documentElement.removeEventListener(
                'pointerenter',
                handlePointerEnter,
            );

            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange,
            );

            window.removeEventListener('blur', handleWindowBlur);

            window.removeEventListener('focus', handleWindowFocus);
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
