"use client";

import React, { useRef, useCallback } from "react";
import { useSiteContent } from "@/context/SiteContentContext";

interface EditableTextProps {
  /** Dot-path into content.json, e.g. "hero.label" */
  fieldPath: string;
  /** Fallback text if content hasn't loaded yet */
  fallback?: string;
  /** HTML tag to render */
  as?: keyof React.JSX.IntrinsicElements;
  /** Whether this is a block-level element */
  block?: boolean;
  /** Extra class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Children to render (used as fallback if no content path value) */
  children?: React.ReactNode;
}

function getByPath(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((cur: unknown, key: string) => {
    if (cur && typeof cur === "object") return (cur as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

export default function EditableText({
  fieldPath,
  fallback = "",
  as: Tag = "span",
  block = false,
  className = "",
  style,
  children,
}: EditableTextProps) {
  const { content, isEditMode, updateField } = useSiteContent();
  const elRef = useRef<HTMLElement>(null);

  const value =
    content ? (getByPath(content, fieldPath) as string | undefined) : undefined;
  const displayText = value ?? fallback;

  const handleBlur = useCallback(() => {
    const el = elRef.current;
    if (!el) return;
    const newText = el.textContent ?? "";
    if (newText !== displayText) {
      updateField(fieldPath, newText);
    }
  }, [displayText, fieldPath, updateField]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        (e.target as HTMLElement).blur();
      }
      if (e.key === "Escape") {
        const el = elRef.current;
        if (el) {
          el.textContent = displayText;
          el.blur();
        }
      }
    },
    [displayText]
  );

  // If content hasn't loaded yet, render children or fallback
  if (!content) {
    if (children) {
      return <Tag className={className} style={style}>{children}</Tag>;
    }
    return <Tag className={className} style={style}>{fallback}</Tag>;
  }

  // Non-edit mode: plain render
  if (!isEditMode) {
    return (
      <Tag className={className} style={style}>
        {displayText}
      </Tag>
    );
  }

  // Edit mode: contentEditable
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = Tag as any;

  return (
    <span className="editable-wrap" data-block={block ? "true" : "false"}>
      <Component
        ref={elRef}
        className={`editable-text ${className}`}
        style={style}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        {displayText}
      </Component>
    </span>
  );
}
