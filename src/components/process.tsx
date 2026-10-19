"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { steps } from "@/data/content";
import { Reveal } from "@/components/reveal";

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} data-header="ink" className="bg-[#07111C] text-[#F7F7F2]">
      <div className="px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <Reveal>
          <p className="text-[0.72rem] tracking-[0.2em] text-[#B9C5CE]">06 — Η ΔΙΑΔΙΚΑΣΙΑ</p>
          <h2 className="mt-5 font-display text-[clamp(2.6rem,5.8vw,5.2rem)] leading-[1.02] tracking-[-0.03em]">
            Από την ιδέα
            <br />
            στην κατασκευή.
          </h2>
        </Reveal>

        <div className="relative mt-16 lg:mt-24">
          <div className="absolute bottom-0 left-[7px] top-2 w-px bg-white/15 lg:hidden" />
          <motion.div
            className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-[#318BC3] lg:hidden"
            style={{ scaleY: reduce ? 1 : scaleY }}
          />
          <div className="absolute left-0 right-0 top-3 hidden h-px bg-white/15 lg:block" />
          <motion.div
            className="absolute left-0 right-0 top-3 hidden h-px origin-left bg-[#318BC3] lg:block"
            style={{ scaleX: reduce ? 1 : scaleX }}
          />

          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {steps.map((step) => (
              <li key={step.number} className="relative pl-10 lg:pl-0 lg:pt-12">
                <span
                  aria-hidden
                  className="absolute left-0 top-1 h-[15px] w-[15px] bg-[#07111C] ring-1 ring-[#318BC3] lg:left-0 lg:top-[7px]"
                />
                <p className="text-[0.72rem] tracking-[0.18em] text-[#318BC3]">{step.number}</p>
                <h3 className="mt-3 font-display text-[1.7rem] leading-tight">{step.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-[#B9C5CE]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
