import { profile } from "../data/profile.js";

export default function About() {
  return (
    <section id="about" className="section">
      <h2 className="section-title">About me</h2>
      <div className="glass card about-card">
        <p>{profile.about}</p>
        <ul className="skills">
          {profile.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
