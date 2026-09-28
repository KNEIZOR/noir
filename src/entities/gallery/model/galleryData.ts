export type GalleryItem = {
    id: number;
    slug: string;
    image: string;
    alt: string;
    size: 'large' | 'medium' | 'small';
    speed: number;
    rotate: number;
    title: string;
    category: string;
    description: string;
};

export const galleryItems: GalleryItem[] = [
    {
        id: 1,
        slug: 'the-dining-room',
        image: '/images/gallery/dining-room.webp',
        alt: 'NOIRÉ restaurant interior',
        size: 'large',
        speed: 1,
        rotate: -2,
        title: 'The Dining Room',
        category: 'The Space',
        description:
            'A quiet composition of warm light, natural textures and intimate tables designed to make every evening feel unhurried.',
    },
    {
        id: 2,
        slug: 'the-table',
        image: '/images/gallery/table.webp',
        alt: 'Fine dining table',
        size: 'small',
        speed: 0.72,
        rotate: 2,
        title: 'The Table',
        category: 'The Details',
        description:
            'Every place setting is considered as part of the experience — restrained, tactile and deliberately understated.',
    },
    {
        id: 3,
        slug: 'evening-light',
        image: '/images/gallery/evening-light.webp',
        alt: 'Elegant restaurant dining room',
        size: 'medium',
        speed: 1.18,
        rotate: -1,
        title: 'Evening Light',
        category: 'The Atmosphere',
        description:
            'As daylight fades, the room changes character. Shadows deepen, candles begin to glow and the evening unfolds.',
    },
    {
        id: 4,
        slug: 'the-ambience',
        image: '/images/gallery/ambience.webp',
        alt: 'Restaurant atmosphere',
        size: 'large',
        speed: 0.86,
        rotate: 1.5,
        title: 'The Ambience',
        category: 'The Experience',
        description:
            'NOIRÉ is shaped by more than food. Sound, scent, architecture and movement come together around the table.',
    },
    {
        id: 5,
        slug: 'the-room',
        image: '/images/gallery/room.webp',
        alt: 'Luxury restaurant interior',
        size: 'medium',
        speed: 1.25,
        rotate: -2.5,
        title: 'The Room',
        category: 'The Space',
        description:
            'Dark timber, stone and soft fabric create an intimate setting where the architecture stays quiet behind the experience.',
    },
    {
        id: 6,
        slug: 'from-the-kitchen',
        image: '/images/gallery/kitchen.webp',
        alt: 'Dish served at NOIRÉ',
        size: 'small',
        speed: 0.7,
        rotate: 2,
        title: 'From the Kitchen',
        category: 'The Kitchen',
        description:
            'A glimpse into the kitchen where precise technique meets seasonal ingredients and the rhythm of service.',
    },
];

export const getGalleryItemBySlug = (slug: string) => {
    return galleryItems.find((item) => item.slug === slug);
};
