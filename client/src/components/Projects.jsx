import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section id="projects" className="section">
      <h2 className="section-title">Projects</h2>

      {status === "loading" && <p className="muted">Loading projects...</p>}
      {status === "error" && (
        <p className="muted">
          Couldn't load projects. Make sure the server is running on port 5000.
        </p>
      )}

      <div className="grid">
        {projects.map((p) => (
          <article key={p.id} className="glass card project">
            {p.image && <img src={p.image} alt={p.title} />}
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <ul className="tags">
              {p.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="project-links">
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noreferrer">Live ↗</a>
              )}
              {p.repoUrl && (
                <a href={p.repoUrl} target="_blank" rel="noreferrer">Code ↗</a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
