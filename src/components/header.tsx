"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navigation, site } from "@/data/site";
import { useScrollLock } from "@/lib/scroll-lock";

export function Header() {
  const [open, setOpen] = useState(false);
  const [ivory, setIvory] = useState(false);
  const [active, setActive] = useState<string>("");
  const shellRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useScrollLock(open);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-header]"));
    const seen = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) seen.add(entry.target);
          else seen.delete(entry.target);
        });
        const ordered = [...seen].sort((a, b) => {
          const position = a.compareDocumentPosition(b);
          if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
          if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
          return 0;
        });
        const current = ordered[ordered.length - 1];
        if (current) setIvory(current.getAttribute("data-header") === "ivory");
      },
      { rootMargin: "-8% 0px -78% 0px", threshold: [0, 0.15, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = shellRef.current;
    const main = document.getElementById("main");
    const footer = document.getElementById("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    function focusables() {
      if (!root) return [];
      return Array.from(root.querySelectorAll<HTMLElement>("a, button")).filter(
        (element) => !element.hasAttribute("disabled"),
      );
    }

    root?.querySelector<HTMLElement>("#mobile-nav a")?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const list = focusables();
      const first = list[0];
      const last = list[list.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [open]);

  const lightText = open || !ivory;

  return (
    <div ref={shellRef}>
      <a
        href="#main"
        className="absolute left-4 top-0 z-[100] -translate-y-full bg-[#F7F7F2] px-4 py-3 text-sm text-[#07111C] focus:translate-y-4"
      >
        Μετάβαση στο περιεχόμενο
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          lightText
            ? "border-white/10 bg-[#07111C] text-[#F7F7F2]"
            : "border-[#07111C]/10 bg-[#F7F7F2] text-[#07111C]"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a href="#hero" className="block leading-none" onClick={() => setOpen(false)}>
            <span className="block text-[0.72rem] tracking-[0.16em] sm:text-[0.78rem]">
              {site.shortName}
            </span>
            <span
              className={`mt-1 block text-[0.62rem] tracking-[0.28em] ${
                lightText ? "text-[#B9C5CE]" : "text-[#145A80]"
              }`}
            >
              {site.place}
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Κύρια">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative py-2 text-[0.78rem] tracking-[0.12em]"
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-px w-full origin-left bg-[#318BC3] transition-transform duration-300 ${
                    active === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
            <span className="sr-only">{open ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}</span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Κινητό"
            className="fixed inset-0 z-40 flex flex-col bg-[#07111C] px-6 pb-10 pt-28 text-[#F7F7F2]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-1 flex-col">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/15 py-4 font-display text-[2rem] leading-none"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.35 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
            <div className="space-y-2 text-sm text-[#B9C5CE]">
              <p>{site.locationLabel}</p>
              <a className="block min-h-11 py-2 text-[#F7F7F2]" href={site.phoneHref}>
                {site.phoneDisplay}
              </a>
              <a className="block min-h-11 break-all py-2 text-[#F7F7F2]" href={site.emailHref}>
                {site.email}
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
