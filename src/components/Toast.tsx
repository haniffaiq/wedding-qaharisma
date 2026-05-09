import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

type ToastCtx = {
  show: (msg: string) => void;
};

const Ctx = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);

  const show = useCallback((m: string) => {
    setMsg(m);
  }, []);

  useEffect(() => {
    if (!msg) return;
    const id = window.setTimeout(() => setMsg(null), 2000);
    return () => window.clearTimeout(id);
  }, [msg]);

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed inset-x-0 bottom-8 z-[100] flex justify-center transition-all duration-300 ${
          msg ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}
      >
        {msg && (
          <div className="rounded-full bg-ink px-5 py-2.5 text-sm tracking-wide text-white shadow-lg">
            {msg}
          </div>
        )}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
