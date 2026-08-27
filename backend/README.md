# SS Infotech Backend API

Production-ready REST API backend built for the **SS Infotech** web application using Node.js, Express.js, and MongoDB (Mongoose).

---

## 🚀 Features

- **Authentication & Authorization**: Secure JWT-based admin login and role-based access control (`SUPER_ADMIN`, `ADMIN`).
- **Contact & Lead Management**: Collect, list, update status, and manage inquiry leads from the contact form.
- **Newsletter Subscriptions**: Manage newsletter subscriber email lists.
- **Services Management**: Full CRUD operations for dynamic IT services.
- **Portfolio & Case Studies**: Full CRUD operations for showcase projects with category filtering.
- **Client Testimonials**: Full CRUD operations for client ratings & feedback.
- **Trusted Partners**: Manage client partner logos.
- **Career Postings**: Post and manage open job positions.
- **Dashboard Analytics**: Consolidated metrics endpoint for admin panel.
- **Security & Reliability**: Helmet, CORS protection, express-rate-limit, express-validator, and global error handling.

---

## 📁 Directory Structure

```
backend/
├── config/
│   ├── db.js                # MongoDB connection setup
│   └── env.js               # Environment variables helper
├── controllers/
│   ├── auth.controller.js        # Admin register & login
│   ├── contact.controller.js     # Contact inquiries handling
│   ├── newsletter.controller.js  # Newsletter subscriptions
│   ├── service.controller.js     # Services CRUD
│   ├── project.controller.js     # Projects CRUD
│   ├── testimonial.controller.js # Testimonials CRUD
│   ├── partner.controller.js     # Trusted partners CRUD
│   ├── career.controller.js      # Careers CRUD
│   └── dashboard.controller.js   # Analytics summary metrics
├── middleware/
│   ├── auth.middleware.js        # JWT verify token
│   ├── role.middleware.js        # RBAC role permissions
│   ├── error.middleware.js       # Centralized error handler
│   └── validate.middleware.js    # Payload validation handler
├── models/
│   ├── User.model.js
│   ├── Contact.model.js
│   ├── Newsletter.model.js
│   ├── Service.model.js
│   ├── Project.model.js
│   ├── Testimonial.model.js
│   ├── Partner.model.js
│   └── Career.model.js
├── routes/
│   ├── auth.routes.js
│   ├── contact.routes.js
│   ├── newsletter.routes.js
│   ├── service.routes.js
│   ├── project.routes.js
│   ├── testimonial.routes.js
│   ├── partner.routes.js
│   ├── career.routes.js
│   └── dashboard.routes.js
├── utils/
│   ├── apiResponse.js            # Standardized response format
│   ├── apiError.js               # Custom ApiError class
│   └── logger.js                 # Console logger
├── .env.example
├── .gitignore
├── package.json
├── seed.js                       # Initial database seeding script
├── server.js                     # Main entry point
└── README.md                     # Documentation
```

---

## 🛠️ Prerequisites & Setup Instructions

### 1. Install Dependencies
Navigate into the `backend` directory and run:

```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Ensure your `.env` contains:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ss_infotech_db
JWT_SECRET=super_secret_jwt_key_ss_infotech_2026
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

### 3. Seed Database (Optional but Recommended)
Populate initial admin account, services, projects, testimonials, and partner logos:

```bash
npm run seed
```

Default Admin Credentials:
- **Email**: `admin@ssinfotech.com`
- **Password**: `AdminPassword123!`

### 4. Run Server Locally

Development Mode (with Nodemon):
```bash
npm run dev
```

Production Mode:
```bash
npm start
```

---

## 📡 API Reference Overview

Base URL: `http://localhost:5000/api/v1`

### 🔑 Authentication (`/api/v1/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/auth/login` | Public | Admin login (Returns JWT token) |
| `POST` | `/auth/register` | Public/Admin | Register admin user |
| `GET` | `/auth/me` | Protected | Get profile details of current user |

### ✉️ Contact Leads (`/api/v1/contacts`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/contacts` | Public | Submit contact inquiry form |
| `GET` | `/contacts` | Protected | List all contact inquiries |
| `GET` | `/contacts/:id` | Protected | Get single inquiry details |
| `PATCH` | `/contacts/:id/status` | Protected | Update lead status (`NEW`, `IN_REVIEW`, `CONTACTED`, `CLOSED`) |
| `DELETE` | `/contacts/:id` | Protected | Delete lead submission |

### 📰 Newsletter (`/api/v1/newsletter`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/newsletter/subscribe` | Public | Subscribe to newsletter |
| `GET` | `/newsletter` | Protected | List subscribers |
| `DELETE` | `/newsletter/:id` | Protected | Unsubscribe/Remove email |

### 🛠️ Services (`/api/v1/services`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/services` | Public | Get active services |
| `POST` | `/services` | Protected | Create new service |
| `PUT` | `/services/:id` | Protected | Update service |
| `DELETE` | `/services/:id` | Protected | Delete service |

### 📁 Projects (`/api/v1/projects`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/projects` | Public | Get portfolio projects (query `?category=AI%20%26%20ML`) |
| `POST` | `/projects` | Protected | Create new portfolio project |
| `PUT` | `/projects/:id` | Protected | Update portfolio project |
| `DELETE` | `/projects/:id` | Protected | Delete portfolio project |

### ⭐ Testimonials (`/api/v1/testimonials`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/testimonials` | Public | Get client testimonials |
| `POST` | `/testimonials` | Protected | Create testimonial |
| `PUT` | `/testimonials/:id` | Protected | Update testimonial |
| `DELETE` | `/testimonials/:id` | Protected | Delete testimonial |

### 🤝 Partners (`/api/v1/partners`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/partners` | Public | Get trusted partner companies |
| `POST` | `/partners` | Protected | Add partner logo |
| `DELETE` | `/partners/:id` | Protected | Remove partner |

### 💼 Careers (`/api/v1/careers`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/careers` | Public | Get open job positions |
| `POST` | `/careers` | Protected | Post new job opening |
| `PUT` | `/careers/:id` | Protected | Update job posting |
| `DELETE` | `/careers/:id` | Protected | Delete job posting |

### 📊 Dashboard (`/api/v1/dashboard`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/dashboard/stats` | Protected | Get summary analytics stats |
