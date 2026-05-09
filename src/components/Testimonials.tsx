"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import EditableText from "./editor/EditableText";
import { useSiteContent } from "@/context/SiteContentContext";

const defaultTestimonials = [
  {
    quote:
      "A Gaki não entregou só uma identidade visual — entregou clareza. Depois do processo, ficou fácil explicar para qualquer pessoa o que a gente faz e por que vale a pena.",
    name: "Nome do Cliente",
    role: "CEO",
    company: "Empresa",
  },
  {
    quote:
      "O que diferenciou a Gaki foi o diagnóstico antes de qualquer execução. Eles entenderam o nosso negócio antes de propor qualquer solução. Isso faz toda a diferença.",
    name: "Nome do Cliente",
    role: "Fundadora",
    company: "Empresa",
  },
  {
    quote:
      "Buscávamos um parceiro estratégico, não apenas um executor. A Gaki entendeu exatamente isso desde o início. Trabalho integrado, com sentido em cada etapa.",
    name: "Nome do Cliente",
    role: "Diretor de Marketing",
    company: "Empresa",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);
  const { content } = useSiteContent();
  const testimonials = content?.testimonials?.items || defaultTestimonials;

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section
      ref={ref}
      className="section-pad"
      style={{
        backgroundColor: "var(--c-bg-inv)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative icon bg */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "-60px",
          transform: "translateY(-50%)",
          width: "min(400px, 60vw)",
          height: "min(400px, 60vw)",
          backgroundImage: "url('/gaki-icon.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          opacity: 0.04,
          pointerEvents: "none",
        }}
      />

      <div className="section-inner" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "center",
          }}
          className="testimonials-grid"
        >
          {/* Left — label + controls */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.8 }}
          >
            <EditableText
              fieldPath="testimonials.label"
              as="p"
              className="t-label"
              style={{ color: "var(--c-text-inv)", opacity: 0.35, marginBottom: "clamp(20px, 3vw, 32px)" }}
              fallback="O que dizem"
            />

            <EditableText
              fieldPath="testimonials.headline"
              as="p"
              className="t-headline"
              style={{ color: "var(--c-text-inv)", marginBottom: "clamp(28px, 4vw, 48px)" }}
              fallback="Clientes que encontraram direção."
            />

            {/* Navigation */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <button
                onClick={prev}
                aria-label="Depoimento anterior"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "1px solid rgba(237,227,213,0.25)",
                  background: "none",
                  color: "var(--c-text-inv)",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(237,227,213,0.6)";
                  e.currentTarget.style.background = "rgba(237,227,213,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(237,227,213,0.25)";
                  e.currentTarget.style.background = "none";
                }}
              >
                ←
              </button>
              <button
                onClick={next}
                aria-label="Próximo depoimento"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "1px solid rgba(237,227,213,0.25)",
                  background: "none",
                  color: "var(--c-text-inv)",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(237,227,213,0.6)";
                  e.currentTarget.style.background = "rgba(237,227,213,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(237,227,213,0.25)";
                  e.currentTarget.style.background = "none";
                }}
              >
                →
              </button>

              {/* Dots */}
              <div style={{ display: "flex", gap: "6px", marginLeft: "8px" }}>
                {testimonials.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Ir para depoimento ${i + 1}`}
                    style={{
                      width: i === active ? "20px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background: "var(--c-text-inv)",
                      opacity: i === active ? 0.85 : 0.25,
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "width 0.3s ease, opacity 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — quote */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: "relative", minHeight: "200px" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Opening quote mark */}
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(3rem, 6vw, 5rem)",
                    lineHeight: 0.8,
                    color: "var(--c-primary-light)",
                    opacity: 0.4,
                    marginBottom: "16px",
                  }}
                >
                  &quot;
                </span>

                <blockquote
                  style={{
                    margin: 0,
                    padding: 0,
                    border: "none",
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)",
                    fontWeight: 400,
                    lineHeight: 1.65,
                    color: "var(--c-text-inv)",
                    opacity: 0.88,
                    marginBottom: "clamp(20px, 3vw, 32px)",
                  }}
                >
                  <EditableText
                    fieldPath={`testimonials.items.${active}.quote`}
                    as="span"
                    fallback={testimonials[active].quote}
                  />
                </blockquote>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  {/* Avatar placeholder */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "var(--c-primary)",
                      opacity: 0.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: "var(--c-text-inv)", fontSize: "14px", opacity: 0.8 }}>
                      {testimonials[active].name.charAt(0)}
                    </span>
                  </div>

                  <div>
                    <EditableText
                      fieldPath={`testimonials.items.${active}.name`}
                      as="p"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "var(--c-text-inv)",
                        opacity: 0.9,
                      }}
                      fallback={testimonials[active].name}
                    />
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "11px",
                        fontWeight: 300,
                        color: "var(--c-text-inv)",
                        opacity: 0.45,
                        letterSpacing: "0.04em",
                      }}
                    >
                      <EditableText
                        fieldPath={`testimonials.items.${active}.role`}
                        as="span"
                        fallback={testimonials[active].role}
                      />{" "}
                      ·{" "}
                      <EditableText
                        fieldPath={`testimonials.items.${active}.company`}
                        as="span"
                        fallback={testimonials[active].company}
                      />
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
