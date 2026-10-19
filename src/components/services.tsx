"use client";

import { projectById } from "@/data/projects";
import { services } from "@/data/content";
import { Reveal } from "@/components/reveal";
import { Still } from "@/components/still";
import { useProjects } from "@/components/providers";

export function Services() {
  const projects = useProjects();

  return (
    <section
      id="services"
      data-header="ivory"
      className="scroll-mt-24 bg-[#F7F7F2] text-[#07111C]"
    >
      <div className="px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <Reveal>
          <p className="text-[0.72rem] tracking-[0.2em] text-[#145A80]">03 — ΥΠΗΡΕΣΙΕΣ</p>
          <div className="mt-6 grid items-end gap-8 lg:grid-cols-12">
            <h2 className="font-display text-[clamp(2.6rem,5.8vw,5.2rem)] leading-[1.02] tracking-[-0.03em] lg:col-span-7">
              Λύσεις σκίασης.
              <br />
              Σχεδιασμένες για εσάς.
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-[#101820]/78 lg:col-span-5">
              Μελετάμε κάθε χώρο ξεχωριστά και προτείνουμε κατασκευές που
              ανταποκρίνονται στις πραγματικές ανάγκες του, με έμφαση στην
              ποιότητα, τη λειτουργικότητα και το τελικό αποτέλεσμα.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 border-t border-[#07111C]/12">
          {services.map((service, index) => {
            const project = service.projectId
              ? projectById(service.projectId, projects)
              : undefined;
            const reverse = index % 2 === 1;
            return (
              <article
                key={service.id}
                className="grid items-center gap-8 border-b border-[#07111C]/12 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20"
              >
                <div className={reverse ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-5"}>
                  {project ? (
                    <Still
                      project={project}
                      aspect={project.height > project.width ? "aspect-[4/5]" : "aspect-[5/4]"}
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      interactive
                    />
                  ) : (
                    <div className="flex aspect-[5/4] items-end border border-[#07111C]/15 p-6">
                      <span className="font-display text-[6rem] leading-none text-[#07111C]/12">
                        {service.number}
                      </span>
                    </div>
                  )}
                </div>
                <div
                  className={
                    reverse
                      ? "lg:col-span-6 lg:col-start-1 lg:row-start-1"
                      : "lg:col-span-6 lg:col-start-7"
                  }
                >
                  <Reveal>
                    <p className="text-[0.72rem] tracking-[0.18em] text-[#145A80]">
                      {service.number}
                    </p>
                    <h3 className="mt-3 font-display text-[clamp(2rem,3.4vw,3.4rem)] leading-[1.05] tracking-[-0.03em]">
                      {service.title}
                    </h3>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-[#101820]/78 sm:text-lg">
                      {service.body}
                    </p>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
