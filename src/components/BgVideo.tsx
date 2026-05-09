import { wedding } from '../data/content';

export default function BgVideo() {
  return (
    <>
      <video
        aria-hidden
        src={wedding.hero.video}
        poster={wedding.hero.slides[0]}
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none fixed inset-0 -z-50 h-[100svh] w-screen object-cover"
      />
      {/* dim overlay over fixed video for readability */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-40 h-[100svh] w-screen bg-black/40"
      />
    </>
  );
}
