"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "./AnimatedText";
import EditableText from "./editor/EditableText";
import { useSiteContent } from "@/context/SiteContentContext";

function Block({
  labelPath,
  defaultLabel,
  titlePath,
  defaultTitle,
  paragraphsPath,
  defaultParagraphs,
  delay = 0,
}: {
  labelPath: string;
  defaultLabel: string;
  titlePath: string;
  defaultTitle: string;
  paragraphsPath: string;
  defaultParagraphs: string[];
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { content, isEditMode } = useSiteContent();

  const getByPath = (obj: Record<string, unknown>, path: string) => {
    return path.split(".").reduce((cur: unknown, key: string) => {
      if (cur && typeof cur === "object") return (cur as Record<string, unknown>)[key];
      return undefined;
    }, obj);
  };

  const titleValue = content ? (getByPath(content, titlePath) as string) : undefined;
  const displayTitle = titleValue ?? defaultTitle;

  return (
    <div ref={ref}>
      <motion.div
        style={{ marginBottom: "clamp(24px, 3vw, 40px)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.35 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay }}
      >
        <EditableText
          fieldPath={labelPath}
          as="p"
          className="t-label"
          style={{ color: "var(--c-text-inv)" }}
          fallback={defaultLabel}
        />
      </motion.div>

      <div style={{ maxWidth: "800px" }}>
        {isEditMode ? (
          <EditableText
            fieldPath={titlePath}
            as="h2"
            className="t-headline"
            style={{ color: "var(--c-text-inv)" }}
            fallback={defaultTitle}
          />
        ) : (
          <AnimatedText
            text={displayTitle}
            as="h2"
            className="t-headline"
            style={{
              color: "var(--c-text-inv)",
            } as React.CSSProperties}
            delay={delay + 0.15}
            by="word"
          />
        )}
      </div>

      <motion.div
        className="t-body"
        style={{ color: "var(--c-text-inv)", opacity: 0.55, maxWidth: "540px", marginTop: "clamp(20px, 3vw, 40px)", display: "flex", flexDirection: "column", gap: "20px" }}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 0.55, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.8, delay: delay + 0.4 }}
      >
        {defaultParagraphs.map((_, i) => (
          <p key={i}>
            <EditableText
              fieldPath={`${paragraphsPath}.${i}`}
              as="span"
              fallback={defaultParagraphs[i]}
            />
          </p>
        ))}
      </motion.div>
    </div>
  );
}

export default function WhatWeDo() {
  const { content } = useSiteContent();
  const blocks = content?.whatWeDo?.blocks || [
    {
      label: "O Espelho",
      title: "Existe um padrão que se repete em empresas que estão crescendo.",
      paragraphs: [
        "O produto funciona. O time funciona. As vendas acontecem — às vezes por esforço puro, às vezes por indicação.",
        "Mas, em algum momento, surge uma percepção incômoda: a comunicação não acompanha o que o negócio entrega de verdade.",
        "A identidade visual ficou no passado. O conteúdo existe, mas parece aleatório. O posicionamento nunca foi definido com clareza — funcionou sem isso por um tempo, mas já não funciona mais.",
        "Não é crise. É crescimento sem comunicação proporcional."
      ]
    },
    {
      label: "O Diagnóstico Silencioso",
      title: "O problema raramente é execução. É ausência de direção.",
      paragraphs: [
        "A maioria das empresas não precisa de mais conteúdo. Precisa de conteúdo certo. Não precisa de mais identidade visual. Precisa de uma que comunique o que a empresa realmente é. Não precisa de mais presença digital. Precisa de presença com sentido.",
        "A execução sem estratégia gera trabalho. A estratégia sem execução gera planos. O que resolve é a integração entre os dois."
      ]
    }
  ];

  return (
    <section
      style={{
        backgroundColor: "var(--c-bg-inv)",
        color: "var(--c-text-inv)",
        position: "relative",
        overflow: "hidden",
      }}
      className="section-pad"
    >
      {/* Ícone de fundo flutuante */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
        whileInView={{ opacity: 0.05, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "min(400px, 60vw)",
          height: "min(400px, 60vw)",
          backgroundImage: "url('/gaki-icon.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div className="section-inner" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(64px, 10vw, 120px)" }}>
          {blocks.map((block: any, i: number) => (
            <Block
              key={i}
              labelPath={`whatWeDo.blocks.${i}.label`}
              defaultLabel={block.label}
              titlePath={`whatWeDo.blocks.${i}.title`}
              defaultTitle={block.title}
              paragraphsPath={`whatWeDo.blocks.${i}.paragraphs`}
              defaultParagraphs={block.paragraphs}
              delay={0}
            />
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", backgroundColor: "rgba(237,227,213,0.1)" }} />
    </section>
  );
}
