import { Helmet } from 'react-helmet-async';

import type { SeoPage } from './seo.config';
import { seoConfig } from './seo.config';

type SEOProps = {
    page: SeoPage;
    canonical?: string;
    image?: string;
};

const SITE_URL = 'https://noire-paris.vercel.app';

const restaurantSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'NOIRÉ',
    url: SITE_URL,
    description:
        'An intimate Parisian restaurant shaped by seasonal ingredients, precise technique and warm hospitality.',
    servesCuisine: ['Modern European', 'French'],
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ],
            opens: '18:00',
            closes: '00:00',
        },
    ],
};

export function SEO({
    page,
    canonical,
    image = '/images/gallery/dining-room.webp',
}: SEOProps) {
    const { title, description } = seoConfig[page];

    const currentPath =
        typeof window !== 'undefined'
            ? window.location.pathname
            : page === 'home'
              ? '/'
              : `/${page}`;

    const canonicalUrl =
        canonical ?? `${SITE_URL}${currentPath === '/' ? '' : currentPath}`;

    const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    return (
        <Helmet>
            <html lang="en" />

            <title>{title}</title>

            <meta name="description" content={description} />

            <meta
                name="robots"
                content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
            />

            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:site_name" content="NOIRÉ" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />

            {page === 'home' && (
                <script type="application/ld+json">
                    {JSON.stringify(restaurantSchema)}
                </script>
            )}
        </Helmet>
    );
}
