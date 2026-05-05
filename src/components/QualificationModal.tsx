"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/context/ModalContext";
import {
  qualificationQuestions,
  REJECTION_MESSAGE_TRIAGEM,
  REJECTION_MESSAGE_INVESTIMENTO,
  generateWhatsAppLink
} from "@/data/qualificationForm";

export default function QualificationModal() {
  const { isOpen, closeModal } = useModal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [rejection, setRejection] = useState<"triagem" | "investimento" | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  
  const [textInput, setTextInput] = useState("");

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset state on close after animation
      setTimeout(() => {
        setCurrentIndex(0);
        setAnswers({});
        setRejection(null);
        setIsFinished(false);
        setTextInput("");
      }, 300);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const getNextIndex = (startIndex: number, currentAnswers: Record<string, string>): number => {
    let nextIndex = startIndex + 1;
    while (nextIndex < qualificationQuestions.length) {
      const q = qualificationQuestions[nextIndex];
      if (!q.condition || q.condition(currentAnswers)) {
        return nextIndex;
      }
      nextIndex++;
    }
    return nextIndex;
  };

  const handleOptionSelect = (optionId: string, rejectType?: "triagem" | "investimento") => {
    const q = qualificationQuestions[currentIndex];
    const newAnswers = { ...answers, [q.id]: optionId };
    setAnswers(newAnswers);

    if (rejectType) {
      setRejection(rejectType);
      return;
    }

    const nextIndex = getNextIndex(currentIndex, newAnswers);
    if (nextIndex >= qualificationQuestions.length) {
      setIsFinished(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handleTextSubmit = () => {
    if (!textInput.trim()) return;
    
    const q = qualificationQuestions[currentIndex];
    const newAnswers = { ...answers, [q.id]: textInput };
    setAnswers(newAnswers);
    setTextInput("");

    const nextIndex = getNextIndex(currentIndex, newAnswers);
    if (nextIndex >= qualificationQuestions.length) {
      setIsFinished(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const q = qualificationQuestions[currentIndex];
  const progress = Math.min(((currentIndex + 1) / qualificationQuestions.length) * 100, 100);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(10, 15, 12, 0.65)", // Darker, slightly green-tinted overlay
        backdropFilter: "blur(12px)",
        padding: "clamp(16px, 3vw, 24px)"
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 30 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Custom spring-like easing
        style={{
          backgroundColor: "var(--background)",
          width: "100%",
          maxWidth: "640px", // Slightly wider for better text flow
          borderRadius: "12px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.1)", // Premium shadow
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
        }}
      >
        {/* Header / Progress */}
        <div style={{ padding: "24px 32px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ flex: 1, marginRight: "32px" }}>
            <div style={{ height: "3px", backgroundColor: "var(--border)", borderRadius: "3px", overflow: "hidden" }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ height: "100%", backgroundColor: "var(--primary)", boxShadow: "0 0 10px var(--primary)" }}
              />
            </div>
            {!rejection && !isFinished && (
              <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--foreground)", opacity: 0.4, marginTop: "12px", fontFamily: "var(--font-sans)", fontWeight: 500 }}>
                Etapa {currentIndex + 1} de {qualificationQuestions.length}
              </p>
            )}
          </div>
          <button 
            onClick={closeModal}
            aria-label="Fechar"
            style={{ background: "none", border: "none", fontSize: "28px", lineHeight: 1, color: "var(--foreground)", cursor: "pointer", opacity: 0.3, transition: "opacity 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "clamp(32px, 5vw, 48px) 32px", overflowY: "auto", flex: 1 }}>
          <AnimatePresence mode="wait">
            {rejection ? (
              <motion.div
                key="rejection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="t-headline" style={{ marginBottom: "16px", color: "var(--c-text)" }}>Pausa.</h3>
                <p className="t-body" style={{ color: "var(--c-text)", opacity: 0.8, marginBottom: "32px", lineHeight: 1.6 }}>
                  {rejection === "triagem" ? REJECTION_MESSAGE_TRIAGEM : REJECTION_MESSAGE_INVESTIMENTO}
                </p>
                <button
                  onClick={closeModal}
                  style={{
                    padding: "16px 32px",
                    backgroundColor: "var(--c-text)",
                    color: "var(--c-bg)",
                    border: "none",
                    borderRadius: "4px",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    cursor: "pointer",
                    width: "100%"
                  }}
                >
                  Fechar e voltar ao site
                </button>
              </motion.div>
            ) : isFinished ? (
              <motion.div
                key="finished"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ textAlign: "center" }}
              >
                <h3 className="t-headline" style={{ marginBottom: "16px", color: "var(--c-text)" }}>Tudo certo.</h3>
                <p className="t-body" style={{ color: "var(--c-text)", opacity: 0.8, marginBottom: "32px", lineHeight: 1.6 }}>
                  Seu perfil foi mapeado. Clique abaixo para enviar essas informações diretamente para o nosso WhatsApp e iniciarmos a conversa.
                </p>
                <a
                  href={generateWhatsAppLink(answers, "5511999999999")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeModal}
                  style={{
                    display: "inline-block",
                    padding: "16px 32px",
                    backgroundColor: "#25D366",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "4px",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    width: "100%",
                    boxShadow: "0 4px 12px rgba(37,211,102,0.3)",
                    transition: "transform 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Enviar Diagnóstico pelo WhatsApp
                </a>
              </motion.div>
            ) : (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="t-card-title" style={{ marginBottom: "40px", color: "var(--foreground)", lineHeight: 1.35, fontWeight: 400 }}>
                  {q.text}
                </h2>

                {q.type === "single" && q.options && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {q.options.map((opt, i) => (
                      <motion.button
                        key={opt.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        onClick={() => handleOptionSelect(opt.id, opt.rejectType)}
                        style={{
                          textAlign: "left",
                          padding: "18px 24px",
                          backgroundColor: "var(--muted)",
                          border: "1px solid var(--border)",
                          borderRadius: "12px",
                          color: "var(--foreground)",
                          fontFamily: "var(--font-sans)",
                          fontSize: "15px",
                          lineHeight: 1.5,
                          cursor: "pointer",
                          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                          display: "flex",
                          alignItems: "center",
                          gap: "16px"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--primary)";
                          e.currentTarget.style.backgroundColor = "var(--accent)";
                          e.currentTarget.style.transform = "translateX(8px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.backgroundColor = "var(--muted)";
                          e.currentTarget.style.transform = "translateX(0px)";
                        }}
                      >
                        <span style={{ fontSize: "11px", fontWeight: 600, opacity: 0.4, letterSpacing: "0.1em" }}>{opt.id}</span>
                        {opt.label}
                      </motion.button>
                    ))}
                  </div>
                )}

                {q.type === "text" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                  >
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder={q.placeholder}
                      style={{
                        width: "100%",
                        minHeight: "140px",
                        padding: "20px",
                        backgroundColor: "var(--muted)",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        color: "var(--foreground)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "15px",
                        lineHeight: 1.6,
                        resize: "vertical",
                        outline: "none",
                        transition: "border-color 0.2s ease, background-color 0.2s ease"
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "var(--primary)";
                        e.currentTarget.style.backgroundColor = "var(--background)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.backgroundColor = "var(--muted)";
                      }}
                      autoFocus
                    />
                    <button
                      onClick={handleTextSubmit}
                      disabled={!textInput.trim()}
                      style={{
                        padding: "18px",
                        backgroundColor: textInput.trim() ? "var(--primary)" : "var(--muted)",
                        color: textInput.trim() ? "var(--primary-foreground)" : "var(--muted-foreground)",
                        opacity: textInput.trim() ? 1 : 0.5,
                        border: "none",
                        borderRadius: "8px",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                        cursor: textInput.trim() ? "pointer" : "not-allowed",
                        transition: "all 0.2s",
                        boxShadow: textInput.trim() ? "0 8px 24px rgba(0,0,0,0.15)" : "none"
                      }}
                    >
                      Continuar →
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
