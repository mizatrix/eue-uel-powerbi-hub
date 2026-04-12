"use client";

import { useEffect } from "react";
import { Project } from "@/data/projects";
import styles from "./ProjectModal.module.css";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.modalOverlayActive : ""}`}
      onClick={onClose}
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        style={{ '--modal-accent': project.accent } as React.CSSProperties}
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className={styles.modalHeader}>
          <div className={styles.modalIcon} style={{ color: project.accent, background: `${project.accent}15`, borderColor: `${project.accent}30` }}>
            <i className={`fa-solid ${project.icon}`}></i>
          </div>
          <div>
            <span className={styles.modalCategory} style={{ color: project.accent }}>{project.category}</span>
            <h3>{project.title}</h3>
          </div>
        </div>

        <p className={styles.modalDesc}>{project.description}</p>

        <h4>
          <i className="fa-solid fa-list-check"></i> Deliverables:
        </h4>
        <ul className={styles.featuresList}>
          {project.features.map((feature, idx) => (
            <li key={idx}>
              <i className="fa-solid fa-circle-check" style={{ color: project.accent, marginRight: '0.5rem', fontSize: '0.8rem' }}></i>
              {feature}
            </li>
          ))}
        </ul>

        {/* Dataset Source */}
        <div className={styles.datasetSection}>
          <h4><i className="fa-solid fa-database"></i> Suggested Dataset Source:</h4>
          <a
            href={project.datasetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.datasetLink}
            style={{ borderColor: `${project.accent}40`, color: project.accent }}
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            {project.datasetUrl.includes('kaggle') ? 'Search on Kaggle.com' :
             project.datasetUrl.includes('google') ? 'Search on Google Dataset Search' :
             project.datasetUrl.includes('microsoft') ? 'Microsoft Power BI Sample Datasets' :
             'Find Dataset'}
          </a>
          <p className={styles.datasetNote}>
            <i className="fa-solid fa-circle-info"></i>
            Choose a dataset with <strong>at least 1,000 rows</strong> and <strong>5+ columns</strong>.
          </p>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a href="/login" className="btn primary-btn" style={{ flex: 1, textAlign: 'center', minWidth: '160px' }}>
            <i className="fa-solid fa-users" style={{ marginRight: '0.4rem' }}></i>
            Register Team
          </a>
          <a href="/guide" className="btn secondary-btn" style={{ flex: 1, textAlign: 'center', minWidth: '160px' }}>
            <i className="fa-solid fa-book-open" style={{ marginRight: '0.4rem' }}></i>
            View Guide
          </a>
        </div>
      </div>
    </div>
  );
}
