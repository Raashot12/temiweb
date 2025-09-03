# Neo-Pharmacy Management System

A modern, multi-tenant pharmacy management web application built with Next.js 14, TypeScript, and Mantine UI. This system provides comprehensive healthcare and pharmacy management capabilities with robust authentication, authorization, and multi-tenancy support.

## 🚀 Features

- **🔐 Authentication & Authorization**: Secure login, password reset, and user onboarding
- **🏥 Multi-tenant Architecture**: Support for multiple pharmacy/healthcare organizations
- **📱 Responsive Design**: Modern UI built with Mantine components
- **🔄 State Management**: Redux Toolkit with RTK Query for efficient data fetching
- **🧪 Testing**: Comprehensive test suite with Vitest
- **🐳 Docker Support**: Production-ready containerization
- **📊 Dashboard & Analytics**: Real-time insights and reporting
- **🛡️ Type Safety**: Full TypeScript implementation
- **🎨 Theming**: Customizable UI themes and components

## 🏗️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Library**: Mantine 7.x
- **State Management**: Redux Toolkit + RTK Query
- **Testing**: Vitest + React Testing Library
- **Styling**: CSS Modules + Mantine styling system
- **Icons**: Tabler Icons
- **Forms**: React Hook Form + Zod validation
- **Date Handling**: Moment.js
- **Notifications**: React Toastify + Mantine notifications

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (protected)/       # Protected routes (requires auth)
│   └── (unprotected)/     # Public routes (login, etc.)
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── layouts/              # Layout components
├── state/                # Redux store and slices
├── styles/               # Global styles and themes
├── theme/                # Mantine theme configuration
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+ 
- npm/yarn/pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PharmacyStandalone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .environment.example .env.local
   ```
   
   Update the environment variables:
   ```env
   NEXT_PUBLIC_DEV_TENANCY_NAME=your-tenant-name
   NEXT_PUBLIC_APP_API_SERVICE_BASE_URL=https://your-api-domain.com
   NEXT_PUBLIC_APP_HOST_URL=your-app-domain.com
   ```

4. **Generate API Types** (if needed)
   ```bash
   npm run api-generate
   ```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

## 🚀 Deployment

### Docker Deployment

Build and run with Docker:
```bash
docker build -t neo-pharmacy .
docker run -p 3000:3000 neo-pharmacy
```

### Production Build

Create an optimized production build:
```bash
npm run build
npm start
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run test` - Run tests
- `npm run format` - Format code with Prettier
- `npm run api-generate` - Generate API types from OpenAPI spec
- `npm run local-api-generate` - Generate API types from local spec

## 🔧 Configuration

### Multi-tenancy

The application supports multi-tenancy through hostname-based tenant detection. Configure your tenants in the environment variables and ensure proper DNS configuration.

### Theming

Customize the application theme by modifying files in the `src/theme/` directory. The application uses Mantine's theming system for consistent design.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.
