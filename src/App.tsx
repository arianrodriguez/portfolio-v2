import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/sections/Hero';
import { Services } from '@/sections/Services';
import { Projects } from '@/sections/Projects';
import { Contact } from '@/sections/Contact';

/**
 * Single-page portfolio shell. Each section is self-contained and reads its
 * own content from `src/data`, so the page is just an ordered composition.
 */
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
