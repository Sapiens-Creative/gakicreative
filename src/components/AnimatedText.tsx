"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  by?: "word" | "char";
  once?: boolean;
}

export default function AnimatedText({
  text,
  as: Tag = "div",
  className = "",
  style,
  delay = 0,
  by = "word",
  once = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  const units = by === "word" ? text.split(" ") : text.split("");

  return (
    <Tag
      // @ts-expect-error polymorphic ref
      ref={ref}
      className={className}
      style={style}
      aria-label={text}
    >
      <span aria-hidden="true" style={{ display: "inline" }}>
        {units.map((unit, i) => (
          <span
            key={i}
            style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
          >
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ y: "102%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : { y: "102%", opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: delay + i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {unit}
              {by === "word" && i < units.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
