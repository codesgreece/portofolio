import { Applications } from "@/components/applications";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { Process } from "@/components/process";
import { Projects } from "@/components/projects";
import { Providers } from "@/components/providers";
import { Services } from "@/components/services";
import { Statement } from "@/components/statement";
import { Why } from "@/components/why";
import { getAvailableProjects } from "@/lib/available-projects";

export default function Page() {
  const projects = getAvailableProjects();

  return (
    <Providers projects={projects}>
      <Intro />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Statement />
        <Projects />
        <Services />
        <Applications />
        <Why />
        <Process />
        <Contact />
      </main>
      <Footer />
    </Providers>
  );
}
