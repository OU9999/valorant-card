"use client";

import { useState, useRef, useEffect } from "react";
import { Link, Check } from "lucide-react";
import { HudButton } from "@/components/button/hud-button";

const CopyUrlButton = () => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  /** 언마운트 시 타이머 정리 */
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    if (copied) return;

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  return (
    <HudButton variant="secondary" onClick={handleCopy}>
      {copied ? (
        <Check className="size-4" />
      ) : (
        <Link className="size-4" />
      )}
      {copied ? "Copied!" : "Share"}
    </HudButton>
  );
};

export { CopyUrlButton };
