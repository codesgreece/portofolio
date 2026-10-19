import fs from "fs";
import path from "path";
import { projects, type Project } from "@/data/projects";

export function getAvailableProjects(): Project[] {
  return projects.filter((project) => {
    const relative = project.src.replace(/^\//, "");
    return fs.existsSync(path.join(process.cwd(), "public", relative));
  });
}
