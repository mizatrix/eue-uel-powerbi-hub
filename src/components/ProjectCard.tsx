import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  takenBy?: string;
}

export default function ProjectCard({ project, onClick, takenBy }: ProjectCardProps) {
  return (
    <div 
      className={`project-card ${takenBy ? 'taken-project' : ''}`} 
      onClick={takenBy ? undefined : onClick}
      style={takenBy ? { cursor: 'not-allowed' } : {}}
    >
      <div className="card-icon">
        <i className={`fa-solid ${project.icon}`}></i>
      </div>

      {takenBy && (
        <div className="taken-badge">
          <i className="fa-solid fa-lock"></i>
          <span>Taken by: {takenBy}</span>
        </div>
      )}

      <h3>{project.title}</h3>
      <p>{project.description}</p>
      
      {!takenBy ? (
        <div className="card-footer">
          <span>View Requirements</span>
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      ) : (
        <div className="card-footer" style={{ color: 'var(--text-muted)' }}>
          <span>Already Assigned</span>
          <i className="fa-solid fa-ban"></i>
        </div>
      )}
    </div>
  );
}
