import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ScrollToTop } from './ScrollToTop';

const HomePage = lazy(() =>
    import('@/pages/home/HomePage').then((module) => ({
        default: module.HomePage,
    })),
);

const AboutPage = lazy(() =>
    import('@/pages/about/AboutPage').then((module) => ({
        default: module.AboutPage,
    })),
);

const MenuPage = lazy(() =>
    import('@/pages/menu/MenuPage').then((module) => ({
        default: module.MenuPage,
    })),
);

const MenuItemPage = lazy(() =>
    import('@/pages/menu-item/MenuItemPage').then((module) => ({
        default: module.MenuItemPage,
    })),
);

const GalleryItemPage = lazy(() =>
    import('@/pages/gallery-item/GalleryItemPage').then((module) => ({
        default: module.GalleryItemPage,
    })),
);

const ReservationPage = lazy(() =>
    import('@/pages/reservation/ReservationPage').then((module) => ({
        default: module.ReservationPage,
    })),
);

function PageLoader() {
    return (
        <div className="page-loader" aria-live="polite">
            <div className="page-loader__content">
                <span className="page-loader__eyebrow">NOIRÉ</span>

                <span className="page-loader__line" />

                <span className="page-loader__text">
                    Preparing the experience
                </span>
            </div>
        </div>
    );
}

export function AppRouter() {
    return (
        <BrowserRouter>
            <ScrollToTop />

            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />

                    <Route path="/about" element={<AboutPage />} />

                    <Route path="/reservation" element={<ReservationPage />} />

                    <Route path="/menu" element={<MenuPage />} />

                    <Route path="/menu/:slug" element={<MenuItemPage />} />

                    <Route
                        path="/gallery/:slug"
                        element={<GalleryItemPage />}
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
