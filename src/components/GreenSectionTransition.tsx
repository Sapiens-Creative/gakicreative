"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GreenSectionTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center center"]
  });

  // O ícone cresce de 5% da largura até 3000% (cobre a tela toda) para revelar o fundo verde
  const maskSize = useTransform(scrollYProgress, [0, 1], ["10%", "3000%"]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        maskImage: "url('/gaki.svg')",
        maskPosition: "center top",
        maskRepeat: "no-repeat",
        maskSize,
        WebkitMaskImage: "url('/gaki.svg')",
        WebkitMaskPosition: "center top",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: maskSize,
      }}
    >
      {children}
    </motion.div>
  );
}
