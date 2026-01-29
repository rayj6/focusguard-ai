import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowToStart from "@/components/HowToStart";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import DownloadCenter from "@/components/DownloadCenter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HowToStart />
      <Features />
      <Pricing />
      <DownloadCenter />
      <Footer />
    </div>
  );
};

export default Index;
