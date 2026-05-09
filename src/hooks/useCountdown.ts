import { useEffect, useState } from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function compute(targetMs: number): TimeLeft {
  const diff = targetMs - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds, done: false };
}

export function useCountdown(targetIso: string): TimeLeft {
  const targetMs = new Date(targetIso).getTime();
  const [left, setLeft] = useState<TimeLeft>(() => compute(targetMs));

  useEffect(() => {
    const id = window.setInterval(() => setLeft(compute(targetMs)), 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  return left;
}
