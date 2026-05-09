"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/");
      } else {
        setError(data.error || "Senha incorreta");
      }
    } catch {
      setError("Erro ao tentar fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--c-bg-inv)",
        color: "var(--c-text-inv)",
        padding: "24px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "100%",
          maxWidth: "360px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gaki-logo.svg"
            alt="Gaki Logo"
            style={{
              height: "24px",
              width: "auto",
              opacity: 0.5,
              filter: "brightness(5)",
              margin: "0 auto 24px",
            }}
          />
          <h1 className="t-label" style={{ opacity: 0.5 }}>
            Área de Edição
          </h1>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="password"
            placeholder="Senha de acesso"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(237, 227, 213, 0.2)",
              borderRadius: "4px",
              color: "#fff",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            autoFocus
          />
          {error && (
            <p
              style={{
                color: "#ff6b6b",
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: "var(--c-primary)",
              color: "#1a1a18",
              border: "none",
              borderRadius: "4px",
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: loading || !password ? "not-allowed" : "pointer",
              opacity: loading || !password ? 0.5 : 1,
              transition: "opacity 0.2s, transform 0.2s",
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <a
          href="/"
          style={{
            textAlign: "center",
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            color: "var(--c-text-inv)",
            opacity: 0.3,
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginTop: "16px",
          }}
        >
          ← Voltar ao site
        </a>
      </motion.div>
    </div>
  );
}
