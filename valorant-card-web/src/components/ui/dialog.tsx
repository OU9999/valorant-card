"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogBackdrop = ({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) => (
  <DialogPrimitive.Backdrop
    data-slot="dialog-backdrop"
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity",
      className,
    )}
    {...props}
  />
);

const DialogPopup = ({
  className,
  children,
  ...props
}: DialogPrimitive.Popup.Props) => (
  <DialogPrimitive.Popup
    data-slot="dialog-popup"
    className={cn(
      "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 shadow-lg",
      className,
    )}
    {...props}
  >
    {children}
    <DialogPrimitive.Close
      className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <X className="size-4" />
      <span className="sr-only">닫기</span>
    </DialogPrimitive.Close>
  </DialogPrimitive.Popup>
);

const DialogTitle = ({
  className,
  ...props
}: DialogPrimitive.Title.Props) => (
  <DialogPrimitive.Title
    data-slot="dialog-title"
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
);

const DialogDescription = ({
  className,
  ...props
}: DialogPrimitive.Description.Props) => (
  <DialogPrimitive.Description
    data-slot="dialog-description"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
