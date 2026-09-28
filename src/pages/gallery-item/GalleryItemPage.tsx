import { Link, useParams } from 'react-router-dom';

import {
    galleryItems,
    getGalleryItemBySlug,
} from '@/entities/gallery/model/galleryData';

import { GalleryItemHero } from './ui/GalleryItemHero/GalleryItemHero';

import './GalleryItemPage.scss';

export function GalleryItemPage() {
    const { slug } = useParams<{ slug: string }>();

    const item = slug ? getGalleryItemBySlug(slug) : undefined;

    if (!item) {
        return (
            <main className="gallery-item-page gallery-item-page--not-found">
                <div className="container">
                    <p className="eyebrow">NOIRÉ — Gallery</p>

                    <h1 className="display-title">Image not found.</h1>

                    <Link
                        to="/#gallery"
                        className="gallery-item-page__back"
                        data-cursor="arrow"
                    >
                        <span>Back to gallery</span>
                        <span aria-hidden="true">↗</span>
                    </Link>
                </div>
            </main>
        );
    }

    const currentIndex = galleryItems.findIndex(
        (galleryItem) => galleryItem.slug === item.slug,
    );

    const previousItem =
        currentIndex > 0 ? galleryItems[currentIndex - 1] : undefined;

    const nextItem =
        currentIndex < galleryItems.length - 1
            ? galleryItems[currentIndex + 1]
            : undefined;

    return (
        <div className="gallery-item-page">
            <header className="gallery-item-page__header">
                <Link
                    className="gallery-item-page__logo"
                    to="/"
                    data-cursor="link"
                    aria-label="NOIRÉ — home"
                >
                    NOIRÉ
                </Link>

                <Link
                    className="gallery-item-page__back-link"
                    to="/#gallery"
                    data-cursor="arrow"
                >
                    <span>Back to gallery</span>
                    <span aria-hidden="true">↗</span>
                </Link>
            </header>

            <main>
                <GalleryItemHero item={item} />

                <section className="gallery-item-page__details">
                    <div className="gallery-item-page__details-container container">
                        <div>
                            <p className="eyebrow">{item.category}</p>

                            <p className="gallery-item-page__description">
                                {item.description}
                            </p>
                        </div>

                        <div className="gallery-item-page__meta">
                            <div>
                                <span>Image</span>

                                <strong>
                                    {String(item.id).padStart(2, '0')}
                                </strong>
                            </div>

                            <div>
                                <span>Collection</span>

                                <strong>NOIRÉ / 06</strong>
                            </div>

                            <div>
                                <span>Location</span>

                                <strong>Paris</strong>
                            </div>
                        </div>
                    </div>
                </section>

                <nav
                    className="gallery-item-page__navigation"
                    aria-label="Gallery navigation"
                >
                    <div className="gallery-item-page__navigation-container container">
                        {previousItem ? (
                            <Link
                                to={`/gallery/${previousItem.slug}`}
                                className="gallery-item-page__navigation-link"
                                data-cursor="arrow"
                            >
                                <span className="gallery-item-page__navigation-label">
                                    Previous
                                </span>

                                <span className="gallery-item-page__navigation-name">
                                    {previousItem.title}
                                </span>

                                <span aria-hidden="true">←</span>
                            </Link>
                        ) : (
                            <span />
                        )}

                        {nextItem ? (
                            <Link
                                to={`/gallery/${nextItem.slug}`}
                                className="gallery-item-page__navigation-link gallery-item-page__navigation-link--next"
                                data-cursor="arrow"
                            >
                                <span className="gallery-item-page__navigation-label">
                                    Next
                                </span>

                                <span className="gallery-item-page__navigation-name">
                                    {nextItem.title}
                                </span>

                                <span aria-hidden="true">→</span>
                            </Link>
                        ) : (
                            <span />
                        )}
                    </div>
                </nav>
            </main>

            <footer className="gallery-item-page__footer">
                <div className="container">
                    <span>NOIRÉ — Paris</span>

                    <Link to="/#gallery" data-cursor="arrow">
                        Explore the gallery ↗
                    </Link>
                </div>
            </footer>
        </div>
    );
}
