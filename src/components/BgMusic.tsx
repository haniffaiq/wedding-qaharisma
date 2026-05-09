import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { wedding } from '../data/content';
import { useIntro } from '../context/IntroContext';

export default function BgMusic() {
  const { opened } = useIntro();
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!opened) return;
    const audio = ref.current;
    if (!audio) return;
    audio.volume = 0.55;
    const tryPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };
    tryPlay();
  }, [opened]);

  const toggle = async () => {
    const audio = ref.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  if (!opened) return null;

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-ink/85 text-white shadow-lg backdrop-blur transition-transform hover:scale-105 md:bottom-7 md:right-7"
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 rounded-full border border-accent/60 ${
            playing ? 'animate-ping' : ''
          }`}
        />
        {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
      </button>
      <audio ref={ref} src={wedding.bgm} loop preload="auto" />
    </>
  );
}
