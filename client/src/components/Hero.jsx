import { profile } from "../data/profile.js";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <p className="eyebrow">Hello, I'm</p>
      <h1>{profile.name}</h1>
      <h2 className="gradient-text">{profile.title}</h2>
      <p className="lead">{profile.tagline}</p>
      <div className="hero-actions">
        <a href="#projects" className="btn btn-primary">View my work</a>
        <a href="#contact" className="btn btn-ghost">Get in touch</a>
      </div>
    </section>
  );
}
