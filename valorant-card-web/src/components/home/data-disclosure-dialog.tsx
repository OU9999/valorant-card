"use client";

import { ShieldAlert, Clock, Eye } from "lucide-react";
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
  const handlePreview = () => {
    onOpenChange(false);
    onPreview();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <DialogTitle>계정 연동 안내</DialogTitle>
          <DialogDescription className="mt-2">
            Riot 계정으로 로그인하여 카드를 생성합니다.
          </DialogDescription>

          <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                계정 연동 시 플레이어 데이터가 공개됩니다
              </p>
              <p className="text-xs text-muted-foreground">
                매치 기록, 경쟁전 랭크, 퍼포먼스 스탯 등이 카드에 표시됩니다.
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-start gap-3 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
            <Clock className="mt-0.5 size-5 shrink-0 text-blue-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                Riot 심사 대기 중
              </p>
              <p className="text-xs text-muted-foreground">
                현재 Riot Games Production Key 심사를 기다리고 있어 로그인이 불가합니다.
                임시로 카드 디자인을 미리 확인할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              취소
            </Button>
            <Button onClick={handlePreview} className="gap-2">
              <Eye className="size-4" />
              카드 디자인 미리보기
            </Button>
          </div>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  );
};

export { DataDisclosureDialog };
