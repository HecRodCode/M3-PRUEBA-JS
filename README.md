# CRUSTASK- Task Management System

## 📋 System Description

CRUDTASK is a Vanilla JavaScript MPA simulating a task management system. Features include:

- Authentication with roles (user/admin)
- Full CRUD for users and task
- Role-protected routes
- Admin dashboard with real-time metrics
- Persistent task
- task status management: pending / In Porgress / Completed

---

## 🚀 Live Demo

🔗 https://hecrodcode.github.io/M3-PRUEBA-JS/

---

# 📁 Project Structure

```bash
crudtask/
├── index.html # Login
├── register.html # Register
├── user-profile.html # User profile
├── admin-profile.html # admin profile
├── admin-dashboard.html # Admin dashboard
├── user-dashboard.html # user dashboard
├── db.json # database
├── js/
│ ├── admin.js # admin view logic
│ ├── user.js # user view logic
│ ├── auth.js # Login logic
│ ├── storage.js # Authentication
│ ├── api.js # Fetch + CRUD
│ ├── guards.js # route protection
│ └── utils.js # helpers
├── css/
│ ├── admin-profile.css # admin proile style
│ ├── login.css # route protection
│ ├── register.css # register styles
│ ├── login.css # login styles
│ ├── user-profile.css # user proile style
│ ├── admin.css # admin dashboard styles
│ ├── user.css # user dashboard styles
│ └── global.css # global styles
├── assets/
│ ├── fonts
│ ├── icons
│ ├── images
│       ─── logo.png
└── README.md
```

---

# 🚀 Technologies

| Frontend   | Backend/API | Storage        | Tools       |
| ---------- | ----------- | -------------- | ----------- |
| HTML5      | json-server | SessionStorage | Bootstrap 5 |
| CSS3       | REST API    |                | FontAwesome |
| Vanilla JS | Fetch API   |                | VS Code     |

---

# 🛠️ Installation & Setup

Prerequisites: Node.js v18+, npm or yarn, modern browser

```bash
# Clone project

git clone <repo-url> crudtask
cd crudtask

# Install json-server globally

npm install -g json-server

# Start mock API

json-server --watch db.json --port 3000

# Open any HTML file in browser

# http://localhost:3000 → API documentation
```

Useful Commands:

| Action         | Command                                   |
| -------------- | ----------------------------------------- |
| Start server   | `json-server --watch db.json --port 3001` |
| Reset DB       | `cp db.json.backup db.json`               |
| View endpoints | `http://localhost:3000`                   |

---

## 🛠️ Local Development Setup

| Component       | Tool / Command                            | Description                              |
| --------------- | ----------------------------------------- | ---------------------------------------- |
| Frontend Visual | `npx serve .`                             | Serves the MPA in the browser.           |
| API / Backend   | `json-server --watch db.json --port 3001` | Starts the API REST for CRUD operations. |

## 🔧 API Endpoints

The json-server provides the following endpoints:

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user

### Task

- `GET / Task` - Get all task
- `GET /Task/:id` - Get taks by ID
- `POST /Task` - Create new task
- `PUT /Task/:id` - Update task
- `DELETE /Task/:id` - Delete task

### Security & Best Practices

- Try/catch for all fetch calls
- Frontend & backend validations
- User-friendly error messages
- Modular code (auth.js, api.js, utils.js)
- Responsive design with Bootstrap 5

---

## 🎨 Design Features

- **Responsive Layout**: Works on all screen sizes
- **Smooth Animations**: Hover effects and transitions
- **Professional Typography**: Clear, readable fonts
- **Consistent Icons**: Bootstrap Icons integration

---

## 👤 Coder

- **Clan:** Turing - C6
- **Name:** Hector Hernan Rios Rodriguez
- **email:** riosrodriguezhectorhernan59qgmail.com

---
