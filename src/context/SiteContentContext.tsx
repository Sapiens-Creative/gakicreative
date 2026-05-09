"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ContentData = Record<string, any>;

interface SiteContentContextValue {
  content: ContentData | null;
  isEditMode: boolean;
  isDirty: boolean;
  changeCount: number;
  updateField: (path: string, value: unknown) => void;
  saveAll: () => Promise<void>;
  discardChanges: () => void;
  saveStatus: "idle" | "saving" | "saved" | "error";
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Helper: deep get / set by dot-path                                 */
/* ------------------------------------------------------------------ */
function deepSet(obj: ContentData, path: string, value: unknown): ContentData {
  const clone = structuredClone(obj);
  const keys = path.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cur: any = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (cur[k] === undefined) cur[k] = {};
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = value;
  return clone;
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */
export function SiteContentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [content, setContent] = useState<ContentData | null>(null);
  const originalRef = useRef<ContentData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [changeCount, setChangeCount] = useState(0);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  // Detect ?edit=true
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsEditMode(params.get("edit") === "true");
  }, []);

  // Load content from API
  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        setContent(data);
        originalRef.current = structuredClone(data);
      })
      .catch(console.error);
  }, []);

  const isDirty = changeCount > 0;

  // Warn on unload if dirty
  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const updateField = useCallback((path: string, value: unknown) => {
    setContent((prev) => {
      if (!prev) return prev;
      return deepSet(prev, path, value);
    });
    setChangeCount((c) => c + 1);
    setSaveStatus("idle");
  }, []);

  const saveAll = useCallback(async () => {
    if (!content) return;
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error("Save failed");
      originalRef.current = structuredClone(content);
      setChangeCount(0);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  }, [content]);

  const discardChanges = useCallback(() => {
    if (originalRef.current) {
      setContent(structuredClone(originalRef.current));
      setChangeCount(0);
      setSaveStatus("idle");
    }
  }, []);

  return (
    <SiteContentContext.Provider
      value={{
        content,
        isEditMode,
        isDirty,
        changeCount,
        updateField,
        saveAll,
        discardChanges,
        saveStatus,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */
export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx)
    throw new Error("useSiteContent must be used within SiteContentProvider");
  return ctx;
}
