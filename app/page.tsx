'use client';

import { ThemeProvider } from '@/contexts/theme-context';
import { LanguageProvider } from '@/contexts/language-context';
import { Navbar } from '@/components/ui/navbar';
import { Hero } from '@/components/ui/hero';
import { About } from '@/components/ui/about';
import { Projects } from '@/components/ui/projects';
import { Skills } from '@/components/ui/skills';
import { Contact } from '@/components/ui/contact';
import { Footer } from '@/components/ui/footer';

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <main className="min-h-screen bg-background overflow-hidden">
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </main>
      </LanguageProvider>
    </ThemeProvider>
  );
}
