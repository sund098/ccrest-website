# CCREST.in — 100% Free Tools Website (Demo)

**Fully functional static simulation** of the CCREST professional learning platform as specified in the confidential feature document.

## ✅ Features Implemented (Matching Spec)

### Core
- Premium professional design (navy + gold, clean typography)
- Fully responsive (mobile, tablet, desktop)
- 3 user roles: Learner, Teacher, Admin (switchable via login)

### Pages
- **Homepage** (`index.html`): Hero, featured courses, stats, testimonials, upcoming webinars
- **Courses Catalogue** (`courses.html`): Filterable by free/paid, level; search; instant enrol
- **Course Detail** (`course-detail.html`): Full Tutor LMS-style curriculum, YouTube embeds (unlisted), quizzes, PDF viewer simulation, Q&A, progress
- **Learner Dashboard** (`dashboard-learner.html`): Enrolled courses, progress, certificates
- **Teacher Dashboard** (`dashboard-teacher.html`): Course management, announcements
- **Admin Dashboard** (`dashboard-admin.html`): Overview, revenue, user management, course creation
- **Events** (`events.html`): Calendar + registration (Events Calendar plugin simulation)
- **About, Contact, Blog**: Standard pages

### Key Functional Flows (Free Stack)
- **Free courses**: Instant enrolment
- **Paid courses**: Full Razorpay / Stripe checkout simulation (with transaction records)
- **Certificates**: Auto-generated on completion + downloadable (simulated)
- **Login/Register**: Role-based dashboards
- **Content protection**: Right-click disabled + copy protection
- **Live sessions**: Google Meet simulation
- **Progress tracking**: Real-time lesson completion
- **Announcements & Q&A**

### Technology Stack (as per spec)
- **Frontend**: Pure HTML + Tailwind CSS + vanilla JS
- **LMS simulation**: Tutor LMS
- **Visual editor simulation**: Elementor
- **Payments**: WooCommerce + Razorpay + Stripe
- **Video**: YouTube unlisted embed simulation
- **PDFs**: Google Drive protected embed simulation
- **All tools free** — no paid dependencies

## How to Run

1. Open `index.html` in any browser.
2. Click **Login** (top-right).
3. Use these demo accounts:
   - **Learner**: `learner@demo.ccrest.in` / `demo123`
   - **Teacher**: `teacher@demo.ccrest.in` / `demo123`
   - **Admin**: `admin@ccrest.in` / `demo123`

Or use the "Quick Google" buttons in login.

## Key Demo Highlights

- Enrol in free courses instantly
- Complete paid checkout (Razorpay/Stripe)
- Complete lessons → get certificate
- Switch roles and explore different dashboards
- All data persists in browser localStorage

## Notes

- This is a **high-fidelity static demo** built to match the exact feature spec.
- In production this would be built on:
  - WordPress + Tutor LMS (free)
  - Elementor Free
  - WooCommerce + Razorpay/Stripe plugins
  - All other free plugins listed in the spec

Built 100% following the "100% Free Tools Edition" document.

---

**CCREST** — Center for Clinical Research Education & Skills Training  
[ccrest.in](http://ccrest.in) | Confidential for Developer Use