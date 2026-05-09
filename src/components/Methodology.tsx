"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "./AnimatedText";
import EditableText from "./editor/EditableText";
import { useSiteContent } from "@/context/SiteContentContext";

export default function Methodology() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { content, isEditMode } = useSiteContent();

  const defaultItems = [
    "Diagnóstico antes de qualquer entrega",
    "Escopo claro e justificado",
    "Comunicação direta em todo o processo",
    "Resultado que faz sentido para o negócio, não apenas para o portfólio",
  ];
  const items = content?.methodology?.items || defaultItems;

  return (
    <section
      id="metodo"
      ref={ref}
      className="section-pad"
      style={{ backgroundColor: "var(--c-bg)" }}
    >
      <div className="section-inner">
        {/* Label */}
        <motion.div
          style={{ marginBottom: "clamp(32px, 5vw, 48px)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <EditableText
            fieldPath="methodology.label"
            as="p"
            className="t-label"
            style={{ color: "var(--c-text)" }}
            fallback="O Método"
          />
        </motion.div>

        {/* Headline */}
        <div style={{ maxWidth: "780px", marginBottom: "clamp(48px, 7vw, 80px)" }}>
          {isEditMode ? (
            <EditableText
              fieldPath="methodology.headline"
              as="h2"
              className="t-headline"
              style={{ color: "var(--c-text)" }}
              fallback="Antes de produzir qualquer coisa, entendemos o contexto."
            />
          ) : (
            <AnimatedText
              text={content?.methodology?.headline ?? "Antes de produzir qualquer coisa, entendemos o contexto."}
              as="h2"
              className="t-headline"
              style={{ color: "var(--c-text)" } as React.CSSProperties}
              delay={0.15}
              by="word"
            />
          )}
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
            <p>
              <EditableText
                fieldPath="methodology.paragraph1"
                as="span"
                fallback="Esse é o ponto de partida da Gaki."
              />
            </p>
            <p>
              <EditableText
                fieldPath="methodology.paragraph2"
                as="span"
                fallback="O que orienta cada projeto é o Marketing Natural: comunicação que ajuda antes de vender, que posiciona o cliente como protagonista e que converte pela clareza — não pela pressão."
              />
            </p>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <EditableText
              fieldPath="methodology.practiceLabel"
              as="p"
              className="t-label"
              style={{ color: "var(--c-text)", opacity: 0.38, marginBottom: "28px" }}
              fallback="Na prática:"
            />
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "20px" }}>
              {items.map((item: string, i: number) => (
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
                    <EditableText
                      fieldPath={`methodology.items.${i}`}
                      as="span"
                      fallback={item}
                    />
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
