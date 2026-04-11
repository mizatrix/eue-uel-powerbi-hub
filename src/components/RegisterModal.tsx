"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { projectsData } from "@/data/projects";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);

  const [projectId, setProjectId] = useState("");
  const [teamIdea, setTeamIdea] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [membersList, setMembersList] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      // reset form
      setMessage(null);
      setProjectId("");
      setTeamIdea("");
      setLeaderName("");
      setMembersList("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setMessage({ text: "Supabase is not configured yet. Check env variables.", type: "error" });
      return;
    }

    const selectedProject = projectsData.find((p) => p.id === Number(projectId));
    if (!selectedProject) return;

    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.from("teams").insert([
        {
          project_title: selectedProject.title,
          team_idea: teamIdea,
          leader_name: leaderName,
          members: membersList,
        },
      ]);

      if (error) throw error;

      setMessage({ text: "Team registered successfully! We will contact you soon.", type: "success" });
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error(error);
      setMessage({ text: "Error registering team. Please try again or check setup.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`modal-overlay active`} onClick={onClose}>
      <div className="modal-content glass-card form-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="modal-header">
          <div className="modal-icon">
            <i className="fa-solid fa-users"></i>
          </div>
          <h3>Register Your Team</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="projectSelect">
              Selected Project <span className="required">*</span>
            </label>
            <select
              id="projectSelect"
              required
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            >
              <option value="" disabled>-- Choose a Project --</option>
              {projectsData.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="teamIdea">Team Name / Custom Idea</label>
            <input
              type="text"
              id="teamIdea"
              placeholder="e.g. The Pythons - Advanced AI Agent"
              value={teamIdea}
              onChange={(e) => setTeamIdea(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="leaderName">
              Team Leader Name & ID <span className="required">*</span>
            </label>
            <input
              type="text"
              id="leaderName"
              required
              placeholder="e.g. Ahmed Ali - 2110001"
              value={leaderName}
              onChange={(e) => setLeaderName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="membersList">Team Members (Names & IDs)</label>
            <textarea
              id="membersList"
              rows={3}
              placeholder="1. Sara Ahmed - 2110002&#10;2. Omar Sayed - 2110003"
              value={membersList}
              onChange={(e) => setMembersList(e.target.value)}
            ></textarea>
          </div>

          {message && <div className={`form-messages ${message.type}`}>{message.text}</div>}

          <button type="submit" className="btn primary-btn submit-btn" disabled={loading}>
            {loading ? (
              <>
                Registering... <i className="fa-solid fa-spinner fa-spin"></i>
              </>
            ) : (
              <>
                Register Now <i className="fa-solid fa-paper-plane"></i>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
