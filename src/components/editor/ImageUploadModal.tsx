"use client";

import React, { useState, useRef, useCallback } from "react";

interface ImageUploadModalProps {
  currentSrc: string;
  onConfirm: (newUrl: string) => void;
  onCancel: () => void;
}

export default function ImageUploadModal({
  currentSrc,
  onConfirm,
  onCancel,
}: ImageUploadModalProps) {
  const [url, setUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setPreviewUrl(data.url);
        setUrl(data.url);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setUrl(v);
    if (v.startsWith("http") || v.startsWith("/")) {
      setPreviewUrl(v);
    }
  };

  const finalUrl = url || previewUrl;

  return (
    <div className="image-modal-overlay" onClick={onCancel}>
      <div className="image-modal" onClick={(e) => e.stopPropagation()}>
        <p className="image-modal__title">Trocar imagem</p>

        {/* Drop zone */}
        <div
          className={`image-modal__dropzone ${dragOver ? "image-modal__dropzone--dragover" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <p className="image-modal__dropzone-text">
            {uploading
              ? "Enviando..."
              : "Arraste uma imagem aqui ou clique para selecionar"}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <p className="image-modal__or">ou cole uma URL</p>

        {/* URL input */}
        <input
          type="text"
          className="image-modal__url-input"
          placeholder="https://exemplo.com/imagem.jpg"
          value={url}
          onChange={handleUrlChange}
        />

        {/* Preview */}
        <div className="image-modal__preview" style={{ display: "flex", gap: "12px" }}>
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(237,227,213,0.35)",
                padding: "8px 12px 0",
              }}
            >
              Atual
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={currentSrc} alt="Atual" />
          </div>
          {previewUrl && (
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C4A94D",
                  padding: "8px 12px 0",
                }}
              >
                Nova
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Preview" />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="image-modal__actions">
          <button className="image-modal__btn image-modal__btn--cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button
            className="image-modal__btn image-modal__btn--confirm"
            disabled={!finalUrl || uploading}
            onClick={() => finalUrl && onConfirm(finalUrl)}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
