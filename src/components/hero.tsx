"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/data/site";
import { projectById } from "@/data/projects";
import { Cta } from "@/components/cta";
import { useIntro, useProjects } from "@/components/providers";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const projects = useProjects();
  const hero = projectById("rooftop-seating", projects);
  const { phase } = useIntro();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const hidden = phase === "playing" || phase === "reveal";

  return (
    <section
      id="hero"
      data-header="ink"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col bg-[#07111C] lg:block lg:h-[100svh]"
    >
      <div className="relative min-h-[46svh] flex-1 overflow-hidden lg:absolute lg:inset-0 lg:min-h-0">
        {hero ? (
          <motion.div
            className="absolute inset-x-0 top-0 h-full lg:h-[112%]"
            style={reduce ? undefined : { y }}
          >
            <motion.div
              className="relative h-full w-full"
              initial={false}
              animate={{ scale: hidden ? 1.05 : 1 }}
              transition={{ duration: reduce ? 0 : 1.5, ease }}
            >
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_72%] lg:object-[38%_62%]"
              />
            </motion.div>
          </motion.div>
        ) : null}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#07111C]/60 to-transparent" />
      </div>

      <div className="relative z-10 mt-auto bg-[#F7F7F2] px-5 py-7 text-[#07111C] sm:px-8 sm:py-9 lg:absolute lg:bottom-0 lg:left-0 lg:mt-0 lg:w-[min(44rem,48%)] lg:px-12 lg:py-12">
        <Plate hidden={hidden} reduce={Boolean(reduce)} />
      </div>

      </section>
  );
}

function Plate({ hidden, reduce }: { hidden: boolean; reduce: boolean }) {
  return (
    <>
      <motion.p
        className="text-[0.68rem] tracking-[0.2em] text-[#145A80] sm:text-[0.72rem]"
        initial={false}
        animate={{ opacity: hidden ? 0 : 1, y: hidden ? 16 : 0 }}
        transition={{ duration: hidden || reduce ? 0 : 0.6, ease }}
      >
        {site.locationLabel}
      </motion.p>
      <motion.h1
        className="mt-4 font-display text-[clamp(2.65rem,8.4vw,4.7rem)] leading-[1.02] tracking-[-0.03em]"
        initial={false}
        animate={{ opacity: hidden ? 0 : 1, y: hidden ? 22 : 0 }}
        transition={{ duration: hidden || reduce ? 0 : 0.75, delay: hidden || reduce ? 0 : 0.08, ease }}
      >
        Η ΣΚΙΑΣΗ ΑΛΛΑΖΕΙ
        <br />
        ΤΟΝ ΧΩΡΟ.
      </motion.h1>
      <motion.p
        className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-[#101820]/80 sm:text-base"
        initial={false}
        animate={{ opacity: hidden ? 0 : 1, y: hidden ? 18 : 0 }}
        transition={{ duration: hidden || reduce ? 0 : 0.7, delay: hidden || reduce ? 0 : 0.18, ease }}
      >
        Σχεδιάζουμε και κατασκευάζουμε σύγχρονες λύσεις σκίασης, πέργκολες και
        ειδικές κατασκευές, προσαρμοσμένες στις ανάγκες κάθε χώρου.
      </motion.p>
      <motion.div
        className="mt-6 flex flex-col gap-3 xl:flex-row"
        initial={false}
        animate={{ opacity: hidden ? 0 : 1, y: hidden ? 16 : 0 }}
        transition={{ duration: hidden || reduce ? 0 : 0.7, delay: hidden || reduce ? 0 : 0.28, ease }}
      >
        <Cta href="#projects" tone="dark">
          ΑΝΑΚΑΛΥΨΤΕ ΤΑ ΕΡΓΑ ΜΑΣ
        </Cta>
        <Cta href="#contact" tone="dark" variant="ghost">
          ΖΗΤΗΣΤΕ ΠΡΟΣΦΟΡΑ
        </Cta>
      </motion.div>
      <a
        href="#statement"
        className="mt-6 inline-flex items-center gap-3 text-[0.65rem] tracking-[0.2em] text-[#07111C]/70"
      >
        ΚΥΛΙΣΤΕ
        <span aria-hidden className="block h-px w-10 bg-[#07111C]/40" />
      </a>
    </>
  );
}
