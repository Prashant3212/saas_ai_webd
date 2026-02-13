import FluidBackground from '@/components/ui-custom/FluidBackground';
import Navbar from '@/components/ui-custom/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0d0d0d]">
      <FluidBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
