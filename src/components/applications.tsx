"use client";

import { categories, projectById } from "@/data/projects";
import { applicationPhotos, applicationTypes } from "@/data/content";
import { Reveal } from "@/components/reveal";
import { Still } from "@/components/still";
import { useProjects } from "@/components/providers";

const aspects = ["aspect-[4/5] md:aspect-[4/5]", "aspect-[4/5]", "aspect-[16/10]"];
const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-12"];

export function Applications() {
  const projects = useProjects();
  const photos = applicationPhotos
    .map((id) => projectById(id, projects))
    .filter((project) => project !== undefined);

  return (
    <section
      id="applications"
      data-header="ink"
      className="scroll-mt-24 bg-[#101820] text-[#F7F7F2]"
    >
      <div className="px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <Reveal>
          <p className="text-[0.72rem] tracking-[0.2em] text-[#B9C5CE]">04 — ΕΦΑΡΜΟΓΕΣ</p>
        </Reveal>
        <div className="mt-6 grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <h2 className="font-display text-[clamp(2.6rem,6vw,5.4rem)] leading-[1.02] tracking-[-0.03em]">
              Οι εξωτερικοί χώροι
              <br />
              γίνονται προορισμός.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4" delay={0.08}>
            <p className="max-w-md text-lg leading-relaxed text-[#B9C5CE]">
              Δημιουργούμε λύσεις σκίασης για ξενοδοχεία, εστιατόρια, καφέ και
              επαγγελματικούς χώρους, με στόχο την αναβάθμιση της αισθητικής και
              της λειτουργικότητάς τους.
            </p>
          </Reveal>
        </div>

        {photos.length > 0 ? (
          <div className="mt-14 grid items-start gap-8 md:grid-cols-12 lg:mt-20">
            {photos.map((project, index) => (
              <figure key={project.id} className={spans[index] ?? "md:col-span-6"}>
                <Still
                  project={project}
                  aspect={aspects[index] ?? "aspect-[4/3]"}
                  sizes={index === 2 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                  interactive
                />
                <figcaption className="mt-4 text-[0.78rem] text-[#B9C5CE]">
                  {categories[project.category]}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}

        <ol className="mt-16 border-y border-white/12 lg:mt-20">
          {applicationTypes.map((item) => (
            <li
              key={item.number}
              className="grid items-baseline gap-3 border-b border-white/12 py-6 last:border-b-0 md:grid-cols-12 md:py-8"
            >
              <span className="text-[0.72rem] tracking-[0.18em] text-[#B9C5CE] md:col-span-2">
                {item.number}
              </span>
              <h3 className="font-display text-[clamp(1.6rem,3vw,2.6rem)] leading-tight md:col-span-10">
                {item.title}
              </h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
