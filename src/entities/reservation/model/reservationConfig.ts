export const reservationDetails = [
    {
        label: 'Opening days',
        value: 'Tuesday — Saturday',
    },
    {
        label: 'Dinner service',
        value: '18:00 — 00:00',
    },
    {
        label: 'Location',
        value: '12 Rue du Bac, Paris',
    },
] as const;

export const guestOptions = [
    { value: '1', label: '1 guest' },
    { value: '2', label: '2 guests' },
    { value: '3', label: '3 guests' },
    { value: '4', label: '4 guests' },
    { value: '5', label: '5 guests' },
    { value: '6', label: '6 guests' },
    { value: '7', label: '7 guests' },
    { value: '8', label: '8 guests' },
] as const;

export const experienceOptions = [
    {
        value: 'dinner',
        label: 'Dinner',
    },
    {
        value: 'private-dining',
        label: 'Private Dining',
    },
    {
        value: 'celebration',
        label: 'Celebration',
    },
] as const;

export const timeOptions = [
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
] as const;

export const reservationInitialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    experience: 'dinner',
    request: '',
} as const;
