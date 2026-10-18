import { useState } from "react";
import { profile } from "../data/profile.js";

const empty = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: "idle", text: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", text: "Sending..." });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to send");

      setStatus({ type: "success", text: data.message });
      setForm(empty);
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    }
  };

  return (
    <section id="contact" className="section">
      <h2 className="section-title">Contact</h2>
      <div className="glass card contact-card">
        <p>
          Have a project in mind? Send a message or email me at{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your message"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button
            className="btn btn-primary"
            type="submit"
            disabled={status.type === "loading"}
          >
            Send message
          </button>
          {status.text && (
            <p className={`form-status ${status.type}`}>{status.text}</p>
          )}
        </form>
      </div>
    </section>
  );
}
