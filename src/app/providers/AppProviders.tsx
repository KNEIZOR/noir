import type { PropsWithChildren } from 'react';

import { CustomCursor } from '@/widgets/custom-cursor/CustomCursor';
import { SmoothScroll } from '@/widgets/smooth-scroll/SmoothScroll';

export function AppProviders({ children }: PropsWithChildren) {
    return (
        <>
            <SmoothScroll />
            <CustomCursor />

            {children}
        </>
    );
}
