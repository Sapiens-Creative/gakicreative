"use client";

export const dynamic = "force-dynamic";

import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import Methodology from "@/components/Methodology";
import FeaturedProjects from "@/components/FeaturedProjects";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Territory from "@/components/Territory";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/context/ModalContext";
import QualificationModal from "@/components/QualificationModal";

export default function Home() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <About />
        <WhatWeDo />
        <Methodology />
        <FeaturedProjects />
        <Portfolio />
        <Territory />
        <Testimonials />
      </main>
      <Footer />
      <QualificationModal />
      </ModalProvider>
    </ThemeProvider>
  );
}
