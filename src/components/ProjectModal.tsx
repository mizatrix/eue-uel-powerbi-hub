"use client";

import { useEffect } from "react";
import { Project } from "@/data/projects";

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
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className={`modal-overlay active`} onClick={onClose}>
      <div
        className="modal-content glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="modal-header">
          <div className="modal-icon">
            <i className={`fa-solid ${project.icon}`}></i>
          </div>
          <h3>{project.title}</h3>
        </div>
        <p className="modal-desc">{project.description}</p>
        <h4>
          <i className="fa-solid fa-list-check"></i> Required Functionalities:
        </h4>
        <ul className="features-list">
          {project.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
