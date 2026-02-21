# Services & Estimation Flow Documentation

## Overview
The services are displayed on both the Home Page and Services Page with "Get Estimation" buttons. When users click the button, they can configure their requirements, add items to cart, and submit a quote request that gets emailed to contact@zsyio.com.

## Pages with Services

### 1. Home Page (http://localhost:5173/)
- **Location**: Main page, Services section
- **Services Display**: Grid of all available services
- **Estimation Button**: ✅ ENABLED (Get Estimation button on each service card)
- **Component**: `ServicesGrid` with `showEstimateButton={true}`

### 2. Services Page (http://localhost:5173/services)
- **Location**: Dedicated services page
- **Services Display**: Grid of all available services
- **Estimation Button**: ✅ ENABLED (Get Estimation button on each service card)
- **Component**: `ServicesGrid` with `showEstimateButton={true}`

## Estimation Flow

### Step 1: User Clicks "Get Estimation"
- Navigates to `/estimate/:serviceId`
- Example: `/estimate/web-development`

### Step 2: Configure Requirements
Users can configure service-specific parameters:

**Web Designing:**
- Number of Pages
- Design Iterations
- Include Logo Design (checkbox)

**Web Development:**
- Number of Pages
- Features (Auth, Payments, etc.)
- Database Complexity

**Mobile App Development:**
- Platforms (iOS, Android)
- Features
- Backend Integration

**Data Solutions:**
- Dashboards
- Integrations

### Step 3: Real-time Cost Calculation
- Backend API calculates cost based on inputs
- Displays breakdown of costs
- Shows estimated total in ₹ (Indian Rupees)

### Step 4: Add to Cart
- User clicks "Add to Cart" button
- Item is stored in local cart
- Can add multiple services

### Step 5: Request Quote via Email
- User clicks "Request Quote via Email" button
- Contact form appears with fields:
  - Name (required)
  - Email (required)
  - Phone (required)

### Step 6: Submit Quote Request
When submitted, the system:
1. Formats cart details into a message
2. Sends to backend `/api/contact/` endpoint
3. Backend sends two emails via Resend API:
   - **Admin Notification** → contact@zsyio.com
   - **User Confirmation** → User's email

## Email Content Example

**Subject**: New Contact Form Submission from [User Name]

**To**: contact@zsyio.com

**Body**:
```
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

## Backend Configuration

### Email Settings (already configured):
- **Resend API Key**: Set in `.env` as `RESEND_API_KEY`
- **From Email**: onboarding@resend.dev
- **Admin Email**: contact@zsyio.com
- **Auto-reply**: Sent to user's email

### API Endpoints:
- `GET /api/services/services/` - Fetch all services
- `GET /api/estimation/rules/` - Get default estimation parameters
- `POST /api/estimation/calculate/` - Calculate cost estimate
- `POST /api/contact/` - Submit quote request (sends email)

## Testing the Flow

1. **Start Backend**:
   ```bash
   cd backend
   python manage.py runserver
   ```

2. **Start Frontend**:
   ```bash
   cd frontend/Zsyio
   npm run dev
   ```

3. **Test Steps**:
   - Visit http://localhost:5173/
   - Scroll to "Our Services" section
   - Click "Get Estimation" on any service
   - Configure your requirements
   - Click "Add to Cart"
   - Click "Request Quote via Email"
   - Fill in contact details
   - Submit

4. **Verify**:
   - Check backend console for email logs
   - Check contact@zsyio.com inbox for quote request
   - User should receive confirmation email

## Features

✅ Services displayed on Home Page
✅ Services displayed on Services Page  
✅ Estimation button on all service cards
✅ Real-time cost calculation
✅ Shopping cart functionality
✅ Quote request form
✅ Email notifications to contact@zsyio.com
✅ Auto-reply confirmation to users
✅ Mobile responsive design
✅ Smooth animations and transitions

## Notes

- Cart is stored in localStorage (persists across page refreshes)
- All costs are calculated server-side for accuracy
- Email sending is non-blocking (won't crash if Resend API fails)
- Contact form submissions are saved to database even if email fails
