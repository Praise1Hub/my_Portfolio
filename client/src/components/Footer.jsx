import { profile } from "../data/profile.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="socials">
        {profile.socials.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
      </div>
      <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
    </footer>
  );
}
