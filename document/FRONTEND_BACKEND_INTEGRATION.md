# Frontend-Backend Integration Guide

## ✅ All Frontend Errors Fixed!

### Missing Data Files Created:
- ✅ `src/data/reportWebVitals.js`
- ✅ `src/data/useScrollPosition.js`
- ✅ `src/data/theme.js`
- ✅ `src/data/navLinks.js`
- ✅ `src/data/estimationRules.js`
- ✅ `src/data/servicesData.js`
- ✅ `src/data/aboutData/aboutStats.js`
- ✅ `src/data/aboutData/aboutTestimonials.js`
- ✅ `src/data/aboutData/aboutTechStack.js`
- ✅ `src/data/aboutData/aboutWhyPartner.js`
- ✅ `src/data/aboutData/aboutIndustries.js`
- ✅ `src/data/aboutData/aboutProcess.js`
- ✅ `src/data/aboutData/aboutValues.js`

### API Service Updated:
✅ All new backend endpoints added to `src/services/api.js`

---

## Backend APIs Now Available in Frontend

### 1. Theme Management
```javascript
import { getUserTheme, updateUserTheme, getGlobalTheme } from './services/api';

// Get user's theme preference
const theme = await getUserTheme();

// Update theme
await updateUserTheme({
  theme_mode: 'dark',
  primary_color: '#3b82f6',
  accent_color: '#8b5cf6'
});

// Get global theme config
const globalTheme = await getGlobalTheme();
```

### 2. Color Management
```javascript
import { 
  getDefaultColorPalette, 
  getCSSVariables,
  getActiveGradients 
} from './services/api';

// Get default color palette
const palette = await getDefaultColorPalette();

// Apply colors to your app
document.documentElement.style.setProperty('--primary', palette.data.primary);

// Get CSS variables
const cssVars = await getCSSVariables();

// Get gradients
const gradients = await getActiveGradients();
```

### 3. Cloudinary Upload
```javascript
import { uploadToCloudinary, deleteFromCloudinary } from './services/api';

// Upload image
const handleUpload = async (file) => {
  const response = await uploadToCloudinary(file, 'projects', 'image');
  console.log(response.data.data.secure_url); // Use this URL
};

// Delete image
await deleteFromCloudinary('uploads/abc123', 'image');
```

### 4. Services (Backend-Connected)
```javascript
import { getServices, createService, getServiceBySlug } from './services/api';

// Get all services from backend
const services = await getServices();

// Create new service
await createService({
  slug: 'web-development',
  title: 'Web Development',
  description: '...',
  icon: 'Code',
  base_rate: 5000,
  hourly_rate: 500
});

// Get specific service
const service = await getServiceBySlug('web-development');
```

### 5. About (Backend-Connected)
```javascript
import { getAbout, createAbout } from './services/api';

// Get about data
const about = await getAbout();

// Create about entry (JSON)
await createAbout({
  title: 'About Us',
  description: '...',
  tech_stack: ['React', 'Django'],
  tags: ['Featured']
});

// Create about entry (with image)
const formData = new FormData();
formData.append('title', 'About Us');
formData.append('description', '...');
formData.append('image', fileInput.files[0]);
formData.append('tech_stack', JSON.stringify(['React', 'Django']));
await createAbout(formData);
```

### 6. Projects (Backend-Connected)
```javascript
import { getProjects, createProject, deleteProject } from './services/api';

// Get all projects
const projects = await getProjects();

// Create project
await createProject({
  title: 'My Project',
  category: 'Web Development',
  summary: '...',
  description: '...',
  tech_stack: ['React', 'Node.js'],
  tags: ['Featured']
});

// Delete project
await deleteProject(projectId);
```

### 7. Cart (Backend-Connected)
```javascript
import { getCart, addToCart } from './services/api';

// Add to cart
await addToCart('data-analytics', 1);

// Get cart
const cart = await getCart();
```

### 8. Contact & Estimation (Backend-Connected)
```javascript
import { submitContact, calculateEstimate } from './services/api';

// Submit contact form
await submitContact({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  message: 'Hello!'
});

// Calculate estimation
const estimate = await calculateEstimate({
  service_type: 'web-development',
  pages: 5,
  features: 3,
  complexity: 'medium'
});
```

---

## Integration Examples

### Example 1: Theme Switcher Component
```javascript
import { useEffect, useState } from 'react';
import { getUserTheme, updateUserTheme } from '../services/api';

function ThemeSwitcher() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Load theme from backend
    getUserTheme().then(response => {
      setTheme(response.data.data.theme_mode);
      document.documentElement.setAttribute('data-theme', response.data.data.theme_mode);
    });
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    await updateUserTheme({ theme_mode: newTheme });
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return <button onClick={toggleTheme}>Toggle Theme</button>;
}
```

### Example 2: Color Palette Loader
```javascript
import { useEffect } from 'react';
import { getDefaultColorPalette } from '../services/api';

function ColorLoader() {
  useEffect(() => {
    getDefaultColorPalette().then(response => {
      const palette = response.data.data;
      
      // Apply colors to CSS variables
      document.documentElement.style.setProperty('--primary', palette.primary);
      document.documentElement.style.setProperty('--secondary', palette.secondary);
      document.documentElement.style.setProperty('--accent', palette.accent);
      document.documentElement.style.setProperty('--success', palette.success);
      document.documentElement.style.setProperty('--error', palette.error);
    });
  }, []);

  return null;
}
```

### Example 3: Image Upload Component
```javascript
import { useState } from 'react';
import { uploadToCloudinary } from '../services/api';

function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await uploadToCloudinary(file, 'projects', 'image');
      setImageUrl(response.data.data.secure_url);
      console.log('Uploaded:', response.data.data);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} disabled={uploading} />
      {uploading && <p>Uploading...</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}
```

---

## Migration from Static Data to Backend

### Before (Static Data):
```javascript
import { services } from '../data/servicesData';
// services is a static array
```

### After (Backend Data):
```javascript
import { useEffect, useState } from 'react';
import { getServices } from '../services/api';

function ServicesComponent() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then(response => {
      setServices(response.data);
    });
  }, []);

  return (
    <div>
      {services.map(service => (
        <div key={service.slug}>{service.title}</div>
      ))}
    </div>
  );
}
```

---

## Next Steps

1. ✅ **Frontend errors fixed** - All missing data files created
2. ✅ **API service updated** - All backend endpoints available
3. 🔄 **Replace static data with API calls** - Update components to fetch from backend
4. 🔄 **Test theme switching** - Verify theme API integration
5. 🔄 **Test color management** - Verify color palette loading
6. 🔄 **Test file uploads** - Verify Cloudinary integration

## Testing Checklist

- [ ] Theme loads from backend on app start
- [ ] Theme changes persist to backend
- [ ] Color palette applies to UI
- [ ] Services load from backend
- [ ] Projects load from backend
- [ ] About data loads from backend
- [ ] Cart functionality works
- [ ] Contact form submits to backend
- [ ] Image upload to Cloudinary works
- [ ] All API calls handle errors gracefully

---

## Backend Status
✅ All systems operational
✅ All migrations applied
✅ MongoDB logging configured
✅ CORS enabled for frontend
✅ All new APIs ready to use

Your frontend should now run without errors and can connect to all backend services!
