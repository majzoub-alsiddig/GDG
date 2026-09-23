// src/components/editor/RichTextEditor.tsx
"use client";

import type { JSONContent } from "@tiptap/core";
import { useEffect, useRef, useState } from "react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import "./editor.css";

type RichTextEditorProps = {
  value?: JSONContent;
  onChange?: (json: JSONContent) => void;
  minHeight?: string;
  className?: string;
};

function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function CollapseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />
    </svg>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  minHeight = "420px",
  className = "",
}: RichTextEditorProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenSupported, setFullscreenSupported] = useState(true);

  // Check API availability on mount
  useEffect(() => {
    setFullscreenSupported(
      typeof document !== "undefined" &&
        typeof document.documentElement.requestFullscreen === "function"
    );
  }, []);

  // Sync state with the browser's fullscreen state
  useEffect(() => {
    function handleChange() {
      setIsFullscreen(
        typeof document !== "undefined" &&
          document.fullscreenElement === wrapperRef.current
      );
    }
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  async function toggleFullscreen() {
    if (!wrapperRef.current) return;
    try {
      if (document.fullscreenElement === wrapperRef.current) {
        await document.exitFullscreen();
      } else {
        await wrapperRef.current.requestFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen toggle failed:", err);
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={`rich-text-editor ${className}`}
      style={{ ["--rte-min-height" as string]: minHeight }}
      data-fullscreen={isFullscreen ? "true" : "false"}
    >
      {fullscreenSupported && (
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          aria-pressed={isFullscreen}
          title={isFullscreen ? "Exit fullscreen (Esc)" : "Fullscreen"}
          className="rich-text-editor-fullscreen-btn"
        >
          {isFullscreen ? (
            <CollapseIcon className="h-4 w-4" />
          ) : (
            <ExpandIcon className="h-4 w-4" />
          )}
        </button>
      )}

      <SimpleEditor initialContent={value} onChange={onChange} />
    </div>
  );
}