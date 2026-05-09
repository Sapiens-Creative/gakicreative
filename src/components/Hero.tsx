"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedText from "./AnimatedText";
import LightRays from "./LightRays";
import EditableText from "./editor/EditableText";
import { useSiteContent } from "@/context/SiteContentContext";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY  = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const { content, isEditMode } = useSiteContent();

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "var(--c-bg)",
      }}
    >
      {/* LightRays Background */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#EDE3D5"
          raysSpeed={1}
          lightSpread={3}
          rayLength={1.2}
          pulsating={false}
          fadeDistance={0.4}
          saturation={0}
          followMouse
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 clamp(24px, 5vw, 64px)",
          maxWidth: "960px",
          width: "100%",
          y: textY,
          opacity,
        }}
      >
        {/* Label */}
        <motion.div
          style={{
            marginBottom: "clamp(24px, 4vw, 40px)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <EditableText
            fieldPath="hero.label"
            as="p"
            className="t-label"
            style={{
              color: "var(--c-text)",
              opacity: 0.5,
            }}
            fallback="Agência-estúdio de comunicação estratégica"
          />
        </motion.div>

        {/* Headline */}
        <h1 className="t-hero" style={{ color: "var(--c-text)" }}>
          {isEditMode ? (
            <>
              <EditableText
                fieldPath="hero.headlineLine1"
                as="span"
                className="block"
                style={{ display: "block" }}
                fallback="Sua empresa"
              />
              <EditableText
                fieldPath="hero.headlineLine2"
                as="span"
                className="block"
                style={{ display: "block" }}
                fallback="está funcionando."
              />
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                <EditableText
                  fieldPath="hero.headlineLine3"
                  as="span"
                  fallback="A comunicação,"
                />
              </span>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                <EditableText
                  fieldPath="hero.headlineLine4"
                  as="span"
                  style={{ color: "var(--c-primary)" }}
                  fallback="nem sempre."
                />
              </span>
            </>
          ) : (
            <>
              <AnimatedText
                text={content?.hero?.headlineLine1 ?? "Sua empresa"}
                as="span"
                className="block"
                delay={0.4}
                by="word"
              />
              <AnimatedText
                text={content?.hero?.headlineLine2 ?? "está funcionando."}
                as="span"
                className="block"
                delay={0.65}
                by="word"
              />
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                <AnimatedText
                  text={content?.hero?.headlineLine3 ?? "A comunicação,"}
                  as="span"
                  className=""
                  delay={0.9}
                  by="word"
                />
              </span>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  opacity: 1,
                }}
              >
                <AnimatedText
                  text={content?.hero?.headlineLine4 ?? "nem sempre."}
                  as="span"
                  className=""
                  delay={1.1}
                  by="word"
                  style={{ color: "var(--c-primary)" }}
                />
              </span>
            </>
          )}
        </h1>

        {/* Sub */}
        <motion.div
          style={{
            maxWidth: "520px",
            margin: "clamp(24px, 4vw, 36px) auto 0",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 0.9, delay: 1.5 }}
        >
          <p className="t-body" style={{ color: "var(--c-text)", opacity: 0.5 }}>
            <EditableText
              fieldPath="hero.sub"
              as="span"
              fallback="Design, conteúdo e consultoria —"
            />{" "}
            <EditableText
              fieldPath="hero.subHighlight"
              as="span"
              style={{ color: "var(--c-primary)", fontWeight: 500 }}
              fallback="integrados ou por demanda."
            />
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          style={{ marginTop: "clamp(32px, 5vw, 52px)", display: "flex", justifyContent: "center", gap: "8px", flexDirection: "column", alignItems: "center" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.9 }}
        >
          <a
            href="#metodo"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--c-text)",
              opacity: 0.7,
              textDecoration: "none",
              borderBottom: "1px solid var(--c-border)",
              paddingBottom: "3px",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          >
            <EditableText
              fieldPath="hero.cta"
              as="span"
              fallback="Ver como trabalhamos"
            />
          </a>
          <motion.span
            style={{
              display: "block",
              width: "1px",
              height: "32px",
              backgroundColor: "var(--c-text)",
              opacity: 0.25,
              marginTop: "16px",
            }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
