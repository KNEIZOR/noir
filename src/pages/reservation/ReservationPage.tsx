import { Footer } from '@/widgets/footer/Footer';
import { Header } from '@/widgets/header/Header';

import { SEO } from '@/shared/seo/SEO';

import { ReservationForm } from './ui/ReservationForm/ReservationForm';
import { ReservationHero } from './ui/ReservationHero/ReservationHero';

export function ReservationPage() {
    return (
        <>
            <SEO page="reservation" />

            <Header />

            <main className="reservation-page">
                <ReservationHero />
                <ReservationForm />
            </main>

            <Footer />
        </>
    );
}
