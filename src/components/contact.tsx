"use client";

import Image from "next/image";
import { site } from "@/data/site";
import { projectById } from "@/data/projects";
import { Cta } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { useProjects } from "@/components/providers";

export function Contact() {
  const projects = useProjects();
  const image = projectById("drop-arm-balcony", projects);

  return (
    <section
      id="contact"
      data-header="ink"
      className="relative scroll-mt-24 bg-[#07111C] text-[#F7F7F2] lg:min-h-[100svh]"
    >
      <div className="relative h-[40svh] overflow-hidden sm:h-[46svh] lg:absolute lg:inset-0 lg:h-auto">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-cover object-[22%_center]"
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#07111C]/80 via-[#07111C]/25 to-transparent lg:block" />
      </div>
      <div className="relative z-10 flex flex-col justify-end lg:min-h-[100svh] lg:w-[min(46rem,50%)] lg:bg-[#07111C]/72">
        <Reveal className="px-5 py-12 sm:px-8 lg:px-14 lg:py-24">
          <p className="text-[0.72rem] tracking-[0.2em] text-[#B9C5CE]">07 — ΕΠΙΚΟΙΝΩΝΙΑ</p>
          <h2 className="mt-5 font-display text-[clamp(2.3rem,5.4vw,4.6rem)] leading-[1.04] tracking-[-0.03em]">
            Ο επόμενος χώρος
            <br />
            που θα αναβαθμίσουμε
            <br />
            μπορεί να είναι ο δικός σας.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F7F7F2]/86 sm:text-lg">
            Επικοινωνήστε μαζί μας για να συζητήσουμε τις ανάγκες του χώρου σας
            και να εξετάσουμε την κατάλληλη λύση σκίασης.
          </p>
          <div className="mt-8 flex flex-col gap-3 xl:flex-row">
            <Cta href={site.emailHref}>ΕΠΙΚΟΙΝΩΝΗΣΤΕ ΜΑΖΙ ΜΑΣ</Cta>
            <Cta href={site.phoneHref} variant="ghost">
              ΚΑΛΕΣΤΕ ΜΑΣ
            </Cta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
