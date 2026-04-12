import { Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  takenBy?: string;
}

export default function ProjectCard({ project, onClick, takenBy }: ProjectCardProps) {
  return (
    <div
      className={`${styles.projectCard} ${takenBy ? styles.takenProject : ""}`}
      onClick={takenBy ? undefined : onClick}
      style={{
        cursor: takenBy ? 'not-allowed' : 'pointer',
        '--card-accent': project.accent,
      } as React.CSSProperties}
    >
      {takenBy && (
        <div className={styles.takenBadge}>
          <i className="fa-solid fa-lock"></i> Taken by {takenBy}
        </div>
      )}

      <div className={styles.cardTop}>
        <div className={styles.cardIcon} style={{ color: project.accent, borderColor: `${project.accent}30`, background: `${project.accent}12` }}>
          <i className={`fa-solid ${project.icon}`}></i>
        </div>
        <span className={styles.categoryBadge} style={{ color: project.accent, background: `${project.accent}15`, borderColor: `${project.accent}25` }}>
          {project.category}
        </span>
      </div>

      <h3 className={styles.cardTitle}>{project.title}</h3>
      <p className={styles.cardDesc}>{project.description}</p>

      <div className={styles.cardFooter}>
        {takenBy ? (
          <>
            <span style={{ color: 'var(--text-muted)' }}>Already Assigned</span>
            <i className="fa-solid fa-ban" style={{ color: 'var(--text-muted)' }}></i>
          </>
        ) : (
          <>
            <span>View Details</span>
            <i className="fa-solid fa-arrow-right"></i>
          </>
        )}
      </div>
    </div>
  );
}
