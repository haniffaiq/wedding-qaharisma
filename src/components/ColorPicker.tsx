import { Palette } from 'lucide-react';
import { useAccentColor } from '../context/AccentColorContext';

const PRESETS = ['#a88b5c', '#7a8b6b', '#9c6b54', '#5e6f8a', '#b07b8a', '#3f3a35'];

export default function ColorPicker() {
  const { color, setColor } = useAccentColor();

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-ink/15 bg-white/60 px-4 py-2 backdrop-blur">
      <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted">
        <Palette size={14} />
        Accent
      </span>
      <div className="flex items-center gap-1.5">
        {PRESETS.map((c) => (
          <button
            key={c}
            type="button"
            aria-label={`Set accent to ${c}`}
            onClick={() => setColor(c)}
            className={`h-5 w-5 rounded-full ring-offset-2 transition-all ${
              color.toLowerCase() === c ? 'ring-2 ring-ink/40' : 'hover:scale-110'
            }`}
            style={{ background: c }}
          />
        ))}
        <label className="ml-1 cursor-pointer">
          <span className="sr-only">Custom color</span>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-5 w-5 cursor-pointer rounded-full border-0 bg-transparent p-0"
          />
        </label>
      </div>
    </div>
  );
}
