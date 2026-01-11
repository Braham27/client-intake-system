"use client";

import * as React from "react";
import { useToast as useToastHook } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Toaster() {
  const { toasts, dismiss } = useToastHook();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "flex items-center gap-4 rounded-lg px-4 py-3 shadow-lg animate-fade-in",
            toast.variant === "destructive"
              ? "bg-destructive text-destructive-foreground"
              : "bg-card border"
          )}
        >
          <div className="flex-1">
            {toast.title && (
              <p className="font-medium">{toast.title}</p>
            )}
            {toast.description && (
              <p className="text-sm opacity-90">{toast.description}</p>
            )}
          </div>
          <button
            onClick={() => dismiss(toast.id)}
            className="rounded-full p-1 hover:bg-black/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
