"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "./AnimatedText";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="sobre"
      ref={ref}
      className="section-pad"
      style={{
        backgroundColor: "var(--c-bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "clamp(24px, 5vw, 64px)",
          right: "clamp(24px, 5vw, 64px)",
          height: "1px",
          backgroundColor: "var(--c-border)",
        }}
      />

      <div className="section-inner">
        <motion.p
          className="t-label"
          style={{ color: "var(--c-text)", opacity: 0.38, marginBottom: "clamp(24px, 4vw, 40px)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          Quem somos
        </motion.p>

        <div className="grid-2col" style={{ alignItems: "start" }}>
          {/* Left — manifesto */}
          <div>
            <div style={{ marginBottom: "clamp(20px, 3vw, 32px)" }}>
              <AnimatedText
                text="Gaki é um estúdio-agência de "
                as="span"
                className="t-headline"
                style={{ color: "var(--c-text)", display: "inline" } as React.CSSProperties}
                delay={0.15}
                by="word"
              />
              <AnimatedText
                text="comunicação estratégica."
                as="span"
                className="t-headline"
                style={{ color: "var(--c-primary)", display: "inline" } as React.CSSProperties}
                delay={0.4}
                by="word"
              />
            </div>

            <motion.div
              className="t-body"
              style={{
                color: "var(--c-text)",
                opacity: 0.6,
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                maxWidth: "520px",
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <p>
                Nascemos da observação de um padrão: empresas que entregam bem,
                mas comunicam abaixo do que merecem. O problema raramente é
                produto — é <span style={{ color: "var(--c-primary)", fontWeight: 500 }}>ausência de direção estratégica</span> na comunicação.
              </p>
              <p>
                Integramos diagnóstico, identidade visual, conteúdo e consultoria
                em uma lógica única: antes de produzir qualquer coisa, <span style={{ color: "var(--c-primary)", fontWeight: 500 }}>entendemos o contexto</span>. Só então executamos.
              </p>
            </motion.div>

            <motion.a
              href="#para-quem"
              className="t-label"
              style={{
                display: "inline-block",
                marginTop: "clamp(28px, 4vw, 40px)",
                color: "var(--c-primary)",
                opacity: 0.85,
                textDecoration: "none",
                borderBottom: "1px solid var(--c-primary)",
                paddingBottom: "3px",
                transition: "opacity 0.2s",
              }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.85 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
            >
              Ver para quem trabalhamos →
            </motion.a>
          </div>

          {/* Right — manifesto quote */}
          <motion.div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "clamp(32px, 5vw, 56px)",
              backgroundColor: "var(--c-bg-inv)",
              borderRadius: "4px",
              position: "relative",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            {/* Decorative icon */}
            <div
              style={{
                position: "absolute",
                bottom: "-20px",
                right: "-20px",
                width: "140px",
                height: "140px",
                backgroundImage: "url('/gaki-icon.svg')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                opacity: 0.06,
                pointerEvents: "none",
              }}
            />

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.36em",
                textTransform: "uppercase",
                color: "var(--c-text-inv)",
                opacity: 0.4,
                marginBottom: "20px",
              }}
            >
              Nossa visão
            </p>

            <blockquote
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                fontWeight: 400,
                lineHeight: 1.5,
                color: "var(--c-text-inv)",
                borderLeft: "none",
                padding: 0,
                margin: 0,
              }}
            >
              &quot;Comunicação que <span style={{ color: "var(--c-primary-light)" }}>ajuda antes de vender</span>. Que posiciona o cliente
              como <span style={{ color: "var(--c-primary-light)" }}>protagonista</span>. Que converte pela <span style={{ color: "var(--c-primary-light)" }}>clareza</span> — não pela pressão.&quot;
            </blockquote>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 300,
                color: "var(--c-text-inv)",
                opacity: 0.4,
                marginTop: "24px",
                letterSpacing: "0.06em",
              }}
            >
              Marketing Natural — a filosofia da Gaki
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
