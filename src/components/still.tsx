"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { Project } from "@/data/projects";
import { categories } from "@/data/projects";
import { useGallery } from "@/components/providers";

export function Still({
  project,
  aspect,
  sizes,
  priority = false,
  interactive = false,
  className = "",
}: {
  project: Project;
  aspect: string;
  sizes: string;
  priority?: boolean;
  interactive?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const gallery = useGallery();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shiftX = useSpring(x, { stiffness: 70, damping: 18, mass: 0.55 });
  const shiftY = useSpring(y, { stiffness: 70, damping: 18, mass: 0.55 });

  const frame = (
    <div
      className={`relative overflow-hidden bg-[#101820] ${aspect} ${className}`}
      onPointerMove={(event) => {
        if (reduce || !interactive || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
        y.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 8);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        className="absolute inset-[-7%]"
        style={reduce || !interactive ? undefined : { x: shiftX, y: shiftY }}
      >
        <Image
          src={project.src}
          alt={interactive ? "" : project.alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${project.focus} transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
        />
      </motion.div>
    </div>
  );

  if (!interactive) return frame;

  return (
    <button
      type="button"
      onClick={() => gallery.open(project.id)}
      className="group block w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#318BC3]"
      aria-label={`${categories[project.category]}. ${project.alt}`}
    >
      {frame}
    </button>
  );
}
