"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const limits = [
  "A Gaki não produz conteúdo sem estratégia definida.",
  "Não cria identidade visual desconectada do posicionamento.",
  "Não promete resultados baseados em volume ou viralização.",
  "Não aceita projetos sem alinhamento de propósito.",
];

const profile = [
  "Negócio em crescimento com produto ou serviço já validado",
  "Reconhece que comunicação é investimento, não custo",
  "Busca parceiro estratégico, não apenas executor",
  "Tem abertura para processo — diagnóstico antes de execução",
  "Valoriza clareza e autenticidade acima de tendências",
];

function Block({
  id,
  label,
  title,
  left,
  right,
}: {
  id?: string;
  label: string;
  title: React.ReactNode;
  left: { icon: string; items: string[] };
  right: { statement: string; close: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div id={id} ref={ref} style={{ padding: "clamp(64px, 10vw, 100px) 0", position: "relative" }}>
      <div
        style={{ position: "absolute", top: 0, left: "clamp(24px, 5vw, 64px)", right: "clamp(24px, 5vw, 64px)", height: "1px", backgroundColor: "var(--c-border)" }}
      />

      <div className="section-inner">
        <motion.p
          className="t-label"
          style={{ color: "var(--c-text)", opacity: 0.38, marginBottom: "clamp(24px, 4vw, 40px)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.38 } : { opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {label}
        </motion.p>

        <motion.p
          className="t-headline"
          style={{ color: "var(--c-text)", maxWidth: "800px", marginBottom: "clamp(40px, 6vw, 64px)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          {title}
        </motion.p>

        <div className="grid-2col">
          {/* Items */}
          <motion.ul
            style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "20px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.28 }}
          >
            {left.items.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span style={{ color: "var(--c-text)", opacity: 0.25, fontSize: "11px", marginTop: "4px", flexShrink: 0 }}>
                  {left.icon}
                </span>
                <span
                  className="t-body"
                  style={{ color: "var(--c-text)", opacity: 0.72 }}
                >
                  {item}
                </span>
              </li>
            ))}
          </motion.ul>

          {/* Quote */}
          <motion.div
            style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "16px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.44 }}
          >
            {right.statement && (
              <p
                className="t-body"
                style={{ color: "var(--c-text)", opacity: 0.55 }}
              >
                {right.statement}
              </p>
            )}
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                fontWeight: 400,
                lineHeight: 1.3,
                color: "var(--c-text)",
                opacity: 0.82,
              }}
            >
              {right.close}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Territory() {
  return (
    <section style={{ backgroundColor: "var(--c-bg)" }}>
      <Block
        label="Limites"
        title={<>Saber o que <span style={{ color: "var(--c-primary)" }}>não fazer</span> também é parte do método.</>}
        left={{ icon: "✕", items: limits }}
        right={{
          statement: "",
          close: "Esse limite não é rigidez. É coerência.",
        }}
      />
      <Block
        id="para-quem"
        label="Para Quem É"
        title={<>Não trabalhamos com todo tipo de empresa. Trabalhamos com o <span style={{ color: "var(--c-primary)" }}>tipo certo.</span></>}
        left={{ icon: "◆", items: profile }}
        right={{
          statement:
            "Se esse perfil não é familiar, provavelmente não somos a escolha certa.",
          close: "Se é familiar, a conversa vale.",
        }}
      />
    </section>
  );
}
