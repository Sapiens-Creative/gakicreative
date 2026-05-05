"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "IPSA AQUA PLAY ART",
    subtitle: "Interactive Installation",
    color: "#2A4494",
    gradient: "from-blue-900 via-indigo-800 to-purple-900",
  },
  {
    id: 2,
    title: "Level of Distance",
    subtitle: "Spatial Design",
    color: "#1a1a2e",
    gradient: "from-gray-900 via-slate-800 to-zinc-900",
  },
  {
    id: 3,
    title: "SHIFT LINK",
    subtitle: "Digital Platform",
    color: "#0d3b4f",
    gradient: "from-teal-900 via-cyan-900 to-slate-900",
  },
  {
    id: 4,
    title: "kolor PARIS Collection",
    subtitle: "Fashion Show",
    color: "#2d1b3d",
    gradient: "from-purple-950 via-fuchsia-950 to-slate-900",
  },
  {
    id: 5,
    title: "Coca-Cola Coke Vision",
    subtitle: "Brand Experience",
    color: "#4a0e0e",
    gradient: "from-red-950 via-rose-900 to-orange-950",
  },
];

export default function ProjectsSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.8;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, projects.length - 1));
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="py-4">
      {/* Slider Container */}
      <div
        ref={containerRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-8 md:px-16 pb-8 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {projects.map((project, i) => (
          <motion.a
            key={project.id}
            href="#"
            className={`snap-center shrink-0 relative rounded-lg overflow-hidden cursor-pointer group
              w-[80vw] md:w-[60vw] lg:w-[50vw] aspect-[16/10]`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 group-hover:scale-105`}
            />

            {/* Abstract pattern overlay */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
                style={{
                  background: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 50%),
                              radial-gradient(circle at 70% 60%, rgba(255,255,255,0.08) 0%, transparent 40%)`,
                }}
              />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <motion.div
                className="relative z-10"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <p className="text-white/50 text-[11px] tracking-[0.3em] uppercase mb-3">
                  {project.subtitle}
                </p>
                <h3 className="text-white text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-tight">
                  {project.title}
                </h3>
              </motion.div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </motion.a>
        ))}
      </div>

      {/* Indicators */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`h-[2px] transition-all duration-500 ${
              i === activeIndex
                ? "w-8 opacity-100"
                : "w-4 opacity-30"
            }`}
            style={{ backgroundColor: "currentColor" }}
            onClick={() => {
              const container = containerRef.current;
              if (container) {
                const cardWidth = container.offsetWidth * 0.8;
                container.scrollTo({ left: cardWidth * i, behavior: "smooth" });
              }
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
