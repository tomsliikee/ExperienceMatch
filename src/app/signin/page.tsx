"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Developer Note: Wrapping in Suspense for Next.js 13+ client-side params.
function SignInContent() {
  const searchParams = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Developer Note: Automatically switch to Sign Up mode if 'mode=signup' is in URL.
  useEffect(() => {
    if (searchParams.get("mode") === "signup") {
      setIsSignUp(true);
    }
  }, [searchParams]);

  const fadeUp = {
    initial: { opacity: 0, y: 10, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <motion.div 
      variants={fadeUp}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-sm w-full space-y-12"
    >
      <div className="space-y-4 text-center">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-lime-300/80">
          {isSignUp ? "Account erstellen" : "Willkommen zurück"}
        </span>
        <h1 className="font-serif text-4xl font-light tracking-tight text-emerald-50/90">
          {isSignUp ? "Deine Reise beginnt." : "Melde dich an."}
        </h1>
        <p className="text-emerald-200/40 text-sm font-serif italic">
          {isSignUp 
            ? "Sichere dir dein Charakter-Profil und deine Matches." 
            : "Verwalte deine Bewerbungen und optimiere dein Profil."}
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold tracking-widest uppercase text-emerald-200/30 pl-1">E-Mail</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@beispiel.de"
            className="w-full bg-emerald-900/5 border border-emerald-900/20 px-4 py-3.5 text-emerald-50 rounded-sm focus:outline-none focus:border-lime-300/40 focus:bg-emerald-900/10 transition-all font-serif placeholder:text-emerald-900/40"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-bold tracking-widest uppercase text-emerald-200/30">Passwort</label>
            {!isSignUp && (
              <a href="#" className="text-[9px] font-bold tracking-widest uppercase text-emerald-200/20 hover:text-lime-300/50 transition-colors">Vergessen?</a>
            )}
          </div>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-emerald-900/5 border border-emerald-900/20 px-4 py-3.5 text-emerald-50 rounded-sm focus:outline-none focus:border-lime-300/40 focus:bg-emerald-900/10 transition-all font-serif placeholder:text-emerald-900/40"
          />
        </div>

        <button className="w-full py-4 text-sm font-semibold text-[#0a0c0a] transition-all bg-emerald-200 rounded-sm hover:bg-lime-200 hover:shadow-[0_0_20px_rgba(163,230,53,0.1)] active:scale-95">
          {isSignUp ? "Profil speichern" : "Anmelden"}
        </button>
      </div>

      <div className="pt-8 text-center border-t border-emerald-900/10">
        <p className="text-sm font-serif text-emerald-200/30">
          {isSignUp ? "Bereits ein Konto?" : "Noch kein Profil?"}{" "}
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-emerald-100 hover:text-lime-300 transition-colors underline underline-offset-4 decoration-emerald-900/50"
          >
            {isSignUp ? "Hier anmelden" : "Jetzt Quiz starten"}
          </button>
        </p>
      </div>
    </motion.div>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#0a0c0a] text-emerald-50/90 selection:bg-emerald-800 font-sans flex flex-col items-center justify-center px-6">
      
      <div className="absolute top-8 left-8">
        <Link href="/" className="text-sm font-serif tracking-tight text-emerald-200/40 hover:text-emerald-200 transition-colors">
          ← ExperienceMatch<span className="text-lime-300/50">.ai</span>
        </Link>
      </div>

      <Suspense fallback={<div className="text-emerald-200/20 font-serif italic">Lädt...</div>}>
        <SignInContent />
      </Suspense>

      <footer className="absolute bottom-8 text-[9px] tracking-[0.3em] uppercase text-emerald-200/10 font-medium">
        ExperienceMatch Security Protocol v1.0
      </footer>
    </div>
  );
}
