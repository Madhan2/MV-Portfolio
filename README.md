# MV Portfolio

A dynamic, responsive portfolio website built using HTML, CSS, JavaScript, Node.js and Express.js. It includes a public portfolio and a secure admin dashboard for managing projects, skills and achievements without modifying the source code.

## Features

### Public Portfolio
- Responsive personal portfolio website.
- Dynamic display of projects, skills and achievements.
- Content retrieved through REST API endpoints.
- About, contact and profile sections.
- Automatically reflects changes made through the admin dashboard after refreshing.

### Admin Dashboard
- Secure administrator login and logout.
- JWT-based authentication using HTTP-only cookies.
- Dashboard overview with project, skill and achievement counts.
- Create, read, update and delete projects.
- Create, read, update and delete skills.
- Create, read, update and delete achievements.
- Input validation and error handling.

### Backend
- RESTful API built using Express.js.
- JSON-based request and response handling.
- Protected administrative routes.
- Authentication middleware.
- Request validation and appropriate HTTP status codes.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Authentication | JWT, bcryptjs |
| Security | Helmet, CORS, express-rate-limit |
| Cookie handling | cookie-parser |
| Data storage | In-memory JavaScript arrays |
| Development tools | VS Code, Git, GitHub |

## Project Structure

```text
MV-portfolio/
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── scripts.js
│   └── admin/
│       ├── login.html
│       ├── login.css
│       ├── login.js
│       ├── admin.html
│       ├── admin.css
│       └── admin.js
│
├── backend/
│   ├── data/
│   │   └── data.js
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

## Architecture

```
                  ┌────────────────────────────────────────────────────┐
                  │                  FRONTEND                          │
                  │                                                    │
 Public Portfolio │  frontend/index.html                               │
 ────────────────►│  ├── style.css                                     │
   GET requests   │  └── scripts.js                                    │
                  │                  │                                 │
 Admin Dashboard  │  frontend/admin/                                   │
 ────────────────►│  ├── login.html  ──► login.js                      │
  CRUD requests   │  ├── admin.html  ──► admin.js                      │
                  │  └── admin.css                                     │
                  └──────────────────┬─────────────────────────────────┘
                                     │
                                HTTP / JSON
                                    │
                                    ▼
                 ┌────────────────────────────────────────────────────┐
                 │             NODE.JS + EXPRESS SERVER               │
                 │                                                    │
                 │  server.js                                         │
                 │     │                                              │
                 │     ├── Helmet (Security Headers)                  │
                 │     ├── CORS (Frontend Access)                     │
                 │     ├── express.json()                             │
                 │     ├── cookie-parser                              │
                 │     │                                              │
                 │     ▼                                              │
                 │  ROUTES                                            │
                 │     │                                              │
                 │     ├── portfolioRoutes.js                         │
                 │     ├── resourceRoutes.js                          │
                 │     ├── achievementRoutes.js                       │
                 │     └── authRoutes.js                              │
                 │             │                                      │
                 │             ▼                                      │
                 │  MIDDLEWARE                                        │
                 │     │                                              │
                 │     ├── authMiddleware.js                          │
                 │     │      └── JWT Cookie Verification             │
                 │     │                                              │
                 │     └── errorHandler.js                            │
                 │                                                    │
                 │             │                                      │
                 │             ▼                                      │
                 │  CONTROLLERS                                       │
                 │     │                                              │
                 │     ├── portfolioController.js                     │
                 │     ├── resourceController.js                      │
                 │     ├── achievementController.js                   │
                 │     └── authController.js                          │
                 │             │                                      │
                 │             ▼                                      │
                 │  DATA LAYER                                        │
                 │     │                                              │
                 │     └── data/data.js                               │
                 │             │                                      │
                 │             ▼                                      │
                 │       In-memory JavaScript Arrays                  │
                 │       ├── Projects                                 │
                 │       ├── Skills                                   │
                 │       └── Achievements                             │
                 │                                                    │
                 └────────────────────────────────────────────────────┘
```

## API Endpoints

### Portfolio

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/portfolio` | Retrieve all portfolio data |

### Projects

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/projects` | Retrieve all projects |
| GET | `/api/projects/:id` | Retrieve a specific project |
| POST | `/api/projects` | Create a project |
| PUT | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |

### Skills

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/skills` | Retrieve all skills |
| POST | `/api/skills` | Create a skill |
| PUT | `/api/skills/:id` | Update a skill |
| DELETE | `/api/skills/:id` | Delete a skill |

### Achievements

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/achievements` | Retrieve all achievements |
| POST | `/api/achievements` | Create an achievement |
| PUT | `/api/achievements/:id` | Update an achievement |
| DELETE | `/api/achievements/:id` | Delete an achievement |

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Administrator login |
| GET | `/api/auth/me` | Verify authentication |
| POST | `/api/auth/logout` | Administrator logout |

## Installation and Setup

### Prerequisites
- Node.js and npm
- Git
- Visual Studio Code

### 1. Clone the repository

```bash
git clone https://github.com/Madhan2/MV-Portfolio
cd MV-Portfolio
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the backend folder.

Configure the following variables:

```env
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your_bcrypt_password_hash
JWT_SECRET=your_secure_random_secret
FRONTEND_ORIGIN=http://127.0.0.1:5500
NODE_ENV=development
```

Never commit your actual `.env` file or authentication secrets.

### 4. Start the backend

```bash
npm start
```

If no start script exists, use:

```bash
node server.js
```

### 5. Start the frontend

Open the `frontend` folder using Visual Studio Code and launch `index.html` using the Live Server extension.

### 6. Access the application

- Public portfolio: `http://127.0.0.1:5500/frontend/index.html`
- Admin login: `http://127.0.0.1:5500/frontend/admin/login.html`
- Backend API: `http://127.0.0.1:5000/api`

## Security Measures

- Password verification using bcryptjs.
- JWT authentication.
- HTTP-only authentication cookies.
- Protected administrative API endpoints.
- Login rate limiting.
- Helmet security headers.
- CORS configuration.
- Server-side input validation.
- Environment variables for sensitive configuration.

## Known Limitations

- Portfolio data is stored in memory and resets when the backend restarts.
- No persistent database is currently integrated.
- Only a single administrator account is configured.
- Deployment and production configuration are separate from the local development setup.


## Developer

**Madhan Vigneswaran**

***Computer Science and Engineering - 2029***

***University Visvesvaraya College of Engineering (UVCE)***
