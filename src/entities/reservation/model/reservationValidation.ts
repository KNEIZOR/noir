export type ReservationFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: string;
    experience: string;
    request: string;
};

export type ReservationFormErrors = Partial<
    Record<keyof ReservationFormValues, string>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_PATTERN = /^[+\d\s().-]{7,}$/;

export function validateReservation(
    values: ReservationFormValues,
): ReservationFormErrors {
    const errors: ReservationFormErrors = {};

    if (!values.firstName.trim()) {
        errors.firstName = 'Please enter your first name.';
    }

    if (!values.lastName.trim()) {
        errors.lastName = 'Please enter your last name.';
    }

    if (!values.email.trim()) {
        errors.email = 'Please enter your email.';
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
        errors.email = 'Please enter a valid email.';
    }

    if (!values.phone.trim()) {
        errors.phone = 'Please enter your phone number.';
    } else if (!PHONE_PATTERN.test(values.phone.trim())) {
        errors.phone = 'Please enter a valid phone number.';
    }

    if (!values.date) {
        errors.date = 'Please select a date.';
    }

    if (!values.time) {
        errors.time = 'Please select a time.';
    }

    if (!values.guests) {
        errors.guests = 'Please select the number of guests.';
    }

    if (!values.experience) {
        errors.experience = 'Please select an experience.';
    }

    return errors;
}
