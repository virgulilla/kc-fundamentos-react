import React from "react";

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-white/[0.03] dark:text-white">
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="border-danger text-danger hover:bg-danger/10 focus:ring-danger/50 rounded border px-4 py-2 focus:ring-2 focus:outline-none"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-danger hover:bg-danger/90 focus:ring-danger/50 rounded px-4 py-2 text-white focus:ring-2 focus:outline-none"
          >
            Confirmar borrado
          </button>
        </div>
      </div>
    </div>
  );
};
