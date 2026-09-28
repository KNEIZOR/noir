import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
    experienceOptions,
    guestOptions,
    reservationInitialValues,
    timeOptions,
} from '@/entities/reservation/model/reservationConfig';

import {
    validateReservation,
    type ReservationFormErrors,
    type ReservationFormValues,
} from '@/entities/reservation/model/reservationValidation';

import './ReservationForm.scss';

gsap.registerPlugin(ScrollTrigger);

export function ReservationForm() {
    const sectionRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const [values, setValues] = useState<ReservationFormValues>({
        ...reservationInitialValues,
    });

    const [errors, setErrors] = useState<ReservationFormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useGSAP(
        () => {
            const section = sectionRef.current;

            if (!section) {
                return;
            }

            const elements = section.querySelectorAll(
                '[data-reservation-reveal]',
            );

            gsap.fromTo(
                elements,
                {
                    opacity: 0,
                    y: 45,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    stagger: 0.08,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                },
            );
        },
        {
            scope: sectionRef,
        },
    );

    const handleChange = (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const { name, value } = event.target;

        setValues((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => {
            if (!current[name as keyof ReservationFormValues]) {
                return current;
            }

            const next = {
                ...current,
            };

            delete next[name as keyof ReservationFormValues];

            return next;
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors = validateReservation(values);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            const firstError = Object.keys(
                validationErrors,
            )[0] as keyof ReservationFormValues;

            requestAnimationFrame(() => {
                const field = formRef.current?.querySelector(
                    `[name="${firstError}"]`,
                );

                if (field instanceof HTMLElement) {
                    field.focus();
                }
            });

            return;
        }

        setIsSubmitting(true);

        await new Promise((resolve) => {
            window.setTimeout(resolve, 700);
        });

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <section
                ref={sectionRef}
                className="reservation-form-section reservation-form-section--success"
            >
                <div className="container">
                    <div
                        className="reservation-form__success"
                        data-reservation-reveal
                    >
                        <span className="reservation-form__success-number">
                            01
                        </span>

                        <p className="reservation-form__eyebrow eyebrow">
                            Request received
                        </p>

                        <h2 className="reservation-form__success-title display-title">
                            Thank you.
                        </h2>

                        <p className="reservation-form__success-description">
                            Your reservation request has been received. We will
                            contact you shortly to confirm your table.
                        </p>

                        <button
                            type="button"
                            className="reservation-form__reset"
                            onClick={() => {
                                setValues({
                                    ...reservationInitialValues,
                                });
                                setErrors({});
                                setIsSubmitted(false);
                            }}
                        >
                            Make another request
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={sectionRef}
            className="reservation-form-section"
            aria-labelledby="reservation-form-title"
        >
            <div className="container">
                <div className="reservation-form-section__header">
                    <div data-reservation-reveal>
                        <p className="reservation-form__eyebrow eyebrow">
                            The details
                        </p>

                        <h2
                            id="reservation-form-title"
                            className="reservation-form__title display-title"
                        >
                            Reserve your
                            <span>table.</span>
                        </h2>
                    </div>

                    <p
                        className="reservation-form-section__intro"
                        data-reservation-reveal
                    >
                        Tell us when you would like to join us and we will take
                        care of the rest.
                    </p>
                </div>

                <form
                    ref={formRef}
                    className="reservation-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div
                        className="reservation-form__group"
                        data-reservation-reveal
                    >
                        <div className="reservation-form__group-header">
                            <span>01</span>
                            <h3>Your details</h3>
                        </div>

                        <div className="reservation-form__grid reservation-form__grid--two">
                            <Field
                                label="First name"
                                name="firstName"
                                value={values.firstName}
                                error={errors.firstName}
                                onChange={handleChange}
                                autoComplete="given-name"
                                required
                            />

                            <Field
                                label="Last name"
                                name="lastName"
                                value={values.lastName}
                                error={errors.lastName}
                                onChange={handleChange}
                                autoComplete="family-name"
                                required
                            />

                            <Field
                                label="Email"
                                name="email"
                                type="email"
                                value={values.email}
                                error={errors.email}
                                onChange={handleChange}
                                autoComplete="email"
                                required
                            />

                            <Field
                                label="Phone"
                                name="phone"
                                type="tel"
                                value={values.phone}
                                error={errors.phone}
                                onChange={handleChange}
                                autoComplete="tel"
                                required
                            />
                        </div>
                    </div>

                    <div
                        className="reservation-form__group"
                        data-reservation-reveal
                    >
                        <div className="reservation-form__group-header">
                            <span>02</span>
                            <h3>Your evening</h3>
                        </div>

                        <div className="reservation-form__grid reservation-form__grid--two">
                            <Field
                                label="Date"
                                name="date"
                                type="date"
                                value={values.date}
                                error={errors.date}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />

                            <SelectField
                                label="Time"
                                name="time"
                                value={values.time}
                                error={errors.time}
                                options={timeOptions.map((time) => ({
                                    value: time,
                                    label: time,
                                }))}
                                onChange={handleChange}
                                placeholder="Select a time"
                                required
                            />

                            <SelectField
                                label="Guests"
                                name="guests"
                                value={values.guests}
                                error={errors.guests}
                                options={[...guestOptions]}
                                onChange={handleChange}
                                required
                            />

                            <SelectField
                                label="Experience"
                                name="experience"
                                value={values.experience}
                                error={errors.experience}
                                options={[...experienceOptions]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div
                        className="reservation-form__group"
                        data-reservation-reveal
                    >
                        <div className="reservation-form__group-header">
                            <span>03</span>
                            <h3>Anything else?</h3>
                        </div>

                        <div className="reservation-form__field">
                            <label htmlFor="request">
                                Special request
                                <span>Optional</span>
                            </label>

                            <textarea
                                id="request"
                                name="request"
                                value={values.request}
                                onChange={handleChange}
                                rows={5}
                                maxLength={1000}
                                placeholder="Dietary requirements, allergies, occasion..."
                            />

                            {errors.request && (
                                <span className="reservation-form__error">
                                    {errors.request}
                                </span>
                            )}
                        </div>
                    </div>

                    <div
                        className="reservation-form__footer"
                        data-reservation-reveal
                    >
                        <p>
                            By submitting this request, you are asking NOIRÉ to
                            confirm availability for your selected time.
                        </p>

                        <button
                            type="submit"
                            className="reservation-form__submit"
                            disabled={isSubmitting}
                        >
                            <span>
                                {isSubmitting
                                    ? 'Sending...'
                                    : 'Request a reservation'}
                            </span>

                            <span
                                className="reservation-form__submit-icon"
                                aria-hidden="true"
                            >
                                →
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

type FieldProps = {
    label: string;
    name: keyof ReservationFormValues;
    type?: 'text' | 'email' | 'tel' | 'date';
    value: string;
    error?: string;
    onChange: (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => void;
    autoComplete?: string;
    min?: string;
    required?: boolean;
};

function Field({
    label,
    name,
    type = 'text',
    value,
    error,
    onChange,
    autoComplete,
    min,
    required = false,
}: FieldProps) {
    const fieldId = `reservation-${name}`;

    return (
        <div className="reservation-form__field">
            <label htmlFor={fieldId}>
                {label}

                {required && <span>*</span>}
            </label>

            <input
                id={fieldId}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                min={min}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${fieldId}-error` : undefined}
                required={required}
            />

            {error && (
                <span
                    id={`${fieldId}-error`}
                    className="reservation-form__error"
                >
                    {error}
                </span>
            )}
        </div>
    );
}

type SelectFieldProps = {
    label: string;
    name: keyof ReservationFormValues;
    value: string;
    error?: string;
    options: readonly {
        value: string;
        label: string;
    }[];
    onChange: (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => void;
    placeholder?: string;
    required?: boolean;
};

function SelectField({
    label,
    name,
    value,
    error,
    options,
    onChange,
    placeholder,
    required = false,
}: SelectFieldProps) {
    const fieldId = `reservation-${name}`;

    return (
        <div className="reservation-form__field">
            <label htmlFor={fieldId}>
                {label}

                {required && <span>*</span>}
            </label>

            <div className="reservation-form__select">
                <select
                    id={fieldId}
                    name={name}
                    value={value}
                    onChange={onChange}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${fieldId}-error` : undefined}
                    required={required}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}

                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {error && (
                <span
                    id={`${fieldId}-error`}
                    className="reservation-form__error"
                >
                    {error}
                </span>
            )}
        </div>
    );
}
