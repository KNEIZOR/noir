export type SeoPage = 'home' | 'about' | 'menu' | 'reservation';

export type SeoConfig = {
    title: string;
    description: string;
};

export const seoConfig: Record<SeoPage, SeoConfig> = {
    home: {
        title: 'NOIRÉ — Parisian Restaurant',
        description:
            'NOIRÉ is an intimate Parisian restaurant shaped by seasonal ingredients, precise technique and warm hospitality.',
    },

    about: {
        title: 'About NOIRÉ — Our Philosophy & Story',
        description:
            'Discover the philosophy, kitchen, chef and atmosphere behind NOIRÉ, an intimate Parisian restaurant built around seasonality, craft and hospitality.',
    },

    menu: {
        title: 'Menu — NOIRÉ Paris',
        description:
            'Explore the seasonal menu at NOIRÉ, featuring carefully selected ingredients, refined technique and contemporary Parisian cuisine.',
    },

    reservation: {
        title: 'Reserve a Table — NOIRÉ Paris',
        description:
            'Reserve your table at NOIRÉ in Paris and experience an intimate evening of seasonal cuisine, warm hospitality and thoughtful service.',
    },
};
