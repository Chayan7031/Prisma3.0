# PRISMA 3.0 📖

> **The Annual Departmental Magazine for Computer Science & Engineering**
> 
> *Kalyani Government Engineering College (KGEC)*

PRISMA 3.0 is a next-generation web experience designed to showcase the creative expressions, faculty insights, technical horizons, and departmental achievements of the CSE department. Rather than a standard static PDF viewer, this project implements a highly interactive, 3D physics-based digital flipbook that brings the physical reading experience to the web.

## ✨ Key Features

- **Interactive 3D Flipbook**: Realistic page-turning physics utilizing `page-flip` and HTML5 canvas.
- **Cross-Platform Responsive**: Seamlessly adapts from a dual-page spread on desktop to a single-page portrait view on mobile.
- **Unified Navigation**: Navigate the magazine via intuitive edge-tapping, swipe gestures, mouse-dragging, keyboard arrows, or the dedicated toolbar.
- **Immersive Aesthetic**: Designed with an ambient, premium UI featuring custom floating animations, dynamic background glows, and toggleable Charcoal/Parchment themes.
- **Performant**: Built on Next.js 15 (App Router) and React, optimizing heavy assets and canvas elements for smooth interactions.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: TypeScript
- **Interactive Engine**: [page-flip](https://nodlik.github.io/StPageFlip/)

## 🚀 Quick Start (Local Development)

To run this project locally, ensure you have Node.js installed, then follow these steps:

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repo-url>
   cd prisma3.0
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **View the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `/app` - Next.js App Router configuration and main pages (`page.tsx`).
- `/components` - Reusable UI components (Hero Section, 3D Book logic).
- `/public` - Static assets, including the high-resolution magazine pages and downloadable PDF.

---
*Built with ❤️ by the CSE Students' Magazine Committee.*
