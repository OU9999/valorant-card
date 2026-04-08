"use client";

import { useState, type RefObject } from "react";
import { toPng } from "html-to-image";
import { Download, Loader2 } from "lucide-react";
import { HudButton } from "@/components/hud-button/hud-button";

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
    <HudButton variant="primary" onClick={handleSave} disabled={saving}>
      {saving ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Download className="size-4" />
      )}
      {saving ? "Saving..." : "Save"}
    </HudButton>
  );
};

export { SaveCardButton };
