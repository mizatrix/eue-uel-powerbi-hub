import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div className="project-card" onClick={onClick}>
      <div className="card-icon">
        <i className={`fa-solid ${project.icon}`}></i>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="card-footer">
        <span>View Requirements</span>
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
}
