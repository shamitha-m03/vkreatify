import { ReactLenis } from "lenis/react";
import { Toaster } from "sonner";
import { LangProvider } from "@/i18n";
import CrystalSphere from "@/components/CrystalSphere";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Process from "@/components/Process";
import People from "@/components/People";
import Voices from "@/components/Voices";
import Insights from "@/components/Insights";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SoundToggle from "@/components/SoundToggle";

const reduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function App() {
  return (
    <LangProvider>
      <ReactLenis
        root
        options={{ lerp: 0.085, duration: 1.5, smoothWheel: !reduced }}
      >
        <div className="relative bg-[#050508] text-white" data-testid="app-root">
          <CrystalSphere />
          <div className="noise-layer" aria-hidden="true" />
          <Cursor />
          <Nav />
          <main className="relative z-10">
            <Hero />
            <Statement />
            <Services />
            <Work />
            <Marquee />
            <About />
            <Process />
            <People />
            <Voices />
            <Insights />
            <Contact />
            <Footer />
          </main>
          <WhatsAppFloat />
          <SoundToggle />
          <Toaster theme="dark" position="bottom-right" />
        </div>
      </ReactLenis>
    </LangProvider>
  );
}

export default App;
