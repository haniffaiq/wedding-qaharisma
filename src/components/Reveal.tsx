import type { ElementType, ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'up' | 'zoom';
  as?: ElementType;
};

export default function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'up',
  as: Tag = 'div',
}: Props) {
  const { ref, visible } = useReveal<HTMLElement>();
  const base = variant === 'zoom' ? 'reveal-zoom' : 'reveal';

  return (
    <Tag
      ref={ref}
      className={`${base} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}
