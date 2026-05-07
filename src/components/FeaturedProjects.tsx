"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Estúdio",
    italic: "",
    description:
      "Criação de identidade visual, branding e materiais gráficos. O trabalho visual é orientado pelo posicionamento. A estética serve à estratégia — nunca o contrário.",
    note: "Para empresas que precisam que a imagem comunique o que o negócio realmente entrega.",
    grad: "linear-gradient(135deg, #1B4F3D 0%, #2E7D5F 50%, #A8D5BA 100%)",
  },
  {
    num: "02",
    title: "Conteúdo",
    italic: "e Social",
    description:
      "Planejamento editorial, produção de conteúdo e gestão de redes sociais. O foco é consistência e relevância ao longo do tempo — não volume ou viralização.",
    note: "Para empresas que precisam de presença contínua com sentido, não apenas com frequência.",
    grad: "linear-gradient(135deg, #9E8315 0%, #E2B917 50%, #E5D07B 100%)",
  },
  {
    num: "03",
    title: "Consultoria",
    italic: "",
    description:
      "Diagnóstico de comunicação, definição de posicionamento e arquitetura de mensagem. O ponto de entrada natural para quem precisa entender onde está antes de decidir para onde vai.",
    note: "Para empresas que sabem que algo precisa mudar, mas ainda não sabem exatamente o quê.",
    grad: "linear-gradient(135deg, #1B4B89 0%, #387CD4 50%, #93B8E8 100%)",
  },
];

export default function FeaturedProjects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState<number | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <section
      id="servicos"
      ref={ref}
      className="section-pad"
      style={{ backgroundColor: "var(--c-bg)" }}
      onMouseMove={onMouseMove}
    >
      <div className="section-inner">

        {/* Header */}
        <motion.p
          className="t-label"
          style={{ color: "var(--c-text)", opacity: 0.4, marginBottom: "24px" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          Frentes de Serviço
        </motion.p>

        <motion.div
          style={{ marginBottom: "clamp(40px, 6vw, 72px)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p
            className="t-headline"
            style={{ color: "var(--c-text)" }}
          >
            Três frentes. Uma só lógica.
          </p>
        </motion.div>

        {/* List */}
        <div>
          {services.map((s, i) => (
            <React.Fragment key={s.num}>
              <div style={{ height: "1px", backgroundColor: "var(--c-border)" }} />
              <motion.div
                style={{ 
                  padding: "clamp(24px, 4vw, 40px) 24px", 
                  cursor: "default",
                  borderRadius: "12px",
                  margin: "0 -24px",
                  transition: "background-color 0.4s ease",
                  backgroundColor: hovered === i ? "rgba(0,0,0,0.02)" : "transparent"
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="service-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr 1fr",
                    gap: "clamp(16px, 3vw, 32px)",
                    alignItems: "start",
                    transition: "transform 0.4s ease",
                    transform: hovered === i ? "translateX(12px)" : "translateX(0)",
                  }}
                >
                  {/* Number */}
                  <span
                    className="service-num"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "12px",
                      fontWeight: 300,
                      color: "var(--c-text)",
                      opacity: 0.28,
                      paddingTop: "6px",
                    }}
                  >
                    ({s.num})
                  </span>

                  {/* Title */}
                  <div>
                    <p
                      className="t-card-title"
                      style={{ 
                        color: hovered === i ? "var(--c-primary)" : "var(--c-text)",
                        transition: "color 0.4s ease" 
                      }}
                    >
                      {s.title}
                    </p>
                    {s.italic && (
                      <p
                        className="t-card-title"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontStyle: "italic",
                          fontWeight: 400,
                          color: "var(--c-text)",
                          opacity: 0.9,
                          marginTop: "4px",
                        }}
                      >
                        {s.italic}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <p
                      className="t-body"
                      style={{ color: "var(--c-text)", opacity: 0.65 }}
                    >
                      {s.description}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: "13px",
                        lineHeight: 1.6,
                        color: "var(--c-text)",
                        opacity: 0.42,
                      }}
                    >
                      {s.note}
                    </p>
                  </div>
                </div>
              </motion.div>
            </React.Fragment>
          ))}
          <div style={{ height: "1px", backgroundColor: "var(--c-border)" }} />

          <motion.p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(13px, 1.5vw, 15px)",
              color: "var(--c-text)",
              opacity: 0.38,
              textAlign: "center",
              marginTop: "32px",
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.38 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Cada frente pode operar de forma independente ou integrada, de acordo com o momento do seu negócio.
          </motion.p>
        </div>
      </div>

      {/* Hover preview — hidden on touch */}
      {hovered !== null && (
        <div
          className="hover-preview active"
          style={{
            left: mouse.x - 190,
            top: mouse.y - 130,
            background: services[hovered].grad,
          }}
        />
      )}
    </section>
  );
}
