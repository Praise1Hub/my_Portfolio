# Portfolio Website (React + Node.js)

- `client/`: React (Vite) front end
- `server/`: Express API (projects + contact form)

## Run it

Open two terminals.

**Terminal 1: server**
```bash
cd server
npm install
npm run dev
```
Runs on http://localhost:5000

**Terminal 2: client**
```bash
cd client
npm install
npm run dev
```
Runs on http://localhost:5173 (requests to `/api` are proxied to the server).

## Customize

- Your name, bio, skills, socials: `client/src/data/profile.js`
- Your projects: `server/data/projects.js`
- Colors and glass effect: top of `client/src/index.css`

## API

| Method | Route               | Purpose                          |
| ------ | ------------------- | -------------------------------- |
| GET    | `/api/projects`     | List all projects                |
| GET    | `/api/projects/:id` | Get one project                  |
| POST   | `/api/contact`      | Receive a contact form message   |

Contact messages are saved to `server/data/messages.json` and, if email is configured, also emailed to you.

## Email notifications (Nodemailer)

1. Copy `server/.env.example` to `server/.env`.
2. Fill in `EMAIL_USER`, `EMAIL_PASS` and (optionally) `EMAIL_TO`.
3. For Gmail, `EMAIL_PASS` must be an **App Password**: Google Account > Security > turn on 2-Step Verification > App passwords.
4. Restart the server.

If the email settings are missing or sending fails, the message is still saved to the file and the visitor still sees success. The failure is logged in the server terminal. Hitting Reply in your inbox answers the visitor directly.

## Deploying

- Client: `npm run build` in `client/`, deploy the `dist/` folder (Vercel, Netlify).
- Server: deploy `server/` (Render, Railway). Set `CLIENT_URL` to your live site URL.
- In production, replace `/api` fetches with your server URL (for example via a `VITE_API_URL` env variable).
