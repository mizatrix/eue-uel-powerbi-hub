"use client";

import { useState } from "react";
import { projectsData, Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function ProjectGrid({ takenProjects }: { takenProjects: Record<number, string> }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projectsData.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="section-header">
          <h2>Available Projects</h2>
          <div className="search-container">
            <i className="fa-solid fa-search"></i>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid" id="projects-grid">
          {filteredProjects.length === 0 ? (
            <p style={{ gridColumn: "1/-1", textAlign: "center", color: "var(--text-muted)" }}>
              No projects found matching your search.
            </p>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                takenBy={takenProjects[project.id]}
                onClick={() => setSelectedProject(project)}
              />
            ))
          )}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
