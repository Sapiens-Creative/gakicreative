"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import EditableText from "./editor/EditableText";
import { useSiteContent } from "@/context/SiteContentContext";

function Block({
  id,
  labelPath,
  defaultLabel,
  titlePath,
  defaultTitle,
  titleHighlightPath,
  defaultTitleHighlight,
  titlePrefix,
  titleSuffix,
  icon,
  itemsPath,
  defaultItems,
  statementPath,
  defaultStatement,
  closePath,
  defaultClose,
}: {
  id?: string;
  labelPath: string;
  defaultLabel: string;
  titlePath: string;
  defaultTitle: string;
  titleHighlightPath: string;
  defaultTitleHighlight: string;
  titlePrefix: string;
  titleSuffix: string;
  icon: string;
  itemsPath: string;
  defaultItems: string[];
  statementPath?: string;
  defaultStatement?: string;
  closePath: string;
  defaultClose: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { isEditMode } = useSiteContent();

  return (
    <div id={id} ref={ref} style={{ padding: "clamp(64px, 10vw, 100px) 0", position: "relative" }}>
      <div
        style={{ position: "absolute", top: 0, left: "clamp(24px, 5vw, 64px)", right: "clamp(24px, 5vw, 64px)", height: "1px", backgroundColor: "var(--c-border)" }}
      />

      <div className="section-inner">
        <motion.div
          style={{ marginBottom: "clamp(24px, 4vw, 40px)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <EditableText
            fieldPath={labelPath}
            as="p"
            className="t-label"
            style={{ color: "var(--c-text)", opacity: 0.38 }}
            fallback={defaultLabel}
          />
        </motion.div>

        <motion.div
          style={{ maxWidth: "800px", marginBottom: "clamp(40px, 6vw, 64px)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          <p className="t-headline" style={{ color: "var(--c-text)" }}>
            {titlePrefix}{" "}
            {isEditMode ? (
              <>
                <EditableText
                  fieldPath={titlePath}
                  as="span"
                  fallback={defaultTitle}
                />{" "}
                <EditableText
                  fieldPath={titleHighlightPath}
                  as="span"
                  style={{ color: "var(--c-primary)" }}
                  fallback={defaultTitleHighlight}
                />
              </>
            ) : (
              <>
                <EditableText
                  fieldPath={titlePath}
                  as="span"
                  fallback={defaultTitle}
                />{" "}
                <span style={{ color: "var(--c-primary)" }}>
                  <EditableText
                    fieldPath={titleHighlightPath}
                    as="span"
                    fallback={defaultTitleHighlight}
                  />
                </span>
              </>
            )}
            {titleSuffix}
          </p>
        </motion.div>

        <div className="grid-2col">
          {/* Items */}
          <motion.ul
            style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "20px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.28 }}
          >
            {defaultItems.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span style={{ color: "var(--c-text)", opacity: 0.25, fontSize: "11px", marginTop: "4px", flexShrink: 0 }}>
                  {icon}
                </span>
                <span
                  className="t-body"
                  style={{ color: "var(--c-text)", opacity: 0.72 }}
                >
                  <EditableText
                    fieldPath={`${itemsPath}.${i}`}
                    as="span"
                    fallback={item}
                  />
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
            {statementPath && (
              <EditableText
                fieldPath={statementPath}
                as="p"
                className="t-body"
                style={{ color: "var(--c-text)", opacity: 0.55 }}
                fallback={defaultStatement}
              />
            )}
            <EditableText
              fieldPath={closePath}
              as="p"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                fontWeight: 400,
                lineHeight: 1.3,
                color: "var(--c-text)",
                opacity: 0.82,
              }}
              fallback={defaultClose}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Territory() {
  const { content } = useSiteContent();

  const defaultLimits = [
    "A Gaki não produz conteúdo sem estratégia definida.",
    "Não cria identidade visual desconectada do posicionamento.",
    "Não promete resultados baseados em volume ou viralização.",
    "Não aceita projetos sem alinhamento de propósito.",
  ];

  const defaultProfile = [
    "Negócio em crescimento com produto ou serviço já validado",
    "Reconhece que comunicação é investimento, não custo",
    "Busca parceiro estratégico, não apenas executor",
    "Tem abertura para processo — diagnóstico antes de execução",
    "Valoriza clareza e autenticidade acima de tendências",
  ];

  const limits = content?.territory?.limits?.items || defaultLimits;
  const profile = content?.territory?.profile?.items || defaultProfile;

  return (
    <section style={{ backgroundColor: "var(--c-bg)" }}>
      <Block
        labelPath="territory.limits.label"
        defaultLabel="Limites"
        titlePath="territory.limits.title"
        defaultTitle="Saber o que"
        titleHighlightPath="territory.limits.titleHighlight"
        defaultTitleHighlight="não fazer"
        titlePrefix=""
        titleSuffix=" também é parte do método."
        icon="✕"
        itemsPath="territory.limits.items"
        defaultItems={limits}
        closePath="territory.limits.close"
        defaultClose="Esse limite não é rigidez. É coerência."
      />
      <Block
        id="para-quem"
        labelPath="territory.profile.label"
        defaultLabel="Para Quem É"
        titlePath="territory.profile.title"
        defaultTitle="Não trabalhamos com todo tipo de empresa. Trabalhamos com o"
        titleHighlightPath="territory.profile.titleHighlight"
        defaultTitleHighlight="tipo certo."
        titlePrefix=""
        titleSuffix=""
        icon="◆"
        itemsPath="territory.profile.items"
        defaultItems={profile}
        statementPath="territory.profile.statement"
        defaultStatement="Se esse perfil não é familiar, provavelmente não somos a escolha certa."
        closePath="territory.profile.close"
        defaultClose="Se é familiar, a conversa vale."
      />
    </section>
  );
}
