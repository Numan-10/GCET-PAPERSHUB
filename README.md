# GCET Papers Hub (Unofficial)

A platform for GCET KMR students to access previous year exam papers quickly and in one place.

---

## What Is GCET Papers Hub?

GCET Papers Hub organizes past exam papers by semester and subject, so students do not have to search across group chats or scattered sources. It is built for fast access, clean structure, and reliable availability.

---

## How To Use

For students:
- Browse papers by semester and subject.
- Download papers instantly.
- Free to use.

For admins (restricted):
- Admin access is limited to the platform owner.
- Only admins and managers can upload, update, or delete content.
- Unauthorized access is blocked on both frontend and backend.

---

## User View

These are the main student-facing screens:

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="/Frontend/public/Assets/Home.png" width="45%" alt="Home Screen">
  <img src="/Frontend/public/Assets/Signin.png" width="45%" alt="Login Screen">
  <img src="/Frontend/public/Assets/Signup.png" width="45%" alt="Signup Screen">
  <img src="/Frontend/public/Assets/subjectuser.png" width="45%" alt="Subject Screen">
</div>

---

## Admin View

Admin access is strictly limited.

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="/Frontend/public/Assets/AdminHome.png" width="45%" alt="Admin Home">
  <img src="/Frontend/public/Assets/SubjectAdmin.png" width="45%" alt="Add Subject">
  <img src="/Frontend/public/Assets/AddUnitAdmin.png" width="45%" alt="Add Unit">
</div>

---

## Run Locally (Without Docker)

Backend:
```bash
cd Backend
npm install
```

Set environment variables:
- Copy `Backend/.env` and replace secrets and URLs.
- Make sure `MONGO_URL`, `TOKEN_KEY`, and OAuth keys are set.

Start the backend:
```bash
npm run dev
```

Frontend:
```bash
cd Frontend
npm install
```

Set environment variables:
- Copy `Frontend/.env` and set `VITE_APP_BACKEND_URL`.

Start the frontend:
```bash
npm run dev
```

---

## Run Locally (Docker)

Using Docker Compose (recommended):
```bash
docker compose up --build
```

Services and ports:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- MongoDB: mongodb://localhost:27017

Manual build/run:

Backend:
```bash
docker build -t gcet-papershub-backend ./Backend
docker run --env-file Backend/.env -p 3000:3000 gcet-papershub-backend
```

Frontend:
```bash
docker build -t gcet-papershub-frontend --build-arg VITE_APP_BACKEND_URL=http://localhost:3000 ./Frontend
docker run -p 8080:80 gcet-papershub-frontend
```

Environment notes:
- For Docker runs, create `Backend/.env` with all required secrets and URLs (MongoDB, JWT, OAuth, Cloudinary).
- The frontend build uses `VITE_APP_BACKEND_URL` as a build arg. This must point to the backend URL you want the browser to call.

Backend `.env` required keys:
- `NODE_ENV=production`
- `PORT=3000`
- `MONGO_URL=mongodb://mongo:27017/gcet_papershub` (Docker) or your Atlas URI
- `TOKEN_KEY=your_jwt_secret`
- `FRONTEND_URL=http://localhost:5173`
- `LOCAL_FRONTEND_URL=http://localhost:5173`
- `BACKEND_URL=http://localhost:3000`
- `GOOGLE_CLIENT_ID=...`
- `GOOGLE_CLIENT_SECRET=...`
- `GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback` (optional override)
- `GITHUB_CLIENT_ID=...`
- `GITHUB_CLIENT_SECRET=...`
- `GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback` (optional override)
- `CLOUD_NAME=...`
- `CLOUD_API_KEY=...`
- `CLOUD_API_SECRET=...`
- `CORS_ORIGINS=http://localhost:5173` (optional, comma-separated)

---

## Live Project & Repository

- Live Site: https://gcet-papershub-frontend.onrender.com/
- GitHub Repo: https://github.com/NumanXdev/GCET-PAPERSHUB
