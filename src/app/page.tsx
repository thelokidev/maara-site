import Hero from '@/components/hero';
import Features from '@/components/features';
import DownloadSection from '@/components/download';
import Pricing from '@/components/pricing';
import FAQ from '@/components/faq';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <Hero />
        <Features />
        <DownloadSection />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
