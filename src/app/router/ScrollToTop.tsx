import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SCROLL_TOP_EVENT = 'noire:scroll-top';

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });

        window.dispatchEvent(new CustomEvent(SCROLL_TOP_EVENT));
    }, [pathname]);

    return null;
}
