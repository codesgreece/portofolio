"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { categories } from "@/data/projects";
import { useGallery, useProjects } from "@/components/providers";
import { useScrollLock } from "@/lib/scroll-lock";

export function Lightbox() {
  const projects = useProjects();
  const { currentId, open, close } = useGallery();
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const startX = useRef<number | null>(null);
  const index = projects.findIndex((project) => project.id === currentId);
  const project = index >= 0 ? projects[index] : null;

  const openDialog = Boolean(project);
  useScrollLock(openDialog);

  useEffect(() => {
    if (!openDialog) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    const main = document.getElementById("main");
    const footer = document.getElementById("footer");
    const header = document.querySelector("header");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    header?.setAttribute("inert", "");
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(focusTimer);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      header?.removeAttribute("inert");
      returnFocus.current?.focus();
    };
  }, [openDialog]);

  useEffect(() => {
    if (!project) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") {
        open(projects[(index + 1) % projects.length].id);
      }
      if (event.key === "ArrowLeft") {
        open(projects[(index - 1 + projects.length) % projects.length].id);
      }
      if (event.key !== "Tab") return;
      const dialog = document.getElementById("project-dialog");
      if (!dialog) return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>("button"));
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, index, projects, open, close]);

  function step(direction: number) {
    if (!projects.length || index < 0) return;
    const next = (index + direction + projects.length) % projects.length;
    open(projects[next].id);
  }

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          id="project-dialog"
          role="dialog"
          aria-modal="true"
          aria-label={project.alt}
          className="fixed inset-0 z-[90] flex flex-col bg-[#07111C]/96 text-[#F7F7F2]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <p className="text-[0.72rem] tracking-[0.18em] text-[#B9C5CE]">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#318BC3]"
              aria-label="Κλείσιμο"
            >
              <X aria-hidden size={22} />
            </button>
          </div>

          <div
            className="relative mx-auto flex w-full max-w-[1400px] flex-1 items-center justify-center px-4 sm:px-16"
            onPointerDown={(event) => {
              if (event.target instanceof Element && event.target.closest("button")) return;
              startX.current = event.clientX;
            }}
            onPointerUp={(event) => {
              if (startX.current == null) return;
              const delta = event.clientX - startX.current;
              if (delta > 56) step(-1);
              else if (delta < -56) step(1);
              startX.current = null;
            }}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute left-2 top-1/2 z-10 hidden min-h-11 min-w-11 -translate-y-1/2 items-center justify-center sm:inline-flex"
              aria-label="Προηγούμενη φωτογραφία"
            >
              <ChevronLeft aria-hidden />
            </button>
            <div className="relative h-[72svh] w-full">
              <Image
                src={project.src}
                alt={project.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <button
              type="button"
              onClick={() => step(1)}
              className="absolute right-2 top-1/2 z-10 hidden min-h-11 min-w-11 -translate-y-1/2 items-center justify-center sm:inline-flex"
              aria-label="Επόμενη φωτογραφία"
            >
              <ChevronRight aria-hidden />
            </button>
          </div>

          <div className="flex items-end justify-between gap-6 px-5 py-5 sm:px-8">
            <div>
              <p className="text-[0.72rem] tracking-[0.18em] text-[#318BC3]">
                {categories[project.category]}
              </p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#F7F7F2]/85">
                {project.description || project.alt}
              </p>
            </div>
            <div className="flex sm:hidden">
              <button
                type="button"
                onClick={() => step(-1)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center"
                aria-label="Προηγούμενη φωτογραφία"
              >
                <ChevronLeft aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center"
                aria-label="Επόμενη φωτογραφία"
              >
                <ChevronRight aria-hidden />
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
