import { Footer } from '@/widgets/footer/Footer';
import { Header } from '@/widgets/header/Header';
import { SEO } from '@/shared/seo/SEO';

import { ChefSection } from './ui/ChefSection/ChefSection';
import { ExperienceSection } from './ui/ExperienceSection/ExperienceSection';
import { GallerySection } from './ui/GallerySection/GallerySection';
import { HeroSection } from './ui/HeroSection/HeroSection';
import { MenuPreviewSection } from './ui/MenuPreviewSection/MenuPreviewSection';
import { PhilosophySection } from './ui/PhilosophySection/PhilosophySection';
import { ReservationSection } from './ui/ReservationSection/ReservationSection';
import { SignatureDishSection } from './ui/SignatureDishSection/SignatureDishSection';

export function HomePage() {
    return (
        <>
            <SEO page="home" />

            <Header />

            <main id="top">
                <HeroSection />
                <PhilosophySection />
                <SignatureDishSection />
                <MenuPreviewSection />
                <ChefSection />
                <ExperienceSection />
                <GallerySection />
                <ReservationSection />
            </main>

            <Footer />
        </>
    );
}
