"use client";

import { useState, useCallback, useRef, useEffect } from "react";

type Toast = { id: number; message: string };

let addToastGlobal: ((msg: string) => void) | null = null;

export function showToast(msg: string) {
  addToastGlobal?.(msg);
}

export default function ToastProvider() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const addToast = useCallback((message: string) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  useEffect(() => {
    addToastGlobal = addToast;
    return () => { addToastGlobal = null; };
  }, [addToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[200] space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-[var(--black)] text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg animate-fade-in flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
          {t.message}
        </div>
      ))}
    </div>
  );
}
