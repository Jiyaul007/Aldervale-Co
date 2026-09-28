# Aldervale & Co. — Intelligence for Modern Wealth

> A next-generation Wealth Intelligence Platform website — built with pure HTML, CSS, and JavaScript. No frameworks. No dependencies. Just clean, premium code.

![Aldervale Banner](https://img.shields.io/badge/Aldervale%20%26%20Co.-Wealth%20Intelligence-C9A84C?style=for-the-badge&labelColor=050816)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🌐 Live Demo

[View Live Site →](https://yourusername.github.io/aldervale)

---

## ✨ Features

- **Cinematic Hero Section** — Canvas-based particle network with 72 animated gold/platinum particles and connecting lines
- **Floating Dashboard Mockup** — Animated SVG portfolio chart with live draw-on animation and floating AI insight cards
- **Interactive Charts** — Canvas-rendered area chart, bar chart, line projection chart, and donut allocation chart
- **AI Insights Interface** — Sophisticated AI recommendation panel with confidence bars
- **Pricing Toggle** — Smooth monthly ↔ yearly price switching
- **Scroll Reveal Animations** — IntersectionObserver-powered staggered section reveals
- **Sticky Glassmorphism Navbar** — Frosted glass effect on scroll with smooth transitions
- **Animated Counters** — Hero stats count up on viewport entry
- **Mobile Responsive** — Fully responsive across all screen sizes with hamburger menu
- **Zero Dependencies** — Pure HTML/CSS/JS, only Google Fonts loaded externally

---

## 📁 Project Structure

```
aldervale/
├── index.html      # Main HTML structure & all sections
├── style.css       # Complete design system & component styles
├── script.js       # Particle engine, charts, animations, interactions
└── README.md       # You are here
```

---

## 🎨 Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#050816` | Deep Midnight Black — page background |
| `--bg-s` | `#080B1A` | Obsidian — section alternates |
| `--bg-e` | `#0F1424` | Graphite — elevated surfaces |
| `--gold` | `#C9A84C` | Antique Gold — primary accent |
| `--gold-l` | `#E3C36E` | Champagne Gold — highlights |
| `--em` | `#10B981` | Emerald Green — positive/growth |
| `--sap` | `#3B7DD8` | Sapphire Blue — data & info |
| `--t1` | `#F1F5F9` | Primary text |
| `--t2` | `#8A93A8` | Secondary text |
| `--t3` | `#525D78` | Tertiary / muted text |

### Typography

| Font | Usage |
|------|-------|
| **Playfair Display** | Headlines, quotes, brand name — luxury serif |
| **Space Grotesk** | Data, metrics, labels, UI elements |
| **Inter** | Body copy, paragraphs |

---

## 🗂️ Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Navigation** | Sticky glassmorphism navbar with mobile menu |
| 2 | **Hero** | Cinematic full-viewport with particle canvas + dashboard |
| 3 | **Logos** | Trusted by leading institutions |
| 4 | **Features** | 8-card bento grid of platform capabilities |
| 5 | **Dashboard Showcase** | macOS-style product window with live charts |
| 6 | **AI Insights** | Intelligence engine interface with recommendations |
| 7 | **Analytics Center** | Bar chart, line projection, KPI metrics |
| 8 | **Testimonials** | Client success stories — editorial layout |
| 9 | **Security** | Compliance badges + security features |
| 10 | **Pricing** | 3-tier cards with monthly/yearly toggle |
| 11 | **CTA** | Full-width call to action |
| 12 | **Footer** | 5-column luxury footer |

---

## 🚀 Getting Started

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/aldervale.git
   cd aldervale
   ```

2. **Open in browser** *(two options)*

   **Option A — Direct open:**
   ```bash
   open index.html         # macOS
   start index.html        # Windows
   xdg-open index.html     # Linux
   ```

   **Option B — VS Code Live Server:**
   - Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
   - Right-click `index.html` → **Open with Live Server**

---

## 🌍 Deploy to GitHub Pages

1. Push your code to GitHub
   ```bash
   git init
   git add .
   git commit -m "🚀 Initial commit — Aldervale & Co. website"
   git remote add origin https://github.com/yourusername/aldervale.git
   git push -u origin main
   ```

2. Go to your repo on GitHub

3. **Settings** → **Pages** → Source: `Deploy from branch` → Branch: `main` → `/ (root)`

4. Click **Save** — your site will be live at:
   ```
   https://yourusername.github.io/aldervale
   ```

---

## ⚙️ Customization

### Change Brand Name
Search and replace `Aldervale & Co.` in `index.html`

### Update Colors
Edit the CSS variables at the top of `style.css`:
```css
:root {
  --gold:   #C9A84C;   /* Change accent color */
  --bg:     #050816;   /* Change background */
}
```

### Update Pricing
In `index.html`, find `.pr-num` elements and update `data-m` (monthly) and `data-y` (yearly) attributes:
```html
<span class="pr-num" data-m="49" data-y="39">49</span>
```

### Update Chart Data
In `script.js`, find the chart functions and update the data arrays:
```js
const rev = [58, 62, 55, 70, 68, 75, 72, 81, 78, 88, 84, 96]; // Revenue data
const exp = [38, 41, 36, 44, 42, 48, 45, 52, 49, 55, 51, 60]; // Expense data
```

### Adjust Particle Count
In `script.js`:
```js
for(let i = 0; i < 72; i++) pts.push(new P()); // Change 72 to any number
```

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile (iOS/Android) | ✅ Responsive |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**JIYAUL**
- GitHub: [@yourusername](https://github.com/yourusername)

---

<p align="center">
  <sub>Built with ❤️ using pure HTML, CSS & JavaScript</sub><br>
  <sub>⭐ Star this repo if you found it useful!</sub>
</p>
