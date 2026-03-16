"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const jobs = [
    "Softwareentwickler", "Tischler", "Architekt", "Zimmermann", "Laborant", 
    "Mechatroniker", "Designer", "Elektriker", "Zahntechniker", "Bauzeichner", 
    "Industriekaufmann", "Logistiker", "Koch", "Hotelfachmann", "Gärtner", 
    "Maler", "Maurer", "KFZ-Mechatroniker", "Mediengestalter", "Bankkaufmann"
  ];

  const videoSources = [
    "/videos/5198159-uhd_3840_2160_25fps.mp4",
    "/videos/6774781-uhd_3840_2160_30fps.mp4",
    "/videos/3205624-hd_1920_1080_25fps.mp4",
    "/videos/6169116-uhd_3840_2160_25fps.mp4",
    "/videos/4918222-uhd_4096_2160_25fps.mp4",
    "/videos/7311107-uhd_2160_4096_25fps.mp4"
  ];

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const blur = useTransform(scrollYProgress, [0, 0.35], ["blur(12px)", "blur(0px)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.98, 1]);

  return (
    <div className="min-h-screen selection:bg-emerald-800 selection:text-emerald-100 overflow-x-hidden">
      
      {/* NAVIGATION BAR */}
      <nav className="flex items-center justify-between px-8 py-8 mx-auto max-w-7xl">
        <div className="text-xl font-serif tracking-tight text-emerald-200/80">
          ExperienceMatch<span className="text-lime-300">.ai</span>
        </div>
        <div className="hidden md:flex space-x-8 text-[10px] font-bold tracking-[0.2em] text-emerald-100/60 uppercase">
          <a href="#" className="hover:text-lime-300 transition-colors">Vision</a>
          <a href="#" className="hover:text-lime-300 transition-colors">Für Unternehmen</a>
          <a href="#" className="hover:text-lime-300 transition-colors">Login</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="flex flex-col items-center justify-center px-6 pt-32 pb-12 text-center max-w-4xl mx-auto">
        <div className="inline-block px-3 py-1 mb-8 text-[10px] font-bold tracking-[0.2em] uppercase text-lime-300/80 border border-lime-300/20 bg-lime-300/5 rounded-sm">
          Eine neue Ära der Ausbildung
        </div>
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-8 text-emerald-50/90">
          Wo <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-lime-200">Charakter</span> auf Möglichkeiten trifft
        </h1>
        <p className="max-w-xl mx-auto mb-16 text-lg text-emerald-200/50 font-serif leading-relaxed">
          Die erste Matching-Plattform, die Unternehmenskultur und langfristige Passung über konventionelle Noten stellt. Kuratiert für die nächste Generation.
        </p>

        <div className="flex flex-col w-full space-y-4 md:flex-row md:space-y-0 md:space-x-6 md:justify-center">
          {/* Developer Note: Linking the primary CTA to the new Quiz section. */}
          <Link href="/quiz" className="px-10 py-3.5 text-sm font-semibold text-[#0a0c0a] transition-all bg-emerald-200 rounded-sm hover:bg-lime-200 text-center">
            Start your quiz
          </Link>
          <button className="px-10 py-3.5 text-sm font-semibold transition-all border border-emerald-200/20 text-emerald-100/80 rounded-sm hover:border-emerald-200/50 hover:bg-emerald-200/5">
            Partner werden
          </button>
        </div>
      </main>

      {/* OPTIMIZED SCROLL SECTION */}
      <motion.div 
        ref={targetRef}
        style={{ filter: blur, opacity, scale, willChange: "filter, transform, opacity" }}
        className="transition-all duration-500 ease-out"
      >
        <section className="mt-24 py-6 border-y border-emerald-900/10 bg-emerald-900/5 overflow-hidden">
          <div className="animate-marquee flex whitespace-nowrap space-x-12 px-12">
            {[...jobs, ...jobs].map((job, i) => (
              <span key={i} className="font-serif text-2xl font-light text-emerald-100/40 tracking-wide">
                {job}
              </span>
            ))}
          </div>
        </section>

        {/* INTERACTIVE VIDEO GALLERY */}
        <section className="py-12 border-b border-emerald-900/10 overflow-hidden">
          <div className="flex space-x-6 px-12 overflow-x-auto no-scrollbar py-8">
            {videoSources.map((src, i) => {
              const isHovered = hoveredIndex === i;
              const isAnyHovered = hoveredIndex !== null;
              const isOtherHovered = isAnyHovered && !isHovered;

              return (
                <motion.div 
                  key={i}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    filter: isOtherHovered ? "grayscale(100%)" : "grayscale(0%)",
                    opacity: isOtherHovered ? 0.5 : 1,
                  }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                  className="relative flex-none w-[320px] h-[480px] bg-emerald-900/20 rounded-sm overflow-hidden cursor-pointer transform-gpu"
                  style={{ willChange: "transform, filter" }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#0a0c0a]/60 via-transparent to-transparent z-10 transition-opacity duration-300 ${isOtherHovered ? 'opacity-0' : 'opacity-100'}`} />
                  <video 
                    src={src} 
                    autoPlay loop muted playsInline 
                    className="object-cover w-full h-full" 
                  />
                </motion.div>
              );
            })}
          </div>
        </section>
      </motion.div>

      {/* FEATURE HIGHLIGHTS */}
      <section className="px-8 py-32 border-t border-emerald-900/10">
        <div className="grid max-w-6xl gap-16 mx-auto md:grid-cols-3 text-left">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-light text-emerald-100/90">Kognitives Matching</h3>
            <p className="text-sm leading-relaxed text-emerald-200/40">Unsere KI evaluiert kognitive Merkmale und Arbeitsumgebungs-Präferenzen, um ein harmonisches Match vom ersten Tag an zu garantieren.</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-light text-emerald-100/90">Kulturelle Resonanz</h3>
            <p className="text-sm leading-relaxed text-emerald-200/40">Visuelle Storytelling-Einblicke ermöglichen es Bewerbern, die Atmosphäre zu spüren, noch vor dem ersten Gespräch.</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-light text-emerald-100/90">Effizienz im Fokus</h3>
            <p className="text-sm leading-relaxed text-emerald-200/40">Durch die Eliminierung von manuellem Aufwand ermöglichen wir es Menschen, sich auf echte Verbindungen zu konzentrieren.</p>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center border-t border-emerald-900/10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-emerald-200/20 font-medium">
          © 2026 ExperienceMatch | Curated for den DACH-Raum
        </p>
      </footer>
    </div>
  );
}
