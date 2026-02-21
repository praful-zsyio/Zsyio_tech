# Services & Estimation - Quick Reference Guide

## ✅ Current Setup Configuration

### 1. Home Page (`http://localhost:5173/`)
**Location**: Line 35 in `HomePage.jsx`
```jsx
<ServicesGrid isInView={isInView} showEstimateButton={false} />
```
✅ **Services Displayed**: Yes, showing all available services.
❌ **Estimation Button**: **HIDDEN** (As per user request, estimation is only available on the Services page).

### 2. Services Page (`http://localhost:5173/services`)
**Location**: Line 50 in `ServicesPage.jsx`
```jsx
<ServicesGrid isInView={isInView} showEstimateButton={true} />
```
✅ **Services Displayed**: Yes, showing all available services.
✅ **Estimation Button**: **ENABLED** (User can click to get an estimate).

### 3. Theme System (`Manual Toggle`)
**Location**: Navbar (Top Right)
- ✅ **Toggle Button**: Sun/Moon icon available on all pages.
- ✅ **Functionality**: Manually switches between Light and Dark themes.
- ✅ **Persistence**: Saves preference to localStorage.

---

### Estimation Flow (Starting from Services Page)

#### Step-by-Step User Journey:

1. **Navigate to Services Page**
   - User visits `http://localhost:5173/services`

2. **User clicks "Get Estimation"**
   - Redirects to: `/estimate/:serviceId`
   - Example: `/estimate/web-development`

3. **Configure Service Requirements**
   - Web Designing: Pages, iterations, logo design
   - Web Development: Pages, features, database
   - Mobile App: Platforms, features, backend
   - Data Solutions: Dashboards, integrations

4. **Real-time Cost Calculation**
   - Backend API calculates cost
   - Shows breakdown of costs
   - Displays total in ₹ (Indian Rupees)

5. **Add to Cart**
   - Click "Add to Cart" button
   - Item stored in localStorage
   - Can add multiple services

6. **Request Quote via Email**
   - Click "Request Quote via Email"
   - Fill contact form:
     - Name (required)
     - Email (required)
     - Phone (required)

7. **Submit to Email**
   - Form submits to `/api/contact/`
   - Backend sends email to: **contact@zsyio.com**
   - Email includes:
     - All cart items with costs
     - Total estimate
     - Customer contact details
   - User receives confirmation email

## 📧 Email Details

### Admin Email (contact@zsyio.com) Receives:
```
Subject: New Contact Form Submission from [Customer Name]

New Quote Request from Website:

CART ITEMS:
- Web Development: ₹50,000
- Mobile App Development: ₹1,20,000

TOTAL ESTIMATE: ₹1,70,000

Customer Details:
Name: John Doe
Email: john@example.com
Phone: 9876543210
```

## 🔧 Backend Configuration

### Email Settings:
- **API Endpoint**: `POST /api/contact/`
- **Resend API Key**: Set in `.env` as `RESEND_API_KEY`
- **Admin Email**: `contact@zsyio.com`

### Estimation API Endpoints:
- `GET /api/services/services/` - Fetch all services
- `GET /api/estimation/rules/` - Get default parameters
- `POST /api/estimation/calculate/` - Calculate cost
- `POST /api/contact/` - Submit quote (sends email)
