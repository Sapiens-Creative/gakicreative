"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useModal } from "@/context/ModalContext";
import EditableText from "./editor/EditableText";
import { useSiteContent } from "@/context/SiteContentContext";

const defaultLinks = [
  { label: "Início", href: "#hero" },
  { label: "Método", href: "#metodo" },
  { label: "Serviços", href: "#servicos" },
  { label: "Para quem", href: "#para-quem" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("#hero");
  const { theme } = useTheme();
  const { openModal } = useModal();
  const { content, isEditMode } = useSiteContent();

  const links = content?.header?.links || defaultLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    links.forEach((link: any) => {
      const id = link.href.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [links]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navBg = scrolled
    ? theme === "dark"
      ? "rgba(10,10,10,0.88)"
      : "rgba(237,227,213,0.92)"
    : "transparent";

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "12px clamp(20px, 4vw, 48px)" : "20px clamp(20px, 4vw, 48px)",
          backgroundColor: navBg,
          backdropFilter: scrolled ? "blur(16px)" : "none",
          transition: "padding 0.4s ease, background-color 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gaki-logo.svg"
            alt="Gaki Logo"
            style={{
              height: "clamp(22px, 3vw, 28px)",
              width: "auto",
              opacity: 0.9,
              transition: "opacity 0.2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.9")}
          />
        </Link>

        {/* Desktop nav */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: "40px" }}
          className="hidden lg:flex"
        >
          {links.map((l: any, i: number) => (
            <a
              key={l.href || i}
              href={l.href}
              onClick={(e) => { if (isEditMode) e.preventDefault(); }}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: activeHash === l.href ? 500 : 300,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: activeHash === l.href ? "var(--c-primary)" : "var(--c-text)",
                opacity: activeHash === l.href ? 1 : 0.6,
                textDecoration: "none",
                transition: "all 0.3s ease",
                cursor: isEditMode ? "default" : "pointer"
              }}
              onMouseEnter={(e) => {
                if (activeHash !== l.href && !isEditMode) {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.color = "var(--c-text)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeHash !== l.href && !isEditMode) {
                  e.currentTarget.style.opacity = "0.6";
                  e.currentTarget.style.color = "var(--c-text)";
                }
              }}
            >
              <EditableText
                fieldPath={`header.links.${i}.label`}
                as="span"
                fallback={l.label}
              />
            </a>
          ))}
        </nav>

        {/* CTA + Burger */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <button
            onClick={(e) => {
              if (isEditMode) e.preventDefault();
              else openModal();
            }}
            className="hidden lg:inline-flex"
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--c-text)",
              color: "var(--c-bg)",
              border: "none",
              borderRadius: "100px",
              padding: "12px 24px",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: isEditMode ? "default" : "pointer",
              transition: "transform 0.2s ease, opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!isEditMode) {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.opacity = "0.9";
              }
            }}
            onMouseLeave={(e) => {
              if (!isEditMode) {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.opacity = "1";
              }
            }}
          >
            <EditableText
              fieldPath="header.cta"
              as="span"
              fallback="Vamos Conversar"
            />
          </button>

          <button
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            style={{
              background: "none",
              border: "none",
              color: "var(--c-text)",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              opacity: 0.8,
            }}
          >
            {open ? "FECHAR" : "MENU"}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="menu-overlay"
            style={{ backgroundColor: "var(--c-bg)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "40px" }}>
              {links.map((l: any, i: number) => (
                <motion.a
                  key={l.href || i}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(2rem,8vw,4rem)",
                    fontWeight: 300,
                    color: "var(--c-text)",
                    textDecoration: "none",
                    opacity: 0.85,
                  }}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.85 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
