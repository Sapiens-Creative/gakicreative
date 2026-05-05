"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    num: "01",
    client: "Cliente A",
    type: "Identidade Visual + Consultoria",
    result: "Reposicionamento completo da marca em 3 meses",
    grad: "linear-gradient(135deg, #1B4F3D 0%, #2E7D5F 60%, #A8D5BA 100%)",
    soon: true,
  },
  {
    num: "02",
    client: "Cliente B",
    type: "Conteúdo + Social",
    result: "Presença digital consistente com foco em relevância",
    grad: "linear-gradient(135deg, #9E8315 0%, #E2B917 60%, #E5D07B 100%)",
    soon: true,
  },
  {
    num: "03",
    client: "Cliente C",
    type: "Estúdio + Conteúdo",
    result: "Identidade e comunicação alinhadas ao produto",
    grad: "linear-gradient(135deg, #1B4B89 0%, #387CD4 60%, #93B8E8 100%)",
    soon: true,
  },
];

function ProjectCard({
  project,
  delay,
  inView,
}: {
  project: typeof projects[0];
  delay: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      whileHover={{ scale: 1.02, boxShadow: "0 24px 48px rgba(0,0,0,0.15)", zIndex: 10 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "4px",
        overflow: "hidden",
        cursor: "default",
        aspectRatio: "4/3",
        background: project.grad,
      }}
    >
      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "clamp(20px, 3vw, 32px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.2em",
            }}
          >
            ({project.num})
          </span>
          {project.soon && (
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "9px",
                fontWeight: 400,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.25)",
                padding: "4px 10px",
                borderRadius: "100px",
              }}
            >
              Em breve
            </span>
          )}
        </div>

        {/* Bottom info */}
        <div>
          <motion.p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(11px, 1.3vw, 13px)",
              color: "rgba(255,255,255,0.65)",
              marginBottom: "8px",
              overflow: "hidden",
            }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {project.result}
          </motion.p>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
              fontWeight: 300,
              color: "#fff",
              letterSpacing: "-0.01em",
              lineHeight: 1.15,
            }}
          >
            {project.client}
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.06em",
              marginTop: "6px",
            }}
          >
            {project.type}
          </p>
        </div>
      </div>

      {/* Hover overlay */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.15)",
          pointerEvents: "none",
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="portfolio"
      ref={ref}
      className="section-pad"
      style={{ backgroundColor: "var(--c-bg)", position: "relative" }}
    >
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
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "clamp(40px, 6vw, 64px)",
          }}
        >
          <div>
            <motion.p
              className="t-label"
              style={{ color: "var(--c-text)", opacity: 0.38, marginBottom: "16px" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.38 } : { opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              Trabalhos
            </motion.p>
            <motion.p
              className="t-headline"
              style={{ color: "var(--c-text)", maxWidth: "560px" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.12 }}
            >
              Cases em construção.
            </motion.p>
          </div>

          <motion.p
            className="t-body"
            style={{ color: "var(--c-text)", opacity: 0.42, maxWidth: "320px", textAlign: "right" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.42 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            Nossos cases completos serão publicados em breve. Entre em contato para conhecer projetos realizados.
          </motion.p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(16px, 2vw, 24px)",
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.num} project={p} delay={0.2 + i * 0.1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
