import { Header } from '@/widgets/header/Header';
import { Footer } from '@/widgets/footer/Footer';

import { HeroSection } from './ui/HeroSection/HeroSection';
import { PhilosophySection } from './ui/PhilosophySection/PhilosophySection';
import { SignatureDishSection } from './ui/SignatureDishSection/SignatureDishSection';
import { MenuPreviewSection } from './ui/MenuPreviewSection/MenuPreviewSection';
import { ChefSection } from './ui/ChefSection/ChefSection';
import { ExperienceSection } from './ui/ExperienceSection/ExperienceSection';
import { GallerySection } from './ui/GallerySection/GallerySection';
import { ReservationSection } from './ui/ReservationSection/ReservationSection';

export function HomePage() {
    return (
        <>
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
