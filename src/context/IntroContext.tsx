import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

type IntroCtx = {
  opened: boolean;
  open: () => void;
};

const Ctx = createContext<IntroCtx | null>(null);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  const open = useCallback(() => setOpened(true), []);

  return <Ctx.Provider value={{ opened, open }}>{children}</Ctx.Provider>;
}

export function useIntro() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useIntro must be used within IntroProvider');
  return ctx;
}
