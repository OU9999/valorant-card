"use client";

import { ShieldAlert, Clock, Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DataDisclosureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPreview: () => void;
}

const DataDisclosureDialog = ({
  open,
  onOpenChange,
  onPreview,
}: DataDisclosureDialogProps) => {
  const t = useTranslations("DataDisclosure");

  const handlePreview = () => {
    onOpenChange(false);
    onPreview();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription className="mt-2">
            {t("description")}
          </DialogDescription>

          <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                {t("dataWarningTitle")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("dataWarningDescription")}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-start gap-3 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
            <Clock className="mt-0.5 size-5 shrink-0 text-blue-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                {t("riotReviewTitle")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("riotReviewDescription")}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              {t("cancel")}
            </Button>
            <Button onClick={handlePreview} className="gap-2">
              <Eye className="size-4" />
              {t("previewDesign")}
            </Button>
          </div>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  );
};

export { DataDisclosureDialog };
