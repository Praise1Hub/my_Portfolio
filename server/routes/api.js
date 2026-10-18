import { Router } from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import projects from "../data/projects.js";
import { sendContactEmail, emailConfigured } from "../utils/mailer.js";

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const messagesFile = path.join(__dirname, "..", "data", "messages.json");

// GET /api/projects
router.get("/projects", (req, res) => {
  res.json(projects);
});

// GET /api/projects/:id
router.get("/projects/:id", (req, res) => {
  const project = projects.find((p) => p.id === Number(req.params.id));
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

// POST /api/contact
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Name, email and message are required" });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address" });
  }

  const entry = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  };

  let saved = [];
  try {
    saved = JSON.parse(fs.readFileSync(messagesFile, "utf8"));
  } catch {
    // file doesn't exist yet, start fresh
  }
  saved.push(entry);
  fs.writeFileSync(messagesFile, JSON.stringify(saved, null, 2));

  // Email notification. The message is already saved above, so an email
  // failure never loses it and never shows the visitor an error.
  if (emailConfigured()) {
    try {
      await sendContactEmail(entry);
    } catch (err) {
      console.error("Email failed (message still saved to file):", err.message);
    }
  } else {
    console.warn("EMAIL_USER / EMAIL_PASS not set. Skipping email notification.");
  }

  res.status(201).json({ success: true, message: "Message received. Thank you!" });
});

export default router;
