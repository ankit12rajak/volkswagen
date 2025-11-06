# Nuralytics - Premium AI-Powered Automotive Intelligence

A hyper-premium AI-driven automotive intelligence platform delivering real-time insights, sentiment analysis, and predictive maintenance solutions.

## Features

- **Real-time Vehicle Monitoring**: Track and monitor vehicle performance with advanced analytics
- **AI-Powered Analytics**: Intelligent data analysis and insights generation
- **Admin Dashboard**: Comprehensive management interface for system administration
- **Support Dashboard**: Advanced support ticket and analytics management
- **User Management**: Secure user authentication and role-based access control
- **Predictive Maintenance**: AI-powered predictive maintenance recommendations

## Technology Stack

This project is built with:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Component Library**: shadcn-ui with Radix UI
- **Styling**: Tailwind CSS with PostCSS
- **Data Visualization**: Recharts
- **Form Management**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **HTTP Client**: TanStack React Query
- **Animation**: Framer Motion & GSAP
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun package manager

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd volkswagenfrontend

# Install dependencies
npm install
# or
bun install
```

### Development

To start the development server with auto-reloading:

```sh
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:8080`

### Building for Production

To create an optimized production build:

```sh
npm run build
# or
bun build
```

To preview the production build locally:

```sh
npm run preview
# or
bun preview
```

## Project Structure

```
src/
├── components/        # Reusable React components
│   ├── dashboard/    # Dashboard-specific components
│   └── ui/           # Shadcn-ui component library
├── pages/            # Page components for different routes
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and helpers
├── assets/           # Static assets
├── App.tsx           # Main app component
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run build:dev` - Create development build
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Code Quality

This project uses ESLint for code linting to maintain consistent code quality and best practices.

```sh
npm run lint
```

## Contributing

Please ensure all code follows the project's linting standards before submitting contributions.

## License

© 2024 Nuralytics. All rights reserved.
