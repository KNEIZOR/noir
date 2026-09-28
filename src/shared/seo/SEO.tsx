import { Helmet } from 'react-helmet-async';

import type { SeoPage } from './seo.config';
import { seoConfig } from './seo.config';

type SEOProps = {
    page: SeoPage;
    canonical?: string;
    image?: string;
};

const restaurantSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'NOIRÉ',
    description:
        'An intimate Parisian restaurant shaped by seasonal ingredients, precise technique and warm hospitality.',
    servesCuisine: ['Modern European', 'French'],
    priceRange: '$$$$',
    openingHours: 'Tu-Sa 18:00-00:00',
};

export function SEO({
    page,
    canonical,
    image = '/images/gallery/dining-room.webp',
}: SEOProps) {
    const { title, description } = seoConfig[page];

    return (
        <Helmet>
            <html lang="en" />

            <title>{title}</title>

            <meta name="description" content={description} />

            <meta
                name="robots"
                content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
            />

            {canonical && <link rel="canonical" href={canonical} />}

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {page === 'home' && (
                <script type="application/ld+json">
                    {JSON.stringify(restaurantSchema)}
                </script>
            )}
        </Helmet>
    );
}
