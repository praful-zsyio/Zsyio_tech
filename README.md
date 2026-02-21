# Zsyio Project

## Overview
Zsyio is a modern full-stack web application designed to showcase projects, offer service estimations, and provide interactive AI chatbot features. It works with a robust Django backend and a dynamic React frontend powered by Vite.

## Tech Stack

### Backend
- **Framework:** Django 5, Django Rest Framework (DRF)
- **Authentication:** SimpleJWT (JSON Web Tokens)
- **Database:** SQLite (Default)
- **Server:** Gunicorn
- **AI Integration:** OpenAI, Google Gemini
- **Email Service:** Resend

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Animations:** Framer Motion, GSAP
- **Routing:** React Router DOM
- **3D Graphics:** React Three Fiber

## Features
- **Project Showcase:** Browsable portfolio of projects.
- **Service Estimation:** interactive tools to estimate service costs.
- **AI Chatbot:** Integrated intelligent chatbot for user assistance.
- **Authentication:** Secure user login and token management.
- **Contact System:** Functional contact form with email notifications via Resend.
- **Shopping Cart:** E-commerce functionality for managing selected services/items.

## Installation & Setup

### Prerequisites
- Python 3.x
- Node.js & npm

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # Mac/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run database migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the development server:
   ```bash
   python manage.py runserver
   ```
   The backend API will run at `http://127.0.0.1:8000/`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend/Zsyio
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend application will run at `http://localhost:5173/`.

## Environment Variables
Ensure you have a `.env` file in your backend configuration directory with the following keys:
- `SECRET_KEY`
- `EMAIL_HOST_USER`
- `EMAIL_HOST_PASSWORD`
- `JWT_SECRET_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_ADMIN_EMAIL`
- `OPENAI_API_KEY` (if applicable)
- `GEMINI_API_KEY` (if applicable)

## API Endpoints
The backend provides the following main API endpoints:
- **Authentication:** `/api/token/`, `/api/token/refresh/`
- **Projects:** `/api/projects/`
- **Services:** `/api/services/`
- **Cart:** `/api/cart/`
- **Estimation:** `/api/estimation/`
- **Chatbot:** `/api/chatbot/`
- **Contact:** `/api/contact/`
- **Configuration:** `/api/config/`
