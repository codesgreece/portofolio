"use client";

import { categories, type Project } from "@/data/projects";
import { Reveal } from "@/components/reveal";
import { Still } from "@/components/still";
import { useProjects } from "@/components/providers";

type Row =
  | { type: "full" | "narrow" | "modest"; item: Project; index: number }
  | { type: "pair"; items: [Project, Project?]; index: number };

function rowsOf(list: Project[]): Row[] {
  const rows: Row[] = [];
  let cursor = 0;
  let number = 1;
  while (cursor < list.length) {
    const item = list[cursor];
    if (item.frame === "pair") {
      const next = list[cursor + 1];
      if (next && next.frame === "pair") {
        rows.push({ type: "pair", items: [item, next], index: number });
        number += 2;
        cursor += 2;
        continue;
      }
    }
    rows.push({
      type: item.frame === "pair" ? "modest" : item.frame,
      item,
      index: number,
    });
    number += 1;
    cursor += 1;
  }
  return rows;
}

function Caption({ index, category, inset = false }: { index: number; category: string; inset?: boolean }) {
  return (
    <figcaption
      className={`mt-4 flex items-baseline justify-between gap-4 text-[0.78rem] ${
        inset ? "px-5 lg:px-14" : ""
      }`}
    >
      <span className="tracking-[0.18em] text-[#B9C5CE]">{String(index).padStart(2, "0")}</span>
      <span className="text-right text-[#F7F7F2]">{category}</span>
    </figcaption>
  );
}

export function Projects() {
  const projects = useProjects();
  const rows = rowsOf(projects);

  return (
    <section
      id="projects"
      data-header="ink"
      className="scroll-mt-24 bg-[#07111C] text-[#F7F7F2]"
    >
      <div className="px-5 py-24 sm:px-8 lg:px-14 lg:pb-16 lg:pt-32">
        <Reveal>
          <p className="text-[0.72rem] tracking-[0.2em] text-[#B9C5CE]">02 — ΕΡΓΑ</p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[1.02] tracking-[-0.03em]">
            Επιλεγμένα έργα
          </h2>
        </Reveal>
      </div>

      {projects.length === 0 ? (
        <div className="px-5 pb-24 sm:px-8 lg:px-14">
          <ol className="divide-y divide-white/12 border-y border-white/12">
            {Object.values(categories).map((label, index) => (
              <li key={label} className="flex items-baseline justify-between gap-6 py-6">
                <span className="text-[0.72rem] tracking-[0.18em] text-[#B9C5CE]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl sm:text-4xl">{label}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="flex flex-col gap-16 pb-24 lg:gap-24 lg:pb-32">
          {rows.map((row, rowIndex) => {
            if (row.type === "pair") {
              const [first, second] = row.items;
              const flip = rowIndex % 2 === 1;
              return (
                <div
                  key={first.id}
                  className="grid items-start gap-12 px-5 md:grid-cols-12 lg:px-14"
                >
                  <figure className={`md:col-span-7 ${flip ? "md:mt-16" : ""}`}>
                    <Still
                      project={first}
                      aspect={first.height > first.width ? "aspect-[3/4]" : "aspect-[4/3]"}
                      sizes="(min-width: 768px) 56vw, 100vw"
                      interactive
                    />
                    <Caption index={row.index} category={categories[first.category]} />
                  </figure>
                  {second ? (
                    <figure className={`md:col-span-5 ${flip ? "" : "md:mt-16"}`}>
                      <Still
                        project={second}
                        aspect={second.height > second.width ? "aspect-[3/4]" : "aspect-[5/4]"}
                        sizes="(min-width: 768px) 38vw, 100vw"
                        interactive
                      />
                      <Caption index={row.index + 1} category={categories[second.category]} />
                    </figure>
                  ) : null}
                </div>
              );
            }

            const width =
              row.type === "narrow"
                ? "mx-auto w-full max-w-sm px-5"
                : row.type === "modest"
                  ? "mx-auto w-full max-w-3xl px-5"
                  : "";

            return (
              <figure key={row.item.id} className={width}>
                <Still
                  project={row.item}
                  aspect={
                    row.type === "full"
                      ? "aspect-[4/5] md:aspect-[16/10] lg:aspect-[2/1]"
                      : row.item.height > row.item.width
                        ? "aspect-[3/4]"
                        : "aspect-[4/3]"
                  }
                  sizes={row.type === "full" ? "100vw" : "(min-width: 768px) 40vw, 100vw"}
                  interactive
                />
                <Caption
                  index={row.index}
                  category={categories[row.item.category]}
                  inset={row.type === "full"}
                />
              </figure>
            );
          })}
        </div>
      )}
    </section>
  );
}
