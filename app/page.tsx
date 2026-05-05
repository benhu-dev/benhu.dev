import { Footer } from '@/components/layout/footer';
import { Nav } from '@/components/layout/nav';
import { StatusBar } from '@/components/layout/status-bar';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { Experience } from '@/components/sections/experience';
import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <StatusBar />
    </>
  );
}
