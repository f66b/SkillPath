# 🌿 SkillPath Landing Page (React)

A modern, responsive landing page for SkillPath built with React.js, Vite, and Tailwind CSS. Features a clean white and light green aesthetic with glassmorphism effects and smooth animations.

## ✨ Features

- ⚛️ **React 18** with functional components and hooks
- ⚡ **Vite** for fast development and building
- 🎨 **Tailwind CSS** for modern styling
- 📱 **Fully Responsive** design for all devices
- 🎭 **Glassmorphism Effects** and smooth animations
- 🧭 **Smooth Scrolling Navigation** between sections
- 📂 **Component-Based Architecture** for maintainability

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Navigate to the LandingPage directory:**
   ```bash
   cd LandingPage
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add images** (see Image Placement section below)

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Visit `http://localhost:3000` to view the landing page

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
LandingPage/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx      # Fixed navigation with mobile menu
│   │   ├── Hero.jsx           # Hero section with CTA
│   │   ├── AIAssistant.jsx    # AI assistant features section
│   │   ├── InteractiveCourses.jsx # Course dashboard section
│   │   ├── Certification.jsx  # Certificate features section
│   │   ├── ComingSoon.jsx     # Coming soon section
│   │   └── Footer.jsx         # Footer with links
│   ├── App.jsx                # Main app component
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles and Tailwind
├── images/                   # Place your images here
├── index.html               # HTML template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🖼️ Image Placement Instructions

Place all images in the `images/` folder with these exact filenames:

### 1. **Hero Section**
- **Filename:** `hero-learning.png`
- **Description:** AI-guided learning dashboard, people learning with technology
- **Recommended size:** 1200x800px or larger

### 2. **AI Assistant Section**
- **Filename:** `ai-assistant.png`
- **Description:** AI chatbot interface, virtual assistant, or person getting AI help
- **Recommended size:** 800x600px or larger

### 3. **Interactive Courses Section**
- **Filename:** `course-dashboard.png`
- **Description:** Course progress dashboard, interactive learning modules
- **Recommended size:** 1000x600px or larger

### 4. **Certification Section**
- **Filename:** `certificate-tablet.png`
- **Description:** Digital certificate on tablet/device, graduation achievement
- **Recommended size:** 800x600px or larger

### 5. **Coming Soon Section**
- **Filename:** `learning-journey-map.png`
- **Description:** Learning path visualization, roadmap (used as background)
- **Recommended size:** 1400x800px or larger

## 🎨 Design System

### Colors
- **Mint Green:** `#A7F3D0`
- **Emerald:** `#34D399`
- **White:** `#FFFFFF`
- **Cool Gray:** `#F3F4F6`
- **Slate Text:** `#64748B`

### Typography
- **Headings:** Manrope (Google Fonts)
- **Body:** Inter (Google Fonts)

### Components
- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons
- `.glassmorphism` - Glass effect elements
- `.soft-shadow` - Subtle shadow effects

## 🧰 Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **ESLint** - Code linting

## 📱 Responsive Design

The landing page is fully responsive with breakpoints:
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Component Structure

Each section is a separate React component:
- Functional components with hooks
- Props for data and configuration
- Responsive design with Tailwind
- Smooth animations and interactions

## 📄 License

This project is part of the SkillPath platform. 