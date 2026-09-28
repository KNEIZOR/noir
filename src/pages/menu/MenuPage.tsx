import { Link } from 'react-router-dom';

import { SEO } from '@/shared/seo/SEO';
import { menuCategories } from '@/entities/menu/model/menuData';

import { MenuCategory } from './ui/MenuCategory/MenuCategory';
import { MenuFooter } from './ui/MenuFooter/MenuFooter';
import { MenuHero } from './ui/MenuHero/MenuHero';

import './MenuPage.scss';

export function MenuPage() {
    return (
        <div className="menu-page">
            <SEO page="menu" />

            <header className="menu-page__header">
                <Link
                    className="menu-page__logo"
                    to="/"
                    data-cursor="link"
                    aria-label="NOIRÉ — back to home"
                >
                    NOIRÉ
                </Link>

                <Link className="menu-page__back" to="/" data-cursor="arrow">
                    <span>Back to home</span>
                    <span aria-hidden="true">←</span>
                </Link>
            </header>

            <main>
                <MenuHero />

                <div className="menu-page__categories">
                    {menuCategories.map((category) => (
                        <MenuCategory
                            key={category.id}
                            number={category.number}
                            title={category.title}
                            subtitle={category.subtitle}
                            items={category.items}
                        />
                    ))}
                </div>
            </main>

            <MenuFooter />
        </div>
    );
}
