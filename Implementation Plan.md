# Intellify IELTS Platform: Complete Implementation Plan

## Design System (Strict — No Exceptions)

**Color Palette:**
- **Primary Red:** `#C0392B` (used for all CTAs, active states, highlights, icons)
- **Deep Red:** `#96281B` (hover states for red elements)
- **Pure White:** `#FFFFFF` (page backgrounds, card backgrounds)
- **Off-White:** `#F5F5F5` (section backgrounds, alternating rows)
- **Pure Black:** `#000000` (primary headings)
- **Dark Gray:** `#1A1A1A` (body text)
- **Mid Gray:** `#555555` (secondary text, captions)
- **Light Gray Border:** `#E0E0E0` (card borders, dividers)

**Typography:**
- **Font Family:** Inter (Google Fonts)
- **H1:** 56px, Bold, Black
- **H2:** 40px, Bold, Black
- **H3:** 28px, SemiBold, Black
- **H4:** 20px, SemiBold, Dark Gray
- **Body:** 16px, Regular, Dark Gray
- **Caption/Label:** 13px, Medium, Mid Gray

**UI Rules:**
- Buttons: Pill-shaped or sharp rectangular (primary = Red background + White text; secondary = White background + Red border + Red text; ghost = no background + Black text)
- Cards: White background, 1px `#E0E0E0` border, 8px border-radius, subtle shadow on hover
- Navbar: White background with bottom border, logo on left, links center, CTA on right
- Inputs: White background, 1px `#E0E0E0` border, red focus ring

---

## Site Architecture & Page Map

```
/                           → Landing Page (Public)
/about                      → About Us (Public)
/pricing                    → Pricing Plans (Public)
/blog                       → Blog / Articles List (Public)
/blog/[slug]                → Individual Blog Article (Public)
/contact                    → Contact Us (Public)

/auth/login                 → Login Page
/auth/signup                → Sign Up Page
/auth/forgot-password       → Forgot Password
/auth/reset-password        → Reset Password

/dashboard                  → Student Dashboard (Protected)
/dashboard/profile          → My Profile & Settings (Protected)
/dashboard/progress         → Progress Tracker (Protected)

/modules                    → All Modules Overview (Protected)
/modules/listening          → Listening Module Hub
/modules/reading            → Reading Module Hub
/modules/writing            → Writing Module Hub
/modules/speaking           → Speaking Module Hub

/practice/listening/[id]    → Listening Practice Test (Protected)
/practice/reading/[id]      → Reading Practice Test (Protected)
/practice/writing/[id]      → Writing Practice + AI Feedback (Protected)
/practice/speaking/[id]     → Speaking Practice + Avatar Exam (Protected)

/results/[testId]           → Test Results & AI Report (Protected)
/results/history            → Test History (Protected)

/learn/videos               → Video Tutorials List (Protected)
/learn/videos/[id]          → Video Tutorial Player (Protected)
/learn/tips                 → Tips & Strategies (Protected)
/learn/tips/[module]        → Tips for a Specific Module (Protected)
/learn/vocabulary           → Vocabulary Builder (Protected)

/mock-exam                  → Full Mock Exam Hub (Protected)
/mock-exam/[examId]         → Full Mock Exam Session (Protected)
/mock-exam/avatar-test      → Final Avatar-Led Exam (Protected)
```

---

## Page-by-Page Specification

---

### 1. Landing Page `/`

**Purpose:** Convert visitors into sign-ups.

**Component: Navbar**
- Logo (left): "Intellify IELTS" in Bold Black with a red dot/accent.
- Navigation Links (center): `Home` | `About` | `Pricing` | `Blog` | `Contact` — all black text, red underline on hover.
- CTA (right): `Login` (ghost button, black text) + `Get Started Free` (Red primary button).
- Mobile: Hamburger menu icon (black) that opens a full-screen white drawer.

**Component: Hero Section**
- Full-width, white background.
- Tag line above heading: `#1 AI-Powered IELTS Preparation` in Red, 13px, SemiBold.
- H1: "Achieve Your Target Band Score with AI."
- Subtext (16px Gray): "Get evaluated by AI using the exact IELTS rubrics. Practice writing, speaking, and listening with structured, professional feedback."
- Two Buttons:
  - `Start Practicing Free` → links to `/auth/signup` (Red primary)
  - `See How It Works` → smooth-scrolls to Features section (White secondary)
- Hero image or animated illustration on the right: Student at laptop with AI chat bubbles showing writing feedback.

**Component: Trust Bar (Social Proof Strip)**
- Light gray background bar below hero.
- Text: "Trusted by 10,000+ IELTS aspirants worldwide" in Mid Gray.
- Row of 5 university/institute logos or partner logos.

**Component: Core Features Section**
- H2: "Everything you need to crack IELTS."
- 3-column grid of Feature Cards:
  1. Icon (Red) + Title: "AI Writing Evaluator" + Short description: "Get scored on all 4 IELTS rubrics: Task Achievement, Coherence, Lexical Resource, and Grammar."
  2. Icon (Red) + Title: "AI Speaking Practice" + Short description: "Record your responses. Our AI transcribes and evaluates fluency, pronunciation, and grammar."
  3. Icon (Red) + Title: "Avatar-Led Mock Exam" + Short description: "Practice with an AI examiner avatar for the most realistic test experience possible."
  4. Icon (Red) + Title: "Video Tutorials" + Short description: "Curated, AI-generated lessons for all 4 IELTS modules."
  5. Icon (Red) + Title: "Progress Tracking" + Short description: "Track your band scores over time and identify your weak areas."
  6. Icon (Red) + Title: "Native Language Feedback" + Short description: "Receive AI feedback translated into your preferred language, with audio playback."

**Component: How It Works Section**
- H2: "From Practice to Band Score in 3 Steps."
- 3-step horizontal flow (numbered 01, 02, 03 in red):
  1. "Practice" → Submit a writing task or record a speaking response.
  2. "AI Evaluates" → Claude AI scores your submission against official IELTS criteria.
  3. "Improve" → Review structured feedback, track your score, and repeat.
- CTA button below: `Get Started Free` → `/auth/signup` (Red)

**Component: Testimonials Section**
- H2: "What our students say."
- Horizontally scrollable card carousel.
- Each Testimonial Card: Student avatar, name, nationality flag, star rating (5 stars in red), quote text, band score improvement (e.g., "5.5 → 7.0").

**Component: Pricing Preview Section**
- H2: "Simple, Transparent Pricing."
- Preview of the 2 main tiers (Standard and Pro+). No prices shown, only plan names and top 3 features each. 
- Single CTA: `View Full Pricing` → links to `/pricing` (Red outlined button)

**Component: Final CTA Banner**
- Red background section.
- H2 in White: "Start Your Journey to Band 8.0 Today."
- Subtext in White (lighter opacity): "Join thousands of students already preparing with AI."
- Button: `Create Free Account` → `/auth/signup` (White background + Red text)

**Component: Footer**
- 4-column layout on white background, black top border.
- Column 1: Logo + 2-line brand description + social media icons (Twitter/X, Instagram, LinkedIn, YouTube) — all black.
- Column 2: "Platform" links: Dashboard, Modules, Practice, Video Tutorials, Mock Exams.
- Column 3: "Company" links: About Us, Blog, Pricing, Contact.
- Column 4: "Legal" links: Privacy Policy, Terms of Service, Cookie Policy.
- Bottom bar: "© 2025 Intellify IELTS. All rights reserved." in Mid Gray.

---

### 2. About Page `/about`

**Component: Navbar** — Same as Landing Page.

**Component: Hero**
- H1: "Our Mission: Make IELTS Preparation Intelligent."
- Subtext: About the team, the vision.
- Team photo or illustration.

**Component: Mission & Values**
- 3 value cards: Accuracy (AI aligned with real rubrics), Accessibility (native language support), Improvement (data-driven progress tracking).

**Component: Footer** — Same as Landing Page.

---

### 3. Pricing Page `/pricing`

**Component: Pricing Toggle**
- Toggle switch: `Monthly | Annual` (Annual shows a "Save 20%" red badge).

**Component: Pricing Cards**
- Two cards side by side (Pro+ card has a Red background with White text to stand out).

**Standard Plan Card (White):**
- Name: "Standard"
- Price: Shown dynamically.
- Feature list (checkmark icon in Red for each):
  - Unlimited Video Tutorials
  - Unlimited AI Writing Evaluations
  - Unlimited Audio-Based Speaking Practice
  - 2 Avatar-Led Mock Tests per month
  - Progress Tracking Dashboard
  - Native Language Feedback (Text)
- CTA Button: `Get Started` → `/auth/signup?plan=standard` (Red)

**Pro+ Plan Card (Red background, White text):**
- Name: "Pro+"
- Badge: "Most Popular"
- Price: Shown dynamically.
- Feature list (white checkmark icons):
  - Everything in Standard
  - 10 Avatar-Led Mock Tests per month
  - Priority AI Processing
  - Native Language Audio Feedback
  - 1-on-1 AI Exam Strategy Session
- CTA Button: `Upgrade to Pro+` → `/auth/signup?plan=pro` (White background + Red text)

**Component: FAQ Accordion**
- 8 most common pricing/refund questions.
- Expand/Collapse on click. Red arrow icon that rotates on open.

---

### 4. Blog Page `/blog`

**Component: Blog Grid**
- Filter tabs: `All | Listening | Reading | Writing | Speaking | Tips & Strategies`
- 3-column grid of Article Cards.
- **Article Card:** Category tag in Red, H3 title, 2-line excerpt, author avatar + name, date, Read More link in Red.

---

### 5. Individual Blog Article `/blog/[slug]`

- Full article in a single-column centered layout.
- Author bio block at the bottom.
- Related Articles grid at the very end.

---

### 6. Contact Page `/contact`

- H2: "Get in Touch"
- Contact form with fields: Full Name, Email, Subject (dropdown), Message (textarea).
- Submit button: `Send Message` (Red primary).
- Below form: Email address, social media links.

---

### 7. Login Page `/auth/login`

**Layout:** Centered card on white/off-white background.

**Component: Login Card**
- Logo at top.
- H2: "Welcome back."
- `Email` input field.
- `Password` input field with show/hide toggle.
- `Forgot Password?` link (Red text) → `/auth/forgot-password`.
- `Sign In` primary button (Red, full width).
- OR divider.
- `Continue with Google` button (white with Google logo icon).
- Footer text: "Don't have an account? `Sign up free`" → `/auth/signup` (Red link).

---

### 8. Sign Up Page `/auth/signup`

**Component: Sign Up Card**
- Logo at top.
- H2: "Create your account."
- `Full Name` input.
- `Email` input.
- `Password` input with strength indicator bar (Gray → Red as strength increases).
- `Confirm Password` input.
- Checkbox: "I agree to the Terms of Service and Privacy Policy" (Red checkbox).
- `Create Account` primary button (Red, full width).
- OR divider.
- `Continue with Google` button.
- Footer: "Already have an account? `Sign in`" → `/auth/login` (Red link).

---

### 9. Forgot Password `/auth/forgot-password`

- Email input field.
- `Send Reset Link` button (Red).
- Success state: Green tick icon + "Check your inbox" message.
- Link back: `Back to Login` → `/auth/login`

---

### 10. Student Dashboard `/dashboard`

**Layout:** Fixed Left Sidebar + Main Content Area.

**Component: Left Sidebar (Fixed)**
- Logo at very top.
- Navigation items with icon + label (active item has Red background + White text, others are Black text + transparent):
  - `Dashboard` → `/dashboard`
  - `Modules` → `/modules`
  - `Practice` (sub-menu expandable)
    - `Listening` → `/practice/listening`
    - `Reading` → `/practice/reading`
    - `Writing` → `/practice/writing`
    - `Speaking` → `/practice/speaking`
  - `Video Tutorials` → `/learn/videos`
  - `Tips & Strategies` → `/learn/tips`
  - `Vocabulary Builder` → `/learn/vocabulary`
  - `Mock Exams` → `/mock-exam`
  - `My Results` → `/results/history`
  - `Progress` → `/dashboard/progress`
  - `Profile` → `/dashboard/profile`
- Bottom of sidebar: User avatar + name + `Logout` button.

**Component: Top Header Bar (within main area)**
- Page title (H3, Black).
- Right: Notification bell icon + User avatar dropdown.

**Component: Welcome Banner**
- "Good morning, [First Name]!" in H2.
- "Your target score: Band [X]" dynamically shown.
- Red CTA: `Continue Practicing` → last active module page.

**Component: Current Band Score Card**
- Large central card showing estimated band scores per module (Listening, Reading, Writing, Speaking) as a 4-quadrant grid.
- Each quadrant: Module name, current estimated band (large number), up/down trend arrow.

**Component: Recent Activity Feed**
- List of last 5 activities: e.g., "Completed Writing Task 2 — AI Feedback Ready" + timestamp + `View Report` link (Red).

**Component: Weekly Goal Tracker**
- A simple circular progress chart showing how many practices done this week vs. the weekly goal they set.

**Component: Quick Access Buttons**
- 4 large cards in a row: `Practice Writing` | `Practice Speaking` | `Watch Video` | `Take Mock Exam` — each with a Red icon.

---

### 11. Modules Overview `/modules`

**Layout:** Same sidebar as Dashboard.

**Component: Modules Grid (4 cards)**
Each module card contains:
- Module Name (H3): Listening, Reading, Writing, Speaking.
- Short description of what is covered.
- Band score estimate for that module.
- Progress bar (Red fill, Gray empty) showing % of practice material completed.
- Two buttons: `Practice Now` → relevant practice page, `Watch Tutorials` → relevant video page.

---

### 12. Writing Practice Page `/practice/writing/[id]`

**Layout:** Full screen, no sidebar (distraction-free).

**Component: Top Bar**
- Timer (countdown) in Red.
- Word count display.
- Save draft button (Gray ghost).
- Submit button (Red, enabled only when minimum word count is met).

**Component: Task Prompt Area (left 40%)**
- The writing task prompt (Task 1 or Task 2) displayed clearly.
- For Task 1: The graph/chart/map image is displayed here.

**Component: Writing Editor Area (right 60%)**
- Clean, minimal textarea with placeholder: "Start writing here..."
- Live word count at the bottom of the editor.

**Component: AI Feedback Panel (appears after submission)**
- Slides in from the right as a panel.
- 4 Score Cards (one per rubric) each with a band score number in Red:
  - Task Achievement / Task Response
  - Coherence and Cohesion
  - Lexical Resource
  - Grammatical Range & Accuracy
- Overall Band Score displayed prominently.
- Detailed Feedback Text below each score card.
- "Listen to Feedback" button (Deepgram TTS) with a Red play icon.
- Language selector dropdown: "Translate feedback to [Language]" → calls Claude to translate.
- At bottom: `Try Again` (ghost) | `View Full Report` → `/results/[testId]` (Red).

---

### 13. Speaking Practice Page `/practice/speaking/[id]`

**Layout:** Full screen, no sidebar.

**Component: Question Display**
- Speaking question/topic shown in large text.
- Preparation timer (1 minute countdown in Red).

**Component: Recording Control**
- Large Red circular Mic button to start recording.
- Recording animation (pulsing red ring) while active.
- Stop button turns the mic red → gray when stopped.
- Waveform visualizer in Red while recording.

**Component: AI Feedback Panel (appears after submission)**
- 4 score cards (same rubrics as Writing but for Speaking):
  - Fluency & Coherence
  - Lexical Resource
  - Grammatical Range & Accuracy
  - Pronunciation
- Transcription of the student's response shown in a text box.
- Filler word count highlighted in Red within the transcription (e.g., "um", "uh").
- "Listen to Feedback" (TTS audio) button.
- Language selector for translated feedback.

---

### 14. Avatar-Led Mock Exam `/mock-exam/avatar-test`

**Layout:** Full screen, immersive, dark overlay.

**Component: Exam Setup Screen**
- H2: "Your Final AI Examiner Mock Test"
- "This test uses your 1 monthly Avatar session." warning in Red.
- `Begin Exam` button (Red).

**Component: Live Avatar Screen**
- Left 60%: AI Avatar video stream (the "examiner") asking questions in real-time using HeyGen/D-ID API.
- Right 40%: Student's webcam video feed (so they can see themselves as they would in a real exam).
- Bottom center: Mic control + timer.

**Component: Post-Exam Report**
- Full evaluation across all 4 rubrics.
- Side-by-side comparison: "Previous Score vs. This Score."
- Examiner comments generated by Claude.
- `Download Report (PDF)` button.

---

### 15. Video Tutorial Player `/learn/videos/[id]`

**Layout:** Sidebar on left, video player takes up main area.

**Component: Video Player**
- Large Mux-powered adaptive video player (custom-styled Red progress bar, Red play/pause controls).
- Chapter markers on the timeline.
- Speed control: 0.5x, 1x, 1.25x, 1.5x, 2x.
- Subtitles toggle.

**Component: Video Sidebar (right panel)**
- Current module name.
- Playlist of all videos in this module with completion checkmarks (Red checkmark when done).
- Clicking any video in the list loads it in the player.

**Component: Notes Panel (below player)**
- A simple text area where students can jot notes while watching.
- `Save Notes` button. Notes are saved to Supabase.

---

### 16. Progress Tracker `/dashboard/progress`

**Component: Band Score Over Time Chart**
- Line chart with a Red line showing estimated band score per week over the past 90 days.
- Separate lines per module (different shades: solid red, dashed, etc).

**Component: Strengths & Weaknesses Card**
- A 2×2 grid: Top strengths (Green badge icons) and areas needing work (Red badge icons) based on AI evaluation history.

**Component: Practice Activity Heatmap**
- A GitHub-style contribution heatmap (calendar grid) showing practice intensity per day, with red shading where deeper red = more active.

---

### 17. My Profile `/dashboard/profile`

**Component: Profile Info Card**
- Avatar upload (click to change, Red border on avatar circle).
- Editable fields: Full Name, Email, Nationality, Target Band Score, Target Exam Date.
- `Save Changes` button (Red).

**Component: Notification Settings**
- Toggle switches (Red when ON) for: Email reminders, Daily practice nudge, Exam date countdown alerts.

**Component: Language Preference**
- Dropdown to select preferred native language for AI feedback translation.

**Component: Subscription Status**
- Shows current plan (Standard or Pro+), renewal date.
- `Upgrade Plan` button (Red) → `/pricing`.
- `Cancel Subscription` link (small, gray text).

**Component: Danger Zone**
- `Delete My Account` button (White button, Red border, Red text) with a confirmation modal.

---

### 18. Test Results Page `/results/[testId]`

**Component: Score Summary Header**
- Module name, date of test, overall band score in a large Red number.

**Component: Rubric Breakdown**
- 4 horizontal progress bars (Red fill) each showing the rubric score.
- Band score label next to each bar.

**Component: Full AI Feedback Text**
- Section-by-section detailed feedback generated by Claude.
- Highlighted problem phrases/sentences in the student's original response (highlighted in light red background).

**Component: Suggested Improvement Tips**
- Bullet list of 3-5 specific, actionable tips from Claude.

**Component: Actions Bar**
- `Listen to Report` (TTS audio) | `Download PDF` | `Retake This Task` | `Back to History`

---

## Global Component Specifications

### Modal (used for confirmations, warnings)
- White card, centered overlay with dark backdrop.
- H3 title (Black).
- Body text (Dark Gray).
- Two buttons: Cancel (ghost black) + Confirm (Red primary).

### Notification Toast
- Appears top-right.
- Success: Black background + White text + Red left border.
- Error: Red background + White text.
- Fades out after 4 seconds.

### Loading State
- Full page loader: Red spinning ring on white background with "Intellify" logo centered.
- Skeleton loaders on cards (gray pulsing shimmer).

### Empty State
- Centered illustration + message e.g., "No results yet. Start practicing to see your scores!" + Red CTA button.

---

## Navigation Flow Summary

| From | Action | To |
| :--- | :--- | :--- |
| Landing Page | Click "Get Started Free" | `/auth/signup` |
| Sign Up | Successful registration | `/dashboard` |
| Login | Successful login | `/dashboard` |
| Dashboard | Click "Practice Writing" | `/practice/writing/[latestPromptId]` |
| Writing Practice | Submit essay | AI Feedback Panel on same page |
| Writing Practice | Click "View Full Report" | `/results/[testId]` |
| Dashboard | Click "Watch Video" | `/learn/videos` |
| Dashboard | Click "Take Mock Exam" | `/mock-exam` |
| Mock Exam Hub | Click "Avatar Test" | `/mock-exam/avatar-test` |
| Any Page | Click Sidebar Profile | `/dashboard/profile` |
| Any Page | Click Sidebar Progress | `/dashboard/progress` |
| Pricing Page | Click "Get Started" | `/auth/signup?plan=standard` |
| Pricing Page | Click "Upgrade to Pro+" | `/auth/signup?plan=pro` |
