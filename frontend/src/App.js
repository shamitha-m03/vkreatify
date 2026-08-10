import { ReactLenis } from "lenis/react";
import { Toaster } from "sonner";
import ParticleField from "@/components/ParticleField";
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
import Insights from "@/components/Insights";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const reduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function App() {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.085, duration: 1.5, smoothWheel: !reduced }}
    >
      <div className="relative bg-[#050508] text-white" data-testid="app-root">
        <ParticleField />
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
          <Insights />
          <Contact />
          <Footer />
        </main>
        <Toaster theme="dark" position="bottom-right" />
      </div>
    </ReactLenis>
  );
}

export default App;
