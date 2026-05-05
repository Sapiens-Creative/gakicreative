"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "./AnimatedText";

const items = [
  "Diagnóstico antes de qualquer entrega",
  "Escopo claro e justificado",
  "Comunicação direta em todo o processo",
  "Resultado que faz sentido para o negócio, não apenas para o portfólio",
];

export default function Methodology() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="metodo"
      ref={ref}
      className="section-pad"
      style={{ backgroundColor: "var(--c-bg)" }}
    >
      <div className="section-inner">
        {/* Label */}
        <motion.p
          className="t-label"
          style={{ color: "var(--c-text)", opacity: 0.4, marginBottom: "clamp(32px, 5vw, 48px)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          O Método
        </motion.p>

        {/* Headline */}
        <div style={{ maxWidth: "780px", marginBottom: "clamp(48px, 7vw, 80px)" }}>
          <AnimatedText
            text="Antes de produzir qualquer coisa, entendemos o contexto."
            as="h2"
            className="t-headline"
            style={{ color: "var(--c-text)" } as React.CSSProperties}
            delay={0.15}
            by="word"
          />
        </div>

        {/* Two-col */}
        <div className="grid-2col">
          {/* Left */}
          <motion.div
            className="t-body"
            style={{
              color: "var(--c-text)",
              opacity: 0.65,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 0.65, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <p>Esse é o ponto de partida da Gaki.</p>
            <p>
              O que orienta cada projeto é o Marketing Natural: comunicação que
              ajuda antes de vender, que posiciona o cliente como protagonista e
              que converte pela clareza — não pela pressão.
            </p>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p
              className="t-label"
              style={{ color: "var(--c-text)", opacity: 0.38, marginBottom: "28px" }}
            >
              Na prática:
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "20px" }}>
              {items.map((item, i) => (
                <li
                  key={i}
                  style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "10px",
                      color: "var(--c-text)",
                      opacity: 0.3,
                      marginTop: "5px",
                      flexShrink: 0,
                    }}
                  >
                    ◆
                  </span>
                  <span
                    className="t-body"
                    style={{ color: "var(--c-text)", opacity: 0.78 }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
