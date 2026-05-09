"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useModal } from "@/context/ModalContext";
import EditableText from "./editor/EditableText";
import { useSiteContent } from "@/context/SiteContentContext";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { theme, toggle } = useTheme();
  const { openModal } = useModal();
  const { isEditMode } = useSiteContent();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      id="contato"
      ref={ref}
      style={{
        backgroundColor: "var(--c-bg-inv)",
        color: "var(--c-text-inv)",
        paddingTop: "clamp(64px, 10vw, 120px)",
        paddingBottom: "clamp(40px, 6vw, 60px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ícone de fundo flutuante */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
        whileInView={{ opacity: 0.05, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: "-50px",
          left: "-50px",
          width: "min(500px, 70vw)",
          height: "min(500px, 70vw)",
          backgroundImage: "url('/gaki-icon.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Top line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "clamp(24px, 5vw, 64px)",
          right: "clamp(24px, 5vw, 64px)",
          height: "1px",
          backgroundColor: "rgba(237,227,213,0.12)",
          zIndex: 1,
        }}
      />

      <div className="section-inner" style={{ position: "relative", zIndex: 1 }}>

        {/* Lead text */}
        <motion.div
          style={{ maxWidth: "640px", marginBottom: "clamp(40px, 7vw, 72px)" }}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.8 }}
        >
          <EditableText
            fieldPath="footer.label"
            as="p"
            className="t-label"
            style={{ color: "var(--c-text-inv)", opacity: 0.5, marginBottom: "clamp(20px, 3vw, 32px)" }}
            fallback="O próximo passo"
          />
          <EditableText
            fieldPath="footer.headline"
            as="p"
            className="t-headline"
            style={{ color: "var(--c-text-inv)", marginBottom: "20px" }}
            fallback="Se fez sentido até aqui, o próximo passo é simples."
          />
          <EditableText
            fieldPath="footer.body"
            as="p"
            className="t-body"
            style={{ color: "var(--c-text-inv)", opacity: 0.65 }}
            fallback="Uma conversa. Sem proposta genérica, sem compromisso imediato. Só um bate-papo para entender onde sua comunicação está e se faz sentido trabalharmos juntos."
          />
        </motion.div>

        {/* BIG CTA */}
        <motion.div
          style={{ marginBottom: "clamp(48px, 8vw, 80px)", display: "flex", flexDirection: "column", alignItems: "flex-start" }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.85, delay: 0.2 }}
        >
          <button
            onClick={(e) => {
              if (isEditMode) e.preventDefault();
              else openModal();
            }}
            style={{ textDecoration: "none", display: "inline-block", background: "none", border: "none", cursor: isEditMode ? "default" : "pointer", padding: 0, textAlign: "left" }}
          >
            <h2
              className="t-mega"
              style={{
                color: "#EDE3D5",
                fontFamily: "Ovo, serif",
                fontStyle: "italic",
                fontWeight: 400,
                transition: "opacity 0.25s",
                textShadow: "0 2px 40px rgba(0,0,0,0.25)",
              }}
              onMouseEnter={(e) => { if (!isEditMode) e.currentTarget.style.opacity = "0.7"; }}
              onMouseLeave={(e) => { if (!isEditMode) e.currentTarget.style.opacity = "1"; }}
            >
              <EditableText
                fieldPath="footer.ctaMega1"
                as="span"
                fallback="Vamos"
              />
              <br />
              <EditableText
                fieldPath="footer.ctaMega2"
                as="span"
                fallback="conversar?"
              />
            </h2>
          </button>

          {/* Visible Solid Button CTA */}
          <motion.button
            onClick={(e) => {
              if (isEditMode) e.preventDefault();
              else openModal();
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginTop: "clamp(20px, 3vw, 32px)",
              padding: "16px 36px",
              backgroundColor: "#EDE3D5", // Beige brand color for high contrast on green
              borderRadius: "100px",
              border: "none",
              color: "var(--c-bg-inv)", // Dark green text
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: isEditMode ? "default" : "pointer",
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            whileHover={!isEditMode ? { scale: 1.04, boxShadow: "0 8px 32px rgba(0,0,0,0.25)" } : {}}
            whileTap={!isEditMode ? { scale: 0.97 } : {}}
          >
            <EditableText
              fieldPath="footer.ctaButton"
              as="span"
              fallback="Entrar em contato"
            />
          </motion.button>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            paddingTop: "40px",
            borderTop: "1px solid rgba(237,227,213,0.1)",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          {/* CTAs */}
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            <button
              onClick={(e) => {
                if (isEditMode) e.preventDefault();
                else openModal();
              }}
              style={{
                background: "none",
                border: "none",
                cursor: isEditMode ? "default" : "pointer",
                padding: 0,
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--c-text-inv)",
                opacity: 0.8,
                textDecoration: "none",
                borderBottom: "1px solid rgba(237,227,213,0.25)",
                paddingBottom: "2px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { if (!isEditMode) e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { if (!isEditMode) e.currentTarget.style.opacity = "0.8"; }}
            >
              <EditableText
                fieldPath="footer.linkChat"
                as="span"
                fallback="Quero conversar"
              />
            </button>
            <a
              href="#servicos"
              onClick={(e) => { if (isEditMode) e.preventDefault(); }}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--c-text-inv)",
                opacity: 0.35,
                textDecoration: "none",
                transition: "opacity 0.2s",
                cursor: isEditMode ? "default" : "pointer",
              }}
              onMouseEnter={(e) => { if (!isEditMode) e.currentTarget.style.opacity = "0.7"; }}
              onMouseLeave={(e) => { if (!isEditMode) e.currentTarget.style.opacity = "0.35"; }}
            >
              <EditableText
                fieldPath="footer.linkWork"
                as="span"
                fallback="Ver nossos trabalhos"
              />
            </a>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            <button
              onClick={toggle}
              style={{
                background: "none",
                border: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "var(--c-text-inv)",
                opacity: 0.35,
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
            >
              {theme === "light" ? "Dark mode" : "Light mode"}
            </button>
            <button
              onClick={scrollTop}
              style={{
                background: "none",
                border: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "var(--c-text-inv)",
                opacity: 0.35,
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
            >
              ↑ Topo
            </button>
          </div>
        </motion.div>

        {/* Logo e Copyright */}
        <div style={{ marginTop: "clamp(24px, 3vw, 40px)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gaki-logo.svg"
            alt="Gaki Logo"
            style={{
              height: "28px",
              width: "auto",
              opacity: 0.5,
              marginBottom: "12px",
              filter: "brightness(5)",
            }}
          />
        </div>
        <EditableText
          fieldPath="footer.copyright"
          as="p"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
            fontWeight: 300,
            color: "var(--c-text-inv)",
            opacity: 0.2,
            marginTop: "8px",
          }}
          fallback="© 2026 Gaki Comunicação Estratégica — São Paulo, Brasil"
        />
      </div>
    </footer>
  );
}
