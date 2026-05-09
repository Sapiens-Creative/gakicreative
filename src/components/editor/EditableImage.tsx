"use client";

import React, { useState } from "react";
import { useSiteContent } from "@/context/SiteContentContext";
import ImageUploadModal from "./ImageUploadModal";

interface EditableImageProps {
  /** Dot-path into content.json for the image URL */
  fieldPath: string;
  /** Current src fallback */
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
}

function getByPath(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((cur: unknown, key: string) => {
    if (cur && typeof cur === "object") return (cur as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

export default function EditableImage({
  fieldPath,
  src,
  alt,
  style,
  className = "",
}: EditableImageProps) {
  const { content, isEditMode, updateField } = useSiteContent();
  const [showModal, setShowModal] = useState(false);

  const currentSrc = content
    ? (getByPath(content, fieldPath) as string | undefined) ?? src
    : src;

  const handleConfirm = (newUrl: string) => {
    updateField(fieldPath, newUrl);
    setShowModal(false);
  };

  if (!isEditMode) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={currentSrc} alt={alt} style={style} className={className} />
    );
  }

  return (
    <>
      <div
        className={`editable-image-wrap ${className}`}
        onClick={() => setShowModal(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setShowModal(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={currentSrc} alt={alt} style={style} />
      </div>
      {showModal && (
        <ImageUploadModal
          currentSrc={currentSrc}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}
