import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import HowIBuild from "@/components/HowIBuild";
import StackGrid from "@/components/StackGrid";
import ProjectCard from "@/components/ProjectCard";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <HowIBuild />
        <StackGrid />
        <Section id="projects" number="03" title="Projects">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Section>
        <Experience />
        <Contact />
      </main>
    </>
  );
}
