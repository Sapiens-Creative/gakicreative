"use client";

import React, { useEffect } from "react";
import { useSiteContent } from "@/context/SiteContentContext";
import "./editor.css";

export default function EditorToolbar() {
  const { isEditMode, isDirty, changeCount, saveAll, discardChanges, saveStatus } =
    useSiteContent();

  // Set body attribute so CSS knows we're editing
  useEffect(() => {
    if (isEditMode) {
      document.body.setAttribute("data-editing", "true");
    } else {
      document.body.removeAttribute("data-editing");
    }
    return () => {
      document.body.removeAttribute("data-editing");
    };
  }, [isEditMode]);

  if (!isEditMode) return null;

  const btnLabel = () => {
    switch (saveStatus) {
      case "saving":
        return "Salvando…";
      case "saved":
        return "✓ Salvo!";
      case "error":
        return "✕ Erro";
      default:
        return "Salvar";
    }
  };

  const btnClass = () => {
    switch (saveStatus) {
      case "saved":
        return "editor-toolbar__btn editor-toolbar__btn--saved";
      case "error":
        return "editor-toolbar__btn editor-toolbar__btn--error";
      default:
        return "editor-toolbar__btn editor-toolbar__btn--save";
    }
  };

  return (
    <>
      <div className="editor-toolbar">
        <div className="editor-toolbar__left">
          <span className="editor-toolbar__badge">
            <span className="editor-toolbar__pulse" />
            Modo Edição
          </span>
          {isDirty && (
            <span className="editor-toolbar__changes">
              {changeCount} alteraç{changeCount === 1 ? "ão" : "ões"} pendente
              {changeCount === 1 ? "" : "s"}
            </span>
          )}
        </div>
        <div className="editor-toolbar__right">
          {isDirty && (
            <button
              className="editor-toolbar__btn editor-toolbar__btn--discard"
              onClick={discardChanges}
            >
              Descartar
            </button>
          )}
          <button
            className={btnClass()}
            onClick={saveAll}
            disabled={!isDirty || saveStatus === "saving"}
          >
            {btnLabel()}
          </button>
        </div>
      </div>

      {/* Push content down so toolbar doesn't overlap */}
      <div style={{ height: "48px" }} />
    </>
  );
}
