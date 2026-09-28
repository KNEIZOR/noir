export type MenuItem = {
    slug: string;
    name: string;
    description: string;
    price: string;
    category: string;
    categoryId: string;
    number: string;
    image: string;
    ingredients: string[];
    story: string;
};

export type MenuCategory = {
    id: string;
    number: string;
    title: string;
    subtitle: string;
    items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
    {
        id: 'starters',
        number: '01',
        title: 'Starters',
        subtitle: 'To begin',
        items: [
            {
                slug: 'cured-salmon',
                name: 'Cured Salmon',
                description: 'Fennel · Citrus · Dill oil',
                price: '24',
                category: 'Starters',
                categoryId: 'starters',
                number: '01',
                image: '/images/menu/menu-01.webp',
                ingredients: [
                    'Atlantic salmon',
                    'Fennel',
                    'Citrus',
                    'Dill oil',
                ],
                story: 'Delicately cured salmon balanced with bright citrus, fresh fennel and the aromatic depth of dill oil.',
            },
            {
                slug: 'beef-tartare',
                name: 'Beef Tartare',
                description: 'Smoked yolk · Capers · Toasted brioche',
                price: '26',
                category: 'Starters',
                categoryId: 'starters',
                number: '02',
                image: '/images/menu/menu-02.webp',
                ingredients: [
                    'Premium beef',
                    'Smoked egg yolk',
                    'Capers',
                    'Toasted brioche',
                ],
                story: 'A refined interpretation of a classic tartare, finished with smoked yolk, sharp capers and warm toasted brioche.',
            },
            {
                slug: 'burrata',
                name: 'Burrata',
                description: 'Heirloom tomato · Basil · Olive oil',
                price: '22',
                category: 'Starters',
                categoryId: 'starters',
                number: '03',
                image: '/images/menu/menu-03.webp',
                ingredients: [
                    'Burrata',
                    'Heirloom tomato',
                    'Fresh basil',
                    'Extra virgin olive oil',
                ],
                story: 'Creamy burrata meets the acidity of heirloom tomatoes, fragrant basil and exceptional olive oil.',
            },
            {
                slug: 'scallop',
                name: 'Scallop',
                description: 'Green apple · Celery · Champagne',
                price: '28',
                category: 'Starters',
                categoryId: 'starters',
                number: '04',
                image: '/images/menu/menu-04.webp',
                ingredients: [
                    'Hand-dived scallop',
                    'Green apple',
                    'Celery',
                    'Champagne',
                ],
                story: 'Sweet scallop with crisp green apple, delicate celery and the subtle acidity of champagne.',
            },
        ],
    },
    {
        id: 'mains',
        number: '02',
        title: 'Mains',
        subtitle: 'From the kitchen',
        items: [
            {
                slug: 'charred-octopus',
                name: 'Charred Octopus',
                description: 'Black garlic · Smoked lemon · Wild herbs',
                price: '32',
                category: 'Mains',
                categoryId: 'mains',
                number: '01',
                image: '/images/dishes/charred-octopus.webp',
                ingredients: [
                    'Wild octopus',
                    'Black garlic',
                    'Smoked lemon',
                    'Wild herbs',
                ],
                story: 'Tender octopus finished over intense heat, paired with black garlic, smoked lemon and wild herbs.',
            },
            {
                slug: 'wild-mushroom',
                name: 'Wild Mushroom',
                description: 'Truffle · Hazelnut · Brown butter',
                price: '26',
                category: 'Mains',
                categoryId: 'mains',
                number: '02',
                image: '/images/menu/menu-05.webp',
                ingredients: [
                    'Wild mushrooms',
                    'Black truffle',
                    'Hazelnut',
                    'Brown butter',
                ],
                story: 'A deeply aromatic composition of forest mushrooms, black truffle, toasted hazelnut and brown butter.',
            },
            {
                slug: 'duck-confit',
                name: 'Duck Confit',
                description: 'Pear · Juniper · Red wine jus',
                price: '34',
                category: 'Mains',
                categoryId: 'mains',
                number: '03',
                image: '/images/menu/menu-06.webp',
                ingredients: ['Duck leg', 'Pear', 'Juniper', 'Red wine jus'],
                story: 'Slow-cooked duck with the sweetness of pear, aromatic juniper and a rich red wine jus.',
            },
            {
                slug: 'roasted-sea-bass',
                name: 'Roasted Sea Bass',
                description: 'Artichoke · Saffron · Shellfish beurre blanc',
                price: '38',
                category: 'Mains',
                categoryId: 'mains',
                number: '04',
                image: '/images/menu/menu-07.webp',
                ingredients: [
                    'Wild sea bass',
                    'Artichoke',
                    'Saffron',
                    'Shellfish beurre blanc',
                ],
                story: 'Roasted sea bass served with tender artichoke, saffron and a silky shellfish beurre blanc.',
            },
        ],
    },
    {
        id: 'desserts',
        number: '03',
        title: 'Desserts',
        subtitle: 'A final note',
        items: [
            {
                slug: 'dark-chocolate',
                name: 'Dark Chocolate',
                description: 'Sea salt · Hazelnut · Coffee',
                price: '16',
                category: 'Desserts',
                categoryId: 'desserts',
                number: '01',
                image: '/images/menu/menu-08.webp',
                ingredients: [
                    'Dark chocolate',
                    'Sea salt',
                    'Hazelnut',
                    'Coffee',
                ],
                story: 'Dark chocolate brought into balance with sea salt, toasted hazelnut and the bitterness of coffee.',
            },
            {
                slug: 'pear',
                name: 'Pear',
                description: 'Vanilla · Almond · Caramel',
                price: '15',
                category: 'Desserts',
                categoryId: 'desserts',
                number: '02',
                image: '/images/menu/menu-09.webp',
                ingredients: ['Poached pear', 'Vanilla', 'Almond', 'Caramel'],
                story: 'A delicate pear dessert layered with vanilla, almond and a warm caramel finish.',
            },
            {
                slug: 'mille-feuille',
                name: 'Mille-Feuille',
                description: 'Apple · Calvados · Crème fraîche',
                price: '17',
                category: 'Desserts',
                categoryId: 'desserts',
                number: '03',
                image: '/images/menu/menu-10.webp',
                ingredients: [
                    'Puff pastry',
                    'Apple',
                    'Calvados',
                    'Crème fraîche',
                ],
                story: 'Crisp layers of pastry, caramelised apple, Calvados and cultured crème fraîche.',
            },
        ],
    },
];

export const allMenuItems = menuCategories.flatMap(
    (category) => category.items,
);

export function getMenuItemBySlug(slug: string) {
    return allMenuItems.find((item) => item.slug === slug);
}
