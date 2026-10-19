"use client";

import { projectById } from "@/data/projects";
import { Reveal } from "@/components/reveal";
import { Still } from "@/components/still";
import { useProjects } from "@/components/providers";

export function Statement() {
  const projects = useProjects();
  const image = projectById("corner-awnings", projects);

  return (
    <section
      id="statement"
      data-header="ivory"
      className="scroll-mt-24 bg-[#F7F7F2] text-[#07111C]"
    >
      <div className="px-5 py-24 sm:px-8 lg:px-14 lg:py-36">
        <Reveal>
          <p className="text-[0.72rem] tracking-[0.2em] text-[#145A80]">01 — Η ΕΤΑΙΡΕΙΑ</p>
        </Reveal>
        <div className="mt-8 grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-8">
            <h2 className="font-display text-[clamp(2.7rem,6.4vw,5.6rem)] leading-[1.02] tracking-[-0.03em]">
              Κάθε χώρος έχει
              <br />
              τη δική του λύση.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4" delay={0.08}>
            <p className="max-w-md text-lg leading-relaxed text-[#101820]/78">
              Από μια κατοικία μέχρι έναν επαγγελματικό ή ξενοδοχειακό χώρο,
              σχεδιάζουμε λύσεις που συνδυάζουν λειτουργικότητα, αισθητική και
              αντοχή στον χρόνο.
            </p>
          </Reveal>
        </div>
      </div>

      {image ? (
        <div className="grid grid-cols-12 items-end px-5 pb-20 sm:px-8 lg:px-14 lg:pb-28">
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <Still
              project={image}
              aspect="aspect-[4/5] md:aspect-[5/4]"
              sizes="(min-width: 768px) 46vw, 100vw"
              interactive
            />
            <p className="mt-4 text-[0.72rem] tracking-[0.16em] text-[#101820]/55">
              Σύγχρονες Τέντες
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
