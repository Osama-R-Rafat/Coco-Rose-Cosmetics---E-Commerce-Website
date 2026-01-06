# 🌹 Coco & Rose Cosmetics - E-Commerce Website

## 📋 Overview

A beautiful, modern e-commerce website for Coco & Rose natural cosmetics brand. Features a product catalog, shopping cart, WhatsApp integration for orders, and email notifications.

## ✨ Features

- 📱 **Mobile-First Design** - Optimized for Egyptian mobile users
- 🛒 **Shopping Cart** - Add products, update quantities, persistent cart (localStorage)
- 💬 **WhatsApp Integration** - Orders sent directly to WhatsApp
- 📧 **Email Notifications** - Receive order details via email (FormSubmit)
- 🎨 **Premium Design** - Rose/pink themed, smooth animations
- 🌐 **RTL Support** - Full Arabic language support
- 💾 **Offline Cart** - Cart persists even after closing browser

## 📁 Project Structure

```
cosmatics/
├── index.html          # Main HTML file
├── style.css           # CSS styles
├── app.js             # JavaScript functionality
├── images/
│   ├── logo.png       # Brand logo
│   ├── banner.png     # Hero banner
│   ├── product1.png   # Product images
│   ├── product2.png
│   └── product3.png
└── README.md          # This file
```

## 🚀 Quick Start

### 1. Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code, Sublime Text, etc.) - optional
- A local web server (see options below)

### 2. Setup Instructions

#### Option A: Using npx serve (Recommended)
```bash
# Navigate to project folder
cd f:/cosmatics

# Start server (will auto-install if needed)
npx serve

# Open browser to http://localhost:3000
```

#### Option B: Using Python
```bash
# Navigate to project folder
cd f:/cosmatics

# Python 3
python -m http.server 8000

# Open browser to http://localhost:8000
```

#### Option C: Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### 3. Configuration

#### A. WhatsApp Number
Open `app.js` and update line 45:
```javascript
const WHATSAPP_NUMBER = "201020909939"; // Replace with your number
```

#### B. Email Notifications (FormSubmit)

**IMPORTANT:** FormSubmit setup requires email verification on first use.

1. Open `app.js` and update line 48:
```javascript
const FORMSUBMIT_EMAIL = "your-email@example.com"; // Replace with YOUR email
```

2. **First-time Setup:**
   - Place a test order through the website
   - Check your email for a verification message from FormSubmit
   - Click the verification link
   - After verification, all future orders will be sent automatically

3. **FormSubmit Features:**
   - ✅ No backend required
   - ✅ 100% free
   - ✅ No API keys needed
   - ✅ Spam protection
   - ✅ Professional email templates

**Alternative Email Options:**

If you prefer EmailJS (more customizable):
1. Create account at https://www.emailjs.com/
2. Get your Service ID, Template ID, and Public Key
3. Replace FormSubmit code in `app.js` with EmailJS code

### 4. Customization

#### Add/Edit Products
Open `app.js` and modify the `products` array (lines 4-48):
```javascript
{
    id: 7,
    name: "منتج جديد",
    description: "وصف المنتج",
    price: 250,
    image: "images/product4.png",
    category: "skin"
}
```

#### Change Colors
Open `style.css` and modify CSS variables (lines 5-13):
```css
--primary-color: #a8577d;      /* Main brand color */
--secondary-color: #f5c6d9;    /* Secondary color */
--accent-color: #e8b4c8;       /* Accent color */
```

#### Update Contact Info
Edit `index.html` (lines 185-210) to update:
- Phone numbers
- Working hours
- Social media links

## 🔧 Testing the Website

### Test Checklist
- [ ] All product images load correctly
- [ ] Add products to cart
- [ ] Update quantities in cart
- [ ] Remove items from cart
- [ ] Cart persists after page refresh
- [ ] Checkout form validation works
- [ ] WhatsApp message opens correctly
- [ ] Email notification received (after FormSubmit verification)
- [ ] Mobile responsive design
- [ ] All links work

### Test Order Flow
1. Browse products
2. Add items to cart
3. Open cart sidebar
4. Update quantities
5. Click "إتمام الطلب عبر واتساب"
6. Fill customer information
7. Submit order
8. Verify WhatsApp opens with order details
9. Check email for order notification

## 📱 Mobile Testing

Test on actual mobile devices or use browser DevTools:
- Chrome DevTools: F12 → Toggle device toolbar
- Test different screen sizes (320px, 375px, 768px, 1024px)

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)
1. Go to https://www.netlify.com/
2. Drag & drop your `cosmatics` folder
3. Get instant live URL
4. Free SSL certificate included

### Option 2: GitHub Pages
1. Create GitHub repository
2. Upload files
3. Enable GitHub Pages in settings
4. Access via `your-username.github.io/repo-name`

### Option 3: Vercel
1. Go to https://vercel.com/
2. Import your project
3. Deploy with one click

## 🐛 Troubleshooting

### Products not showing
- Check console for errors (F12)
- Verify image paths in `app.js`
- Ensure images exist in `images/` folder

### Cart not working
- Check browser localStorage is enabled
- Clear browser cache and reload
- Check console for JavaScript errors

### WhatsApp not opening
- Verify phone number format in `app.js`
- Should be: country code + number (no + or spaces)
- Example: "201234567890" not "+20 123 456 7890"

### Email not sending
- Verify FormSubmit email is correct in `app.js`
- Check if you verified your email (first-time setup)
- Check spam/junk folder
- Wait up to 5 minutes for delivery

### Images not loading
- Check file paths are correct
- Ensure images are in `images/` folder
- Check image file extensions (.png, .jpg)
- Clear browser cache

## 📞 Support

For questions or issues:
- WhatsApp: 01020909939
- Phone: 01017377281

## 📄 License

© 2026 Coco & Rose Cosmetics. All rights reserved.

---

## 🎯 Quick Reference

### Key Files to Edit
1. `app.js` - Line 45: WhatsApp number
2. `app.js` - Line 48: Email address
3. `app.js` - Lines 4-48: Products data
4. `style.css` - Lines 5-13: Brand colors
5. `index.html` - Lines 185-210: Contact info

### Important Notes
- ⚠️ FormSubmit requires email verification on first use
- 💡 Cart data saved in browser localStorage
- 📱 Optimized for mobile (Egypt market)
- 🌐 Works offline (except email/WhatsApp features)
- 🔒 No sensitive data stored - cash on delivery only

Enjoy your new online store! 🌹✨
