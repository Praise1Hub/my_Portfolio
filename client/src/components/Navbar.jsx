import { useState } from "react";
import { profile } from "../data/profile.js";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar glass">
      <a href="#home" className="logo">
        {profile.name.split(" ")[0]}<span>.</span>
      </a>

      <button
        className="menu-btn"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? "✕" : "☰"}
      </button>

      <nav className={open ? "nav-links open" : "nav-links"}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
