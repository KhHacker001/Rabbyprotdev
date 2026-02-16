
# KH Rabby Hossein Portfolio Architecture

## 1. Folder Structure Overview
The project follows a modular, feature-based architecture to ensure scalability and maintainability.

- `src/`: Root directory (conceptually, all files below are in the root as per instructions).
- `components/`: Pure UI components (Atoms/Molecules).
  - `ui/`: Reusable, atomic components (Buttons, Inputs, Cards).
  - `shared/`: Composite components used across different sections (Navbar, Footer, GlassContainer).
- `sections/`: Main landing page building blocks.
  - `Hero`, `About`, `Skills`, `Projects`, `Services`, `Contact`, `Stats`.
- `admin/`: Admin-specific logic and UI.
  - `Dashboard`: Analytics visualization.
  - `Login`: Secure authentication view.
- `services/`: External API integrations and utility services.
  - `analyticsService.ts`: Captures and processes visitor data.
  - `geminiService.ts`: Optional AI-powered bio/chat features.
- `hooks/`: Custom React hooks (e.g., `useAnalytics`, `useIntersectionObserver`).
- `data/`: Static data sources (JSON).
- `types/`: Global TypeScript interfaces and enums.
- `utils/`: Helper functions (Hashing, Date formatting, String manipulation).

## 2. Component Architecture
We use a "Container-Presenter" pattern where appropriate, but lean towards functional components with hooks for simplicity.
- **Section-Based Layout**: The main page is composed of distinct section components wrapped in a `Layout` container.
- **Motion Wrapper**: Custom higher-order components or wrapper components to inject Framer Motion logic consistently.

## 3. Pages & Routing
- **Landing Page (`#/`)**: One-page scrolling experience for the portfolio.
- **Admin Panel (`#/admin`)**: Secure dashboard accessible via hash-routing.

## 4. State Management
- **Local State**: `useState` and `useReducer` for UI toggles and form handling.
- **Persistent State**: `localStorage` to mock the persistence of visitor logs for the admin panel in this demonstration context.

## 5. Security (Admin)
- **Hashed Authentication**: Password comparison happens against a pre-defined hash (`Rabby121`).
- **Protected Routes**: Conditional rendering checks for `isAdmin` state.

## 6. SEO Structure
- Semantic HTML (main, section, article tags).
- Meta tags and structured data hints.
- Alt text for images.

## 7. Animation Strategy (Framer Motion)
- **Staggered Children**: For list-based items like Skills and Projects.
- **Scroll Reveal**: Using `whileInView` for sections.
- **Hover Micro-interactions**: For buttons and cards.
