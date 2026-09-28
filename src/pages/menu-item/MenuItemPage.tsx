import { Link, useParams } from 'react-router-dom';

import {
    allMenuItems,
    getMenuItemBySlug,
} from '@/entities/menu/model/menuData';

import { MenuItemHero } from './ui/MenuItemHero/MenuItemHero';

import './MenuItemPage.scss';

export function MenuItemPage() {
    const { slug } = useParams<{ slug: string }>();

    const item = slug ? getMenuItemBySlug(slug) : undefined;

    if (!item) {
        return (
            <main className="menu-item-page menu-item-page--not-found">
                <div className="container">
                    <p className="eyebrow">NOIRÉ — Menu</p>

                    <h1 className="display-title">Dish not found.</h1>

                    <Link
                        to="/menu"
                        className="menu-item-page__back"
                        data-cursor="arrow"
                    >
                        <span>Back to menu</span>
                        <span aria-hidden="true">↗</span>
                    </Link>
                </div>
            </main>
        );
    }

    const currentIndex = allMenuItems.findIndex(
        (menuItem) => menuItem.slug === item.slug,
    );

    const previousItem =
        currentIndex > 0 ? allMenuItems[currentIndex - 1] : undefined;

    const nextItem =
        currentIndex < allMenuItems.length - 1
            ? allMenuItems[currentIndex + 1]
            : undefined;

    return (
        <div className="menu-item-page">
            <header className="menu-item-page__header">
                <Link
                    className="menu-item-page__logo"
                    to="/"
                    data-cursor="link"
                    aria-label="NOIRÉ — home"
                >
                    NOIRÉ
                </Link>

                <Link
                    className="menu-item-page__menu-link"
                    to="/menu"
                    data-cursor="arrow"
                >
                    <span>Back to menu</span>
                    <span aria-hidden="true">↗</span>
                </Link>
            </header>

            <main>
                <MenuItemHero item={item} />

                <section className="menu-item-page__details">
                    <div className="menu-item-page__details-container container">
                        <div className="menu-item-page__story">
                            <p className="eyebrow">The composition</p>

                            <p className="menu-item-page__story-text">
                                {item.story}
                            </p>
                        </div>

                        <div className="menu-item-page__ingredients">
                            <p className="eyebrow">Ingredients</p>

                            <div className="menu-item-page__ingredient-list">
                                {item.ingredients.map((ingredient, index) => (
                                    <span
                                        key={ingredient}
                                        className="menu-item-page__ingredient"
                                    >
                                        <span>
                                            {String(index + 1).padStart(2, '0')}
                                        </span>

                                        {ingredient}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <nav
                    className="menu-item-page__navigation"
                    aria-label="Dish navigation"
                >
                    <div className="menu-item-page__navigation-container container">
                        {previousItem ? (
                            <Link
                                to={`/menu/${previousItem.slug}`}
                                className="menu-item-page__navigation-link"
                                data-cursor="arrow"
                            >
                                <span className="menu-item-page__navigation-label">
                                    Previous
                                </span>

                                <span className="menu-item-page__navigation-name">
                                    {previousItem.name}
                                </span>

                                <span aria-hidden="true">←</span>
                            </Link>
                        ) : (
                            <span />
                        )}

                        {nextItem ? (
                            <Link
                                to={`/menu/${nextItem.slug}`}
                                className="menu-item-page__navigation-link menu-item-page__navigation-link--next"
                                data-cursor="arrow"
                            >
                                <span className="menu-item-page__navigation-label">
                                    Next
                                </span>

                                <span className="menu-item-page__navigation-name">
                                    {nextItem.name}
                                </span>

                                <span aria-hidden="true">→</span>
                            </Link>
                        ) : (
                            <span />
                        )}
                    </div>
                </nav>
            </main>

            <footer className="menu-item-page__footer">
                <div className="container">
                    <span>NOIRÉ — Paris</span>

                    <Link to="/menu" data-cursor="arrow">
                        Explore the full menu ↗
                    </Link>
                </div>
            </footer>
        </div>
    );
}
