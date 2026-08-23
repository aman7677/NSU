# NSU1st

## Project Overview

NSU is a React-based marketing and product showcase website for a colour and pigment solutions business. The application presents the company’s story, product categories, application-focused colour solutions, and a contact workflow for customer enquiries.

The site is built as a single-page application with multi-page routing using React Router. It uses a strong brand aesthetic—dark backgrounds, vibrant gradients, motion-driven visuals, and product-focused storytelling—to present NSU’s colour products and industrial application range.

## Features

- Animated landing page with immersive hero section and background particle effects
- Product showcase with category-driven highlights and product cards
- Product catalogue page with filter buttons and a detailed product modal
- Application-focused section describing six use-case categories for colour solutions
- Company story and brand narrative page
- Contact page with validated enquiry form and direct EmailJS submission flow
- Responsive navigation for desktop and mobile layouts
- Scroll-triggered motion and reduced-motion accessibility support
- Dynamic page metadata updates through a reusable SEO component

## Tech Stack

| Category      | Technology                                     |
| ------------- | ---------------------------------------------- |
| Frontend      | React 19.2.8                                   |
| Build tool    | Vite 8.2.0                                     |
| Language      | JavaScript (JSX)                               |
| Styling       | Tailwind CSS 4.3.3 with custom theme variables |
| Routing       | react-router-dom 7.18.2                        |
| Motion        | framer-motion 13.0.0                           |
| Icons         | lucide-react 1.30.0                            |
| Fonts         | @fontsource/space-grotesk                      |
| Form delivery | @emailjs/browser 4.4.1                         |
| Linting       | ESLint 10.8.0                                  |

The project does not currently use TypeScript, Redux, Zustand, or a dedicated backend framework.

## Project Structure

```text
nsu/
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public/
│   ├── bright-color.png
│   ├── custom-color.png
│   ├── favicon.svg
│   ├── fluorescent-pigments-powder.png
│   ├── icons.svg
│   ├── nsu-logo.mp4
│   └── sindoor.png
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── assets/
│   ├── components/
│   │   ├── ApplicationFeature.jsx
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── ColourParticles.jsx
│   │   ├── Container.jsx
│   │   ├── CountUp.jsx
│   │   ├── EnquiryForm.jsx
│   │   ├── ImageReveal.jsx
│   │   ├── NSULogo.jsx
│   │   ├── PageIntro.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductCatalogueCard.jsx
│   │   ├── ProductDetailModal.jsx
│   │   ├── SectionTitle.jsx
│   │   ├── Seo.jsx
│   │   └── SiteLayout.jsx
│   ├── data/
│   │   ├── applications.js
│   │   ├── company.js
│   │   ├── products.js
│   │   └── siteData.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Applications.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   └── Products.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   └── ProductShowcase.jsx
│   └── utils/
│       └── motion.js
├── vite.config.js
├── README.md
└── node_modules/   (generated after install)
```

### Important folders and files

- `public/`: static brand visuals and image assets that are served directly by Vite.
- `src/components/`: reusable UI building blocks such as navigation, buttons, product cards, and forms.
- `src/pages/`: top-level route pages for Home, Products, Applications, About, Contact, and the 404 page.
- `src/sections/`: page-level sections used by the home page, such as the hero and product showcase.
- `src/data/`: static product, company, and application content used to populate the site.
- `src/utils/`: small shared animation configuration constants.
- `src/index.css`: the primary styling source, including Tailwind setup and custom theme tokens.
- `vite.config.js`: Vite config with React and Tailwind plugins.
- `.env.example`: example environment variable file for EmailJS configuration.

## Installation & Setup

This project does not declare a strict Node.js version in the repo. It is a modern React 19 + Vite 8 application, so a current LTS Node environment is recommended.

1. Clone the repository.
2. Navigate into the project directory.
3. Install dependencies:

```bash
npm install
```

4. If you want the contact form to send emails, create a local `.env` file from `.env.example` and fill in the EmailJS values.
5. Start the development server:

```bash
npm run dev
```

The app will typically run on the Vite default URL:

```text
http://localhost:5173
```

## Available Scripts

The scripts defined in `package.json` are:

| Script             | Command           | Purpose                                               |
| ------------------ | ----------------- | ----------------------------------------------------- |
| Development server | `npm run dev`     | Starts the Vite dev server for local development      |
| Production build   | `npm run build`   | Creates the production build in the `dist/` directory |
| Linting            | `npm run lint`    | Runs ESLint across the project                        |
| Preview            | `npm run preview` | Serves the production build locally                   |

## Environment Variables

The project includes a `.env.example` file with the following variables:

```env
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

These values are used in `src/components/EnquiryForm.jsx` to initialize EmailJS for the enquiry form. The relevant configuration is:

```js
const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};
```

If these variables are not set, the form does not submit and instead shows a user-friendly message indicating that enquiries are temporarily unavailable.

There is no evidence in the repository of additional environment variables for API keys, database credentials, or hosting configuration.

## Application Architecture

The app is structured around a small set of clear layers:

- `src/main.jsx` sets up the React root, wraps the app in `BrowserRouter`, and applies `MotionConfig` to provide motion defaults.
- `src/App.jsx` defines the route structure and wraps pages with the site-wide layout.
- `src/components/SiteLayout.jsx` provides the shared header, mobile menu, main content area, and footer.
- `src/data/*.js` holds the static site content used for products, company information, and application descriptions.
- `src/pages/*.jsx` contains page-level components for each route.
- `src/sections/*.jsx` contains reusable landing-page sections, especially for the home page.
- `src/components/EnquiryForm.jsx` handles validation and EmailJS submission logic.
- `src/components/ColourParticles.jsx` renders a canvas-based animated particle background.

The project does not implement a global state management library such as Redux, Context API for app-wide stores, or a custom hook-based state layer. State is handled locally with React hooks (`useState`, `useMemo`, `useEffect`, etc.) within the relevant components.

## Important Components

- `SiteLayout.jsx`: global layout and navigation shell with mobile menu, sticky header, and footer.
- `Hero.jsx`: animated homepage hero section with brand messaging and CTA button.
- `ProductShowcase.jsx`: featured product section displayed on the home page.
- `ProductCatalogueCard.jsx`: reusable product card used in the product listing page.
- `ProductDetailModal.jsx`: modal dialog showing detailed product information and color context.
- `EnquiryForm.jsx`: validated contact form that submits to EmailJS.
- `ColourParticles.jsx`: animated particle canvas used as background visual treatment.
- `PageIntro.jsx`: shared section header pattern used across internal pages.
- `SectionTitle.jsx`: standard heading and description component for page sections.
- `CountUp.jsx`: animated number counter used in the applications page.
- `Seo.jsx`: updates the document title and meta description with route-specific values.
- `NSULogo.jsx`: brand logo/video-based branding element used in the header and footer.

## Pages / Routes

The app routes are defined in `src/App.jsx`:

| Route           | Component      | Purpose                                                              |
| --------------- | -------------- | -------------------------------------------------------------------- |
| `/`             | `Home`         | Displays the landing page with hero content and featured products    |
| `/products`     | `Products`     | Displays the product catalogue with filters and product detail modal |
| `/applications` | `Applications` | Highlights the application areas where NSU colour systems are used   |
| `/about`        | `About`        | Presents the business story and brand history                        |
| `/contact`      | `Contact`      | Shows contact information and the enquiry form                       |
| `*`             | `NotFound`     | Fallback page for unknown routes                                     |

## API / Backend Integration

This project does not contain a dedicated backend or custom API service layer. The only external integration found is EmailJS, used for the contact form.

### EmailJS integration

- File: `src/components/EnquiryForm.jsx`
- Purpose: sends customer enquiries from the contact form
- Trigger: form submission event
- Method: `emailjs.send(...)`
- Variables used:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`

No other API endpoints or backend integrations were identified in the codebase.

## Styling

The project uses Tailwind CSS v4 with a custom theme layer in `src/index.css`.

### Styling setup

- Tailwind is enabled through `@tailwindcss/vite` in `vite.config.js`
- The global theme is defined with `@theme` in `src/index.css`
- Custom colors include brand shades such as:
  - `pigment-red`
  - `pigment-magenta`
  - `pigment-orange`
  - `pigment-yellow`
  - `pigment-pink`
- The app uses utility classes extensively throughout the JSX files
- Global base styles define smooth scrolling, root sizing, and focus outlines

`src/App.css` exists in the project but is not imported by `src/main.jsx`. The primary styling pipeline is driven by `src/index.css`.

## Responsive Design

Responsive behavior is implemented through Tailwind utility classes and layout adjustments across breakpoints.

Examples visible in the project:

- Mobile navigation menu with a hamburger toggle
- Grid layouts that change from single-column to multi-column at larger breakpoints
- Container widths constrained by `max-w-[1440px]`
- Adaptive typography with large headline scales for desktop and smaller sizes for mobile
- Layout spacing adjustments for tablets and lower widths

The application is designed to work across desktop, tablet, and mobile viewports without a separate mobile app layer.

## Build & Production

To create a production build, run:

```bash
npm run build
```

This generates a `dist/` directory with the optimized production files.

To preview the built app locally, run:

```bash
npm run preview
```

`vite.config.js` is the main build configuration and includes the React and Tailwind plugins.

## Deployment

There is no deployment configuration or hosting manifest in the repository, so no project-specific deployment platform is declared.

For a standard Vite React deployment, the typical flow is:

1. Run `npm run build`
2. Upload the contents of the `dist/` folder to a static host such as Netlify, Vercel, GitHub Pages, or another compatible platform
3. If using the contact form, configure the same EmailJS environment variables in the hosting provider

## Troubleshooting

### `vite is not recognized`

Run:

```bash
npm install
```

If the command still fails, ensure you are using a valid Node.js and npm installation.

### Missing `node_modules`

Install dependencies again:

```bash
npm install
```

### Contact form not sending emails

Create a `.env` file from `.env.example` and add the EmailJS values:

```bash
cp .env.example .env
```

Then populate the required variables with your EmailJS project credentials.

### Build errors

Remove any stale build output and rebuild:

```bash
rm -rf dist
npm run build
```

On Windows PowerShell, use:

```powershell
Remove-Item -Recurse -Force dist
npm run build
```

### Blank page or route issues

Check the browser console and confirm that the app is served through the Vite dev server. The project uses client-side routing and requires the app to run in a browser environment.

## Development Guidelines

The codebase follows a straightforward structure that is easy to extend:

- Reusable UI belongs in `src/components/`
- Page-level composition belongs in `src/pages/`
- Page sections live under `src/sections/`
- Static site content belongs in `src/data/`
- Motion-related shared configuration lives in `src/utils/motion.js`
- Styling is centralized in `src/index.css`, with Tailwind utility classes used throughout components

The project favors declarative, data-driven content and component reuse rather than a large state management layer. New pages or sections can be added by following the same pattern used by the existing pages and data files.

## Future Improvements

The following are realistic future improvements based on the current project and should be considered suggestions rather than existing features:

- Add a dedicated backend or API for contact form storage and processing
- Add a CMS or content management layer for product and company content
- Add automated tests for route rendering and form validation
- Add internationalization or multilingual support
- Expand product data with real imagery, specifications, and downloadable technical documentation
- Add analytics and conversion tracking for marketing pages

## License

No license has been specified for this project.

## Author / Credits

No explicit author or credits section was found in the repository metadata or source files.
