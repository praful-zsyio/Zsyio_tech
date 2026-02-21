# Zsyio Company - Complete API Documentation

## Backend Status: ✅ All Systems Operational

### Recently Added Apps:
1. **cloudinary_upload** - Image/Video upload management
2. **theme** - Theme preference management
3. **colors** - Color palette and scheme management

---

## API Endpoints Summary

### 1. Authentication
- POST `/api/login/` - User login (JWT)
- POST `/api/login/refresh/` - Refresh JWT token

### 2. Projects
- GET `/api/projects/` - List all projects
- POST `/api/projects/` - Create project (requires auth)
- GET `/api/projects/{id}/` - Get project details
- DELETE `/api/projects/{id}/` - Delete project (requires auth)

### 3. Services
- GET `/api/services/` - List all services
- POST `/api/services/` - Create service
- GET `/api/services/{slug}/` - Get service by slug

### 4. Cart
- POST `/api/cart/add_item/` - Add service to cart
  - Body: `{"service_slug": "data-analytics", "quantity": 1}`

### 5. About
- GET `/api/about/` - List about entries
- POST `/api/about/` - Create about entry
  - Supports: JSON, multipart/form-data

### 6. Contact
- POST `/api/contact/` - Submit contact form

### 7. Chatbot
- POST `/api/chatbot/` - Send message to chatbot

### 8. Estimation
- POST `/api/estimation/` - Get service estimation

### 9. Config
- GET `/api/config/` - Get site configuration
- POST `/api/config/privacy-consent/` - Submit privacy consent

### 10. Cloudinary (NEW)
- POST `/api/cloudinary/upload/` - Upload image/video
  - Form-data: `file`, `folder` (optional), `resource_type` (optional)
- DELETE `/api/cloudinary/delete/` - Delete file
  - JSON: `{"public_id": "...", "resource_type": "image"}`

### 11. Theme (NEW)
- GET `/api/theme/user/` - Get user theme preference
- POST `/api/theme/user/` - Update user theme
  - JSON: `{"theme_mode": "dark|light|auto", "primary_color": "#...", "accent_color": "#..."}`
- GET `/api/theme/global/` - Get global theme config
- POST `/api/theme/global/` - Update global theme config

### 12. Colors (NEW)
- GET `/api/colors/palettes/` - List color palettes
- GET `/api/colors/palettes/active/` - Get active palettes
- GET `/api/colors/palettes/default/` - Get default palette
- POST `/api/colors/palettes/{id}/set_default/` - Set default palette
- GET `/api/colors/schemes/` - List color schemes
- GET `/api/colors/schemes/by_theme/?type=dark` - Get schemes by theme
- GET `/api/colors/custom/` - List custom colors
- GET `/api/colors/custom/by_category/?category=button` - Get by category
- GET `/api/colors/custom/css_variables/` - Export CSS variables
- GET `/api/colors/gradients/` - List gradient presets
- GET `/api/colors/gradients/active/` - Get active gradients

---

## Common Issues & Solutions

### Issue 1: "Unsupported media type" Error
**Solution**: Ensure Content-Type header is set correctly
- For JSON: `Content-Type: application/json`
- For file uploads: `Content-Type: multipart/form-data`

### Issue 2: Service slug not found in cart
**Solution**: Use exact slug from database or let slugify handle it
- The cart API now auto-converts spaces to hyphens

### Issue 3: MongoDB SSL/TLS Error
**Solution**: Already fixed - all MongoDB connections use `tlsAllowInvalidCertificates=True`

### Issue 4: CORS errors
**Solution**: Already configured - `CORS_ALLOW_ALL_ORIGINS = True`

---

## Frontend Integration Examples

### 1. Upload to Cloudinary
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('folder', 'projects');

const response = await fetch('/api/cloudinary/upload/', {
  method: 'POST',
  body: formData
});
const data = await response.json();
console.log(data.data.secure_url); // Use this URL
```

### 2. Get and Apply Theme
```javascript
const theme = await fetch('/api/theme/user/').then(r => r.json());
document.documentElement.setAttribute('data-theme', theme.data.theme_mode);
```

### 3. Load Color Palette
```javascript
const palette = await fetch('/api/colors/palettes/default/').then(r => r.json());
document.documentElement.style.setProperty('--primary', palette.data.primary);
```

### 4. Add to Cart
```javascript
await fetch('/api/cart/add_item/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    service_slug: 'data-analytics',
    quantity: 1
  })
});
```

---

## Database Migrations Status
All migrations are up to date for:
- ✅ about
- ✅ authentication
- ✅ cart
- ✅ chatbot
- ✅ cloudinary_upload (no models)
- ✅ colors
- ✅ config_api
- ✅ contact
- ✅ estimation
- ✅ projects
- ✅ services
- ✅ theme

---

## Next Steps
1. Test all endpoints using Postman/Thunder Client
2. Verify MongoDB logging is working
3. Check Cloudinary uploads
4. Test theme switching on frontend
5. Verify color palette loading

## Support
If you encounter specific errors, please provide:
- Error message
- Endpoint being called
- Request payload
- Browser console logs (for frontend)
- Django server logs (for backend)
