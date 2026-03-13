import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "warning";

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: number) => void;
}

export default function Toast({ toasts, onRemove }: ToastProps) {
  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

const TYPE_CLASSES: Record<ToastType, string> = {
  success: "border-success",
  error: "border-danger",
  warning: "border-warning",
};

const TEXT_CLASSES: Record<ToastType, string> = {
  success: "text-success",
  error: "text-danger",
  warning: "text-warning",
};

const ICONS: Record<ToastType, string> = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
};

function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastMessage;
  onRemove: (id: number) => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div
      className={`toast show d-flex align-items-center gap-2 border-start border-4 shadow-sm rounded-3 px-3 py-2 mb-2 bg-white ${TYPE_CLASSES[toast.type]}`}
      style={{
        minWidth: 260,
        maxWidth: 340,
        cursor: "pointer",
        transition: "all 0.3s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(40px)",
      }}
      onClick={() => onRemove(toast.id)}
    >
      <span>{ICONS[toast.type]}</span>
      <span
        className={`small fw-medium flex-grow-1 ${TEXT_CLASSES[toast.type]}`}
      >
        {toast.message}
      </span>
      <button
        className="btn-close btn-close-sm ms-2"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(toast.id);
        }}
      />
    </div>
  );
}
