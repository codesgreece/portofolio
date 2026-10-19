"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";
import { useIntro } from "@/components/providers";

const STORAGE_KEY = "tdk-intro";

export function Intro() {
  const reduce = useReducedMotion();
  const { phase, setPhase } = useIntro();
  const timers = useRef<number[]>([]);
  const release = useRef<() => void>(() => undefined);

  useEffect(() => {
    if (reduce) {
      setPhase("done");
      return;
    }

    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }

    if (seen) {
      setPhase("done");
      return;
    }

    const covered = [
      document.querySelector("header"),
      document.getElementById("main"),
      document.getElementById("footer"),
    ];
    const unlock = () => covered.forEach((node) => node?.removeAttribute("inert"));
    release.current = unlock;
    covered.forEach((node) => node?.setAttribute("inert", ""));
    setPhase("playing");

    const revealTimer = window.setTimeout(() => {
      unlock();
      setPhase("reveal");
    }, 980);
    const doneTimer = window.setTimeout(() => {
      unlock();
      setPhase("done");
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* storage unavailable */
      }
    }, 1760);
    timers.current = [revealTimer, doneTimer];

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(doneTimer);
      unlock();
    };
  }, [reduce, setPhase]);

  function skip() {
    timers.current.forEach((id) => window.clearTimeout(id));
    release.current();
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage unavailable */
    }
    setPhase("done");
  }

  return (
    <AnimatePresence>
      {phase === "playing" ? (
        <motion.button
          type="button"
          onClick={skip}
          className="fixed inset-0 z-[80] flex cursor-pointer flex-col items-center justify-center bg-[#07111C] px-6 text-[#F7F7F2]"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.82, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="sr-only">Παράλειψη εισαγωγής. </span>
          <motion.span
            className="font-display text-[0.78rem] tracking-[0.28em] sm:text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {site.nameUpper}
          </motion.span>
          <motion.span
            aria-hidden
            className="mt-6 block h-px w-24 origin-center bg-[#318BC3] sm:w-36"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.32, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
