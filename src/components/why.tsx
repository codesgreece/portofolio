"use client";

import { projectById } from "@/data/projects";
import { reasons } from "@/data/content";
import { Reveal } from "@/components/reveal";
import { Still } from "@/components/still";
import { useProjects } from "@/components/providers";

export function Why() {
  const projects = useProjects();
  const image = projectById("square-shade", projects);

  return (
    <section data-header="ivory" className="bg-[#F7F7F2] text-[#07111C]">
      <div className="grid gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:px-14 lg:py-32">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-[0.72rem] tracking-[0.2em] text-[#145A80]">05 — Η ΠΡΟΣΕΓΓΙΣΗ</p>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,5.6vw,5rem)] leading-[1.02] tracking-[-0.03em]">
              Η ποιότητα φαίνεται
              <br />
              στην κατασκευή.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#101820]/78">
              Κάθε έργο αντιμετωπίζεται ξεχωριστά, με έμφαση στη σωστή εφαρμογή,
              την αισθητική και τη λειτουργικότητα.
            </p>
          </Reveal>
          <ol className="mt-12 border-t border-[#07111C]/12">
            {reasons.map((reason) => (
              <li key={reason.number} className="grid grid-cols-[auto_1fr] gap-5 border-b border-[#07111C]/12 py-7 sm:gap-8">
                <span className="font-display text-3xl leading-none text-[#318BC3]">
                  {reason.number}
                </span>
                <div>
                  <h3 className="font-display text-2xl leading-tight sm:text-[1.7rem]">
                    {reason.title}
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-[#101820]/75">
                    {reason.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        {image ? (
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Still
                project={image}
                aspect="aspect-[4/5]"
                sizes="(min-width: 1024px) 36vw, 100vw"
                interactive
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
