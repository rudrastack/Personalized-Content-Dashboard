# 🌟 PrismFlow — High-Performance SaaS Content Dashboard

A modern, high-precision content engineering dashboard developed with **React, Next.js (App Router), TypeScript, Redux Toolkit, and Tailwind CSS**. Designed in the aesthetic of high-tier developer SaaS platforms (such as **Linear, Vercel, and Stripe**), PrismFlow delivers an editorial, high-density stream of news, curated media recommendations, and community discussions.

---

## 🎨 Design Philosophy & Aesthetic Overhaul

- **Sophisticated Dark Canvas**: Built on a deep slate/charcoal background (`#090A0F`), matte elevated cards (`#0E1017`), and razor-sharp 1px structural borders (`#1E2230`).
- **Purposeful Color System**: Eliminated tacky floating gradients and garish neon accents. Uses a single, crisp **Electric Blue (`#3B82F6`)** accent exclusively for active navigation states, primary triggers, and focal points.
- **Editorial Typography**: Inter / system font scale with tightened tracking (`tracking-tight`), crisp monospace tabular numerals (`font-mono tabular-nums`), and clean text contrast (`#F1F5F9` foreground, `#71717A` secondary).
- **Subtle Surface Micro-Interactions**: Hover border highlights (`#2C3246`), soft matte button surfaces, and clean bookmark toggles without visual noise.

---

## 🚀 Key Features

### 1. Personalized Content Stream
- **Configurable Interests**: Customize subscribed topics (*Technology & AI, Finance & Macro, Media & Cinema, Sports Science, Health & Bio, Deep Science*) via the [PreferencesModal](file:///c:/Users/Smart-Computer/Downloads/Cohort%202.0/Personalized%20Content%20Dashboard/src/components/preferences/PreferencesModal.tsx).
- **LocalStorage & Redux State**: Category preferences, layout mode, theme mode, and bookmarked favorites persist seamlessly across page reloads and browser sessions.
- **Multi-Source Unified Ingestion**: Aggregates news wire articles, curated recommendations, and community discussions with rich high-resolution imagery and metadata.
- **Editorial Cards ([ContentCard.tsx](file:///c:/Users/Smart-Computer/Downloads/Cohort%202.0/Personalized%20Content%20Dashboard/src/components/feed/ContentCard.tsx))**:
  - Subtle monospace category chips and format tags (*News Wire, Curated Picks, Discussions*).
  - Minimalist **Favorite / Bookmark Toggle** with smooth active states.
  - **"Read Article" Modal ([CardModal.tsx](file:///c:/Users/Smart-Computer/Downloads/Cohort%202.0/Personalized%20Content%20Dashboard/src/components/feed/CardModal.tsx))** with full article text, tags, author bio, read times, and share actions.
  - External link button directly to source.
- **Drag-and-Drop Reordering ([ContentGrid.tsx](file:///c:/Users/Smart-Computer/Downloads/Cohort%202.0/Personalized%20Content%20Dashboard/src/components/feed/ContentGrid.tsx))**: Fluid, physics-based card reordering powered by **Framer Motion** (`Reorder.Group` & `Reorder.Item`).
- **Flexible Layouts**: Instant switching between an expansive **3-Column Grid** and a **Compact List View**.

### 2. Navigation Rail & Command Header
- **Navigation Rail ([Sidebar.tsx](file:///c:/Users/Smart-Computer/Downloads/Cohort%202.0/Personalized%20Content%20Dashboard/src/components/layout/Sidebar.tsx))**:
  - Linear-inspired layout featuring workspace branding, grouped sections (`DISCOVER` & `WORKSPACE`), and subtle active indicators.
  - Monospace numeric count badges for Favorites and Trending items.
  - Collapsible desktop rail mode (56px) and mobile drawer with backdrop blur.
  - Minimalist live system status indicator.
- **Command Header ([Header.tsx](file:///c:/Users/Smart-Computer/Downloads/Cohort%202.0/Personalized%20Content%20Dashboard/src/components/layout/Header.tsx))**:
  - **Debounced Search Bar** (300ms) with keyword matching across titles, descriptions, authors, sources, and tags, with an instant clear (`X`) button and keyboard shortcut indicator (`/`).
  - **Dark / Light Theme Switcher** with smooth CSS class transitions and persistent storage.
  - **Simulated Real-Time Live Feed Toggle** with an active pulse indicator.
  - Activity alerts dropdown and user profile avatar.

### 3. Dedicated Modules
- **Trending Velocity ([TrendingSection.tsx](file:///c:/Users/Smart-Computer/Downloads/Cohort%202.0/Personalized%20Content%20Dashboard/src/components/trending/TrendingSection.tsx))**: High-density leaderboard featuring two-digit index counters (`01`, `02`, ...), velocity progress bars, and engagement metrics.
- **Saved Bookmarks ([FavoritesSection.tsx](file:///c:/Users/Smart-Computer/Downloads/Cohort%202.0/Personalized%20Content%20Dashboard/src/components/favorites/FavoritesSection.tsx))**: Clean reference library with single-click bookmark removal, a "Clear Collection" action, and empty state prompts.
- **Telemetry & Stats ([AnalyticsSection.tsx](file:///c:/Users/Smart-Computer/Downloads/Cohort%202.0/Personalized%20Content%20Dashboard/src/components/analytics/AnalyticsSection.tsx))**: Metric cards showing total records ingested, bookmark metrics, aggregated likes/shares, and a category distribution bar chart.

### 4. Robust State & Error Architecture
- **Redux Toolkit**:
  - [`contentSlice.ts`](file:///c:/Users/Smart-Computer/Downloads/Cohort%202.0/Personalized%20Content%20Dashboard/src/redux/slices/contentSlice.ts): Ingested stream, debounced search, category/format filtering, favorites, and drag-and-drop reordering.
  - [`preferencesSlice.ts`](file:///c:/Users/Smart-Computer/Downloads/Cohort%202.0/Personalized%20Content%20Dashboard/src/redux/slices/preferencesSlice.ts): User preferences, subscribed categories, layout mode, and modal states.
  - [`themeSlice.ts`](file:///c:/Users/Smart-Computer/Downloads/Cohort%202.0/Personalized%20Content%20Dashboard/src/redux/slices/themeSlice.ts): Light and Dark mode toggling.
- **UI Feedback Components**:
  - [`LoadingSkeleton.tsx`](file:///c:/Users/Smart-Computer/Downloads/Cohort%202.0/Personalized%20Content%20Dashboard/src/components/ui/LoadingSkeleton.tsx): Subtle dark pulse skeletons.
  - [`ErrorState.tsx`](file:///c:/Users/Smart-Computer/Downloads/Cohort%202.0/Personalized%20Content%20Dashboard/src/components/ui/ErrorState.tsx): Rose-accented error cards with retry actions.
  - [`EmptyState.tsx`](file:///c:/Users/Smart-Computer/Downloads/Cohort%202.0/Personalized%20Content%20Dashboard/src/components/ui/EmptyState.tsx): Minimalist dashed empty states for unmatched queries.

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | UI component architecture and state hooks |
| **Next.js 14 (App Router)** | Static rendering, routing, and fast production bundling |
| **TypeScript** | Strict type safety for data models, actions, and component props |
| **Redux Toolkit & React-Redux** | Global state orchestration, async thunks, and persistent hydration |
| **Tailwind CSS** | Custom design tokens, class-based dark mode, and responsive layout |
| **Framer Motion** | Physics-based drag-and-drop reordering and UI animations |
| **Lucide React** | Consistent, clean vector iconography |

---

## 💻 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ or v22+ recommended)
- **npm** or **yarn** / **pnpm**

### Installation & Run

1. Navigate to the project directory:
   ```bash
   cd "Personalized Content Dashboard"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build and run production bundle:
   ```bash
   npm run build
   npm start
   ```

5. Run Automated Unit Tests:
   ```bash
   node scripts/test-runner.js
   ```
