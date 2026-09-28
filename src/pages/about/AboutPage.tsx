import { Footer } from '@/widgets/footer/Footer';
import { Header } from '@/widgets/header/Header';
import { SEO } from '@/shared/seo/SEO';

import { AboutCta } from './ui/AboutCta/AboutCta';
import { AboutHero } from './ui/AboutHero/AboutHero';
import { ChefStory } from './ui/ChefStory/ChefStory';
import { KitchenSection } from './ui/KitchenSection/KitchenSection';
import { PhilosophyStory } from './ui/PhilosophyStory/PhilosophyStory';
import { SpaceSection } from './ui/SpaceSection/SpaceSection';
import { ValuesSection } from './ui/ValuesSection/ValuesSection';

export function AboutPage() {
    return (
        <>
            <SEO page="about" />

            <Header />

            <main className="about-page">
                <AboutHero />
                <PhilosophyStory />
                <KitchenSection />
                <ChefStory />
                <SpaceSection />
                <ValuesSection />
                <AboutCta />
            </main>

            <Footer />
        </>
    );
}
