"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Project } from "@/data/projects";
import { Lightbox } from "@/components/lightbox";

export type IntroPhase = "idle" | "playing" | "reveal" | "done";

const IntroContext = createContext<{
  phase: IntroPhase;
  setPhase: (phase: IntroPhase) => void;
}>({ phase: "idle", setPhase: () => undefined });

const ProjectsContext = createContext<Project[]>([]);

const GalleryContext = createContext<{
  currentId: string | null;
  open: (id: string) => void;
  close: () => void;
}>({ currentId: null, open: () => undefined, close: () => undefined });

export function useIntro() {
  return useContext(IntroContext);
}

export function useProjects() {
  return useContext(ProjectsContext);
}

export function useGallery() {
  return useContext(GalleryContext);
}

export function Providers({
  projects,
  children,
}: {
  projects: Project[];
  children: ReactNode;
}) {
  const [phase, setPhase] = useState<IntroPhase>("idle");
  const [currentId, setCurrentId] = useState<string | null>(null);
  const gallery = useMemo(
    () => ({
      currentId,
      open: (id: string) => setCurrentId(id),
      close: () => setCurrentId(null),
    }),
    [currentId],
  );

  return (
    <IntroContext.Provider value={{ phase, setPhase }}>
      <ProjectsContext.Provider value={projects}>
        <GalleryContext.Provider value={gallery}>
          {children}
          <Lightbox />
        </GalleryContext.Provider>
      </ProjectsContext.Provider>
    </IntroContext.Provider>
  );
}
