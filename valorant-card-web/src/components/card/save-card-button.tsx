"use client";

import { useState, type RefObject } from "react";
import { toPng } from "html-to-image";
import { Download, Loader2 } from "lucide-react";

interface SaveCardButtonProps {
  cardRef: RefObject<HTMLDivElement | null>;
  fileName?: string;
}

const SaveCardButton = ({
  cardRef,
  fileName = "valorant-card",
}: SaveCardButtonProps) => {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!cardRef.current || saving) return;

    setSaving(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        fetchRequestInit: { mode: "cors" },
      });

      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to save card as image:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={saving}
      className="flex cursor-pointer items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {saving ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Download className="size-4" />
      )}
      {saving ? "Saving..." : "Save as Image"}
    </button>
  );
};

export { SaveCardButton };
