"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Question {
  id: number;
  title: string;
  type: "choice" | "text";
  options?: {
    label: string;
    sub: string;
    category: string;
  }[];
  placeholder?: string;
}

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [currentText, setCurrentText] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [textAnswers, setTextAnswers] = useState<string[]>([]);
  const [showRefinement, setShowRefinement] = useState(false);
  const [manualJob, setManualJob] = useState("");

  const questions: Question[] = [
    { id: 1, title: "Wo fühlst du dich am wohlsten?", type: "choice", options: [{ label: "Im Freien & aktiv", sub: "Aktivität & Natur", category: "creator" }, { label: "Im Büro & fokussiert", sub: "Struktur & Fokus", category: "maker" }] },
    { id: 2, title: "Wie löst du am liebsten Probleme?", type: "choice", options: [{ label: "Mit meinen Händen", sub: "Handwerk & Physis", category: "creator" }, { label: "Mit dem Kopf & Code", sub: "Logik & Abstraktion", category: "maker" }] },
    { id: 3, title: "Was motiviert dich mehr?", type: "choice", options: [{ label: "Sichtbare Ergebnisse", sub: "Etwas zum Anfassen", category: "creator" }, { label: "Komplexe Systeme", sub: "Verstehen wie Dinge laufen", category: "maker" }] },
    { id: 4, title: "Arbeitest du lieber...", type: "choice", options: [{ label: "Eng im Team", sub: "Gemeinsam gewinnen", category: "connector" }, { label: "Eigenständig", sub: "Tiefe Konzentration", category: "strategist" }] },
    { id: 5, title: "Was ist dir wichtiger?", type: "choice", options: [{ label: "Tradition & Beständigkeit", sub: "Bewährtes Wissen", category: "creator" }, { label: "Innovation & Wandel", sub: "Puls der Zeit", category: "maker" }] },
    { id: 6, title: "Was ist dein liebstes Hobby?", type: "text", placeholder: "z.B. Gaming, Kochen, Fußball..." },
    { id: 7, title: "Was fasziniert dich aktuell am meisten?", type: "text", placeholder: "z.B. KI, Weltraum, Fotografie..." },
    { id: 8, title: "Welche Eigenschaft beschreibt dich am besten?", type: "text", placeholder: "z.B. neugierig, geduldig, kreativ..." }
  ];

  const refinementQuestions: Question[] = [
    { id: 9, title: "Wie wichtig ist dir Reisetätigkeit?", type: "choice", options: [{ label: "Immer vor Ort", sub: "Stammplatz bevorzugt", category: "local" }, { label: "Gerne unterwegs", sub: "Abwechslung & Reisen", category: "travel" }] },
    { id: 10, title: "Wie gehst du mit Risiko um?", type: "choice", options: [{ label: "Sicherheit zuerst", sub: "Klare Strukturen", category: "safe" }, { label: "Mut zum Neuen", sub: "Experimentierfreude", category: "risk" }] },
    { id: 11, title: "Wie viel Kundenkontakt wünschst du dir?", type: "choice", options: [{ label: "Direkter Kontakt", sub: "Menschen beraten", category: "social" }, { label: "Hinter den Kulissen", sub: "Fokus auf die Arbeit", category: "technical" }] }
  ];

  const persona = useMemo(() => {
    const counts = answers.reduce((acc: any, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

    if (counts.maker > counts.creator) {
      return { 
        title: "Der Digitale Architekt", 
        desc: "Du baust Welten aus Logik und Code. Deine Stärke liegt in der Analyse komplexer Systeme.",
        match: "Softwareentwickler"
      };
    }
    return { 
      title: "Der Meister-Gestalter", 
      desc: "Du erschaffst Reales mit Präzision. Deine Hände sind das Werkzeug deiner Vision.",
      match: "Tischler"
    };
  }, [answers]);

  const handleChoice = (category: string) => {
    setAnswers([...answers, category]);
    setStep(step + 1);
  };

  const handleTextSubmit = () => {
    if (currentText.trim().length > 0) {
      setTextAnswers([...textAnswers, currentText]);
      setCurrentText("");
      setStep(step + 1);
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 10, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -10, filter: "blur(10px)" },
  };

  const currentQuestion = step <= questions.length ? questions[step - 1] : refinementQuestions[step - questions.length - 1];

  return (
    <div className="min-h-screen bg-[#0a0c0a] text-emerald-50/90 selection:bg-emerald-800 font-sans flex flex-col items-center justify-center px-6 overflow-hidden">
      
      <div className="absolute top-8 left-8">
        <Link href="/" className="text-sm font-serif tracking-tight text-emerald-200/40 hover:text-emerald-200 transition-colors">
          ← ExperienceMatch<span className="text-lime-300/50">.ai</span>
        </Link>
      </div>

      <div className="max-w-md w-full">
        <AnimatePresence mode="wait">
          
          {step === 0 && (
            <motion.div key="name" variants={fadeUp} initial="initial" animate="animate" exit="exit" className="space-y-8">
              <h1 className="font-serif text-4xl font-light">Wie dürfen wir dich nennen?</h1>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Dein Vorname" className="w-full bg-transparent border-b border-emerald-900/30 py-4 text-xl font-serif text-emerald-50 focus:outline-none focus:border-lime-300/50 transition-colors" autoFocus />
              <button onClick={() => name.length > 1 && setStep(1)} disabled={name.length < 2} className="w-full py-4 text-sm font-semibold rounded-sm bg-emerald-200 text-black hover:bg-lime-200 disabled:opacity-20 transition-all">Los geht&apos;s</button>
            </motion.div>
          )}

          {step > 0 && step <= (showRefinement ? questions.length + refinementQuestions.length : questions.length) && (
            <motion.div key={`q-${step}`} variants={fadeUp} initial="initial" animate="animate" exit="exit" className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-lime-300/80">Schritt {step}</span>
                <h2 className="font-serif text-3xl font-light">{currentQuestion.title}</h2>
              </div>
              {currentQuestion.type === "choice" ? (
                <div className="grid gap-4">
                  {currentQuestion.options?.map((opt, i) => (
                    <button key={i} onClick={() => handleChoice(opt.category)} className="w-full p-6 text-left border border-emerald-900/20 bg-emerald-900/5 rounded-sm hover:border-lime-300/40 transition-all group">
                      <div className="text-lg font-serif italic text-emerald-100 group-hover:text-lime-200">{opt.label}</div>
                      <div className="text-xs text-emerald-200/30">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <input type="text" placeholder={currentQuestion.placeholder} value={currentText} onChange={(e) => setCurrentText(e.target.value)} className="w-full bg-transparent border-b border-emerald-900/30 py-4 text-xl font-serif text-emerald-50 focus:outline-none focus:border-lime-300/50 transition-colors" autoFocus />
                  <button onClick={handleTextSubmit} className="w-full py-4 bg-emerald-200 text-black font-semibold rounded-sm hover:bg-lime-200 transition-all">Weiter</button>
                </div>
              )}
            </motion.div>
          )}

          {step > (showRefinement ? questions.length + refinementQuestions.length : questions.length) && (
            <motion.div key="result" variants={fadeUp} initial="initial" animate="animate" exit="exit" className="space-y-8">
              
              {/* 
                  SIMPLIFIED CHARACTER IDENTITY:
                  Removed the video to focus on clean typography and branding.
                  Using a subtle border and lime accents instead.
              */}
              <div className="space-y-6 pt-4 border-l-2 border-lime-300/20 pl-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-lime-300/80">Deine Identität</span>
                  <h3 className="font-serif text-4xl text-emerald-50 leading-tight">{persona.title}</h3>
                </div>
                <p className="text-emerald-200/50 text-base font-serif leading-relaxed italic max-w-sm">
                  &quot;{persona.desc}&quot;
                </p>
              </div>

              <div className="space-y-6 pt-12">
                <div className="space-y-2">
                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-200/30">Dein Top Match</div>
                  <div className="text-3xl font-serif text-emerald-50">{manualJob || persona.match}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-12">
                <Link href="/signin?mode=signup" className="block w-full py-4 bg-emerald-200 text-black font-semibold rounded-sm hover:bg-lime-200 shadow-[0_0_20px_rgba(163,230,53,0.1)] transition-all text-center">
                  Profil speichern & Bewerben
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => {setShowRefinement(true); setStep(questions.length + 1);}} className="py-3 text-xs border border-emerald-900/30 text-emerald-200/40 rounded-sm hover:border-emerald-200/50 transition-all">
                    Passt nicht ganz?
                  </button>
                  <button onClick={() => {const job = prompt("Was wäre dein Wunschberuf?"); if(job) setManualJob(job);}} className="py-3 text-xs border border-emerald-900/30 text-emerald-200/40 rounded-sm hover:border-emerald-200/50 transition-all">
                    Eigenen Beruf adden
                  </button>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
