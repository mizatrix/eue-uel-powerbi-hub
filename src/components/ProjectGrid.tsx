"use client";

import { useState } from "react";
import { projectsData, Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import styles from "./ProjectGrid.module.css";

const CATEGORIES = [
  'All',
  'Retail & E-commerce',
  'Finance & Banking',
  'Healthcare & Medical',
  'Human Resources',
  'Supply Chain',
  'Marketing',
  'Education',
  'Real Estate',
  'Sports & Entertainment',
  'Public Sector & Tech',
];

export default function ProjectGrid({ takenProjects }: { takenProjects: Record<number, string> }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projectsData.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const takenCount = Object.keys(takenProjects).length;
  const availableCount = 100 - takenCount;

  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerText}>
            <span className="badge">Power BI Projects</span>
            <h2>Available Projects</h2>
            <p className={styles.headerSubtitle}>
              <span style={{ color: '#22c55e' }}>{availableCount} available</span>
              {takenCount > 0 && <> · <span style={{ color: '#ef4444' }}>{takenCount} taken</span></>}
              {' '} across 10 business domains
            </p>
          </div>
          <div className={styles.searchContainer}>
            <i className={`fa-solid fa-search ${styles.searchIcon}`}></i>
            <input
              type="text"
              placeholder="Search projects..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className={styles.categoryFilter}>
          {CATEGORIES.map((cat) => {
            const count = cat === 'All'
              ? projectsData.length
              : projectsData.filter(p => p.category === cat).length;
            return (
              <button
                key={cat}
                className={`${styles.categoryPill} ${activeCategory === cat ? styles.categoryPillActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'All' ? <i className="fa-solid fa-grid-2"></i> : null}
                {cat} <span className={styles.pillCount}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.grid} id="projects-grid">
          {filteredProjects.length === 0 ? (
            <p className={styles.noResults}>
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
