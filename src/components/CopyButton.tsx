import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { useToast } from './Toast';

type Props = {
  value: string;
  label?: string;
  className?: string;
};

export default function CopyButton({ value, label = 'Copy', className = '' }: Props) {
  const [copied, setCopied] = useState(false);
  const { show } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      show('Copied to clipboard');
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      show('Copy failed');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs uppercase tracking-widest transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? 'Copied' : label}
    </button>
  );
}
