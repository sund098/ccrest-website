# CCREST.in — Production Deployment Guide
**100% Free Tools Edition**  
**Target:** Hostinger Starter (or any WordPress host)

---

## 1. Pre-Deployment Checklist

✅ Website demo reviewed and approved  
✅ All user flows tested (free/paid enrolment, certificates, dashboards)  
✅ Branding approved (navy #0F2744 + gold #C9A34E)  
✅ Domain `ccrest.in` already owned  

---

## 2. Hosting Setup (Hostinger Starter)

1. Log in to Hostinger
2. Purchase / activate **Starter** plan (~₹300-400/month)
3. Add your domain `ccrest.in` (or point it)
4. Go to **Hosting** → **Website** → **Install WordPress**
   - Choose latest WordPress
   - Set admin email to your official CCREST email
   - **Important**: Use a strong password for the first admin

5. After installation, **enable SSL** (free Let's Encrypt)
   - In Hostinger panel: SSL → Install SSL (automatic)

---

## 3. Required Free Plugins (Install in this exact order)

Go to **WordPress Admin → Plugins → Add New**

### Core (Must Have)
1. **Tutor LMS** (Free version)
2. **Elementor** (Free version)
3. **WooCommerce**
4. **Tutor LMS WooCommerce Integration** (comes with Tutor)

### Payments (Free)
5. **Razorpay for WooCommerce** (official)
6. **Stripe for WooCommerce** (official)

### Invoices & Documents
7. **WooCommerce PDF Invoices & Packing Slips** (by WP Overnight)

### Email
8. **WP Mail SMTP** (by WPForms)
9. Create free Brevo account → Get SMTP credentials

### Events
10. **The Events Calendar** (Free)

### Forms
11. **WPForms Lite**

### Security & Protection
12. **Wordfence Security** (Free)
13. **Limit Login Attempts Reloaded**
14. **GDPR Cookie Consent**

### Performance
15. **Smush** (image optimization)
16. **WP Super Cache** (or LiteSpeed Cache)

### Backup
17. **UpdraftPlus** (Free) → Connect to Google Drive

### Others
18. **Import Users from CSV** (for bulk learners)
19. **WP Activity Log** (optional but recommended)

---

## 4. Theme & Design Setup

1. Go to **Appearance → Themes**
   - Install a clean free theme: **Astra** (recommended) or **Hello Elementor**

2. Go to **Elementor → Settings**
   - Enable Elementor on Pages and Posts

3. **Replicate the design** using this static demo as reference:
   - Use the exact colors:
     - Primary Navy: `#0F2744`
     - Gold/Accent: `#C9A34E`
   - Typography: Inter or Poppins (Google Fonts - free)
   - Logo: Use `assets/images/logo.png`

4. Build pages with Elementor:
   - Homepage
   - Courses (use Tutor LMS archive)
   - About, Contact, Blog

---

## 5. Tutor LMS Configuration

1. Go to **Tutor LMS → Settings**
2. Enable:
   - Courses
   - Enrolment
   - Certificates
   - Q&A
   - Announcements

3. **Create User Roles**
   - Go to **Users → Add New**
   - Create teachers and assign "Instructor" role

4. **Create Your First Course**
   - Use the exact structure from `course-detail.html`
   - Add lessons with:
     - YouTube unlisted video embeds
     - Google Drive PDF embeds (with `&rm=minimal`)
   - Set price for paid courses

5. **Certificates**
   - Tutor LMS → Certificates → Create new
   - Use the branding from the demo

---

## 6. WooCommerce + Payment Setup

1. **WooCommerce Setup Wizard**
   - Set currency to INR
   - Enable taxes (GST)

2. **Razorpay**
   - Install "Razorpay for WooCommerce"
   - Go to WooCommerce → Settings → Payments
   - Enable Razorpay
   - Enter your Razorpay Key ID and Secret (test mode first)

3. **Stripe**
   - Enable Stripe
   - Add your Stripe keys (test mode first)

4. **Test both gateways** using test cards:
   - Razorpay test UPI / card
   - Stripe test card: `4242 4242 4242 4242`

---

## 7. Content Migration from Demo

Use this HTML demo as the **design reference**:

- Homepage layout → Recreate in Elementor
- Course cards → Use Tutor LMS course grid
- Course detail page → Use Tutor LMS single course template + Elementor
- Dashboards → Handled automatically by Tutor LMS + WooCommerce

**Recommended approach:**
- Build pages one by one using Elementor
- Copy text content directly from the HTML files
- Use the images from `assets/images/`

---

## 8. Security & Compliance (Free)

1. **SSL** — Already enabled
2. **Wordfence** — Run initial scan
3. **Cloudflare** (free tier recommended):
   - Add site to Cloudflare
   - Enable Turnstile (free CAPTCHA replacement)
4. **Privacy Policy** — Create page and link it
5. **Backups**:
   - UpdraftPlus → Schedule daily backups to Google Drive

---

## 9. Email Setup (Brevo Free Tier)

1. Create free account at brevo.com (300 emails/day free)
2. Verify domain
3. Get SMTP credentials
4. In WP Mail SMTP:
   - Host: `smtp-relay.brevo.com`
   - Port: 587
   - Authentication: Yes
   - Use your Brevo credentials

---

## 10. Go Live Checklist

- [ ] All plugins installed and activated
- [ ] SSL active + site loads on HTTPS
- [ ] Test free course enrolment
- [ ] Test paid course with both Razorpay & Stripe (use test mode)
- [ ] Test certificate generation
- [ ] Test learner, teacher, and admin dashboards
- [ ] Set up Google Analytics 4
- [ ] Configure UpdraftPlus backups
- [ ] Create real Super Admin account
- [ ] Delete demo accounts or change passwords
- [ ] Add real course content
- [ ] Add real instructor bios
- [ ] Publish site

---

## 11. Post-Launch

- Monitor first few enrolments
- Check email deliverability
- Review Razorpay/Stripe dashboard for real transactions
- Use Wordfence for ongoing security

---

## 12. Support

This demo + handover documents give you everything needed.

If you need:
- Specific Elementor template JSONs
- Exact plugin configuration screenshots
- Help with any step

Contact the developer for 30-day support as mentioned in the original spec.

---

**You now have everything required to build the live site on the exact free stack specified.**

Good luck with the launch! 

**CCREST** — Ready for real learners.