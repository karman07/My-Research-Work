import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 text-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(128,0,0,0.05)_0%,transparent_100%)]" />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-[#800000] to-[#4a0000] dark:from-[#ff8a8a] dark:to-[#ff4d4d]">
          3D Asset Generation System
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
          A comprehensive research exploration into web-based photogrammetry and asynchronous reconstruction architectures.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/docs"
            className="px-8 py-3 rounded-full bg-[#800000] dark:bg-[#ff8a8a] text-white dark:text-[#4a0000] font-semibold transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg shadow-maroon-500/20"
          >
            Read Research Paper
          </Link>
          <Link
            href="/docs/sample"
            className="px-8 py-3 rounded-full border border-[#800000]/30 bg-[#800000]/5 dark:bg-[#ff8a8a]/15 font-semibold transition-all hover:bg-[#800000]/10 dark:hover:bg-[#ff8a8a]/20 active:scale-95"
          >
            Open Sample Doc
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-border bg-background/50 backdrop-blur-sm font-semibold transition-all hover:bg-accent active:scale-95"
          >
            View Source
          </a>
        </div>
      </div>
    </div>
  );
}
