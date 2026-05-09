import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

type Ctx = {
  color: string;
  setColor: (c: string) => void;
};

const DEFAULT = '#a88b5c';
const STORAGE_KEY = 'wedding:accent';

const AccentColorContext = createContext<Ctx | null>(null);

export function AccentColorProvider({ children }: { children: ReactNode }) {
  const [color, setColorState] = useState<string>(() => {
    if (typeof window === 'undefined') return DEFAULT;
    return window.localStorage.getItem(STORAGE_KEY) ?? DEFAULT;
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', color);
    window.localStorage.setItem(STORAGE_KEY, color);
  }, [color]);

  const setColor = useCallback((c: string) => {
    setColorState(c);
  }, []);

  return (
    <AccentColorContext.Provider value={{ color, setColor }}>{children}</AccentColorContext.Provider>
  );
}

export function useAccentColor() {
  const ctx = useContext(AccentColorContext);
  if (!ctx) throw new Error('useAccentColor must be used within AccentColorProvider');
  return ctx;
}
