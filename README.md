# Synchrnonize Ecommerce

Synchronize project is a merchandise ecommerce where will be the base for selling fashion, jellewry products for Synchronize Recording Studio.

The demo version is currently using the `https://fakestoreapi.com/` for placing the products in needed places with tech-stack for front-end included: TypeScript, React, React Router, Framer Motion, and tailwind.

Checkout the demo deployment via `https://synchronize-ecommerce-fcsi-jw0lzgav2.vercel.app/`

## Table of Contents

- Introduction
- Table of Contents
- Getting Started

  - Prerequisites
  - Installation
  - Setting up the Environment

- Usage
- Features
- Architecture & Design

  - Folder Structure
  - Data Flow
  - Component Structure

- Testing
- Deployment
- Contributing
- License

## Getting Started

### Prerequisites

- ypeScript: `^4.9.5`
- React: `^18.2.0`
- Node Js: v18.14.2
- Git
- Package Manager: Either npm or Yarn

  - npm version: 8.4.1 or higher
  - Yarn version: 1.22.10 or higher

### Installation

- Git command: Git clone https://github.com/tripplen23/fs17-Frontend-project.git
- Navigate to the project directory: cd fs17-Frontend-project.
- Install the project dependencies: npm i or yarn.

## Usage

### Scripts

- Start the development server: npm start or yarn start
- Build the production-ready bundle: npm run build or yarn build
- Run the tests: npm test or yarn test

### Features

- User authentication. (Optimize for Google login needed)

  ![login-img](![alt text](image.png))

- Categories, sort product by price, product detail.

  ![product-listing](![alt text](image-1.png))
  ![product-detail](![alt text](image-2.png))

- Shopping cart

  ![shopping-cart](![alt text](image-3.png))
  ![shopping-cart](![alt text](image-4.png))

- Admin dashboard

  ![admin](![alt text](image-5.png))

### Architecture & Design

#### Folder Structure

```sh
└── /src
    ├── App.tsx                          // Main component for rendering the application.
    ├── index.css                        // CSS file for global styles.
    ├── index.tsx                        // Entry point of the application.
    ├── react-app-env.d.ts               // Declaration file for TypeScript.
    ├── reportWebVitals.ts               // File for reporting web vitals.
    ├── setupTests.ts                    // Setup file for configuring testing environment.
    ├── tailwind.config.js               // Configuring tailwind styling.
    ├── asset                            // For static images and fonts.
    ├── components                       // Directory for components.
    |   ├── layouts                      // Directory for rendering the layout of the whole website.
    |   |    ├── Footer                  // Directory for the footer of the website.
    |   |    ├── Header                  // Directory for the header of the website included header and cartIcon components.
    |   |    ├── index.tsx               // Component for displaying the whole layout of website.
    |   ├── reusable                     // Directory for reusable components.
    |   |    ├── ButtonComponent         // Directory for reusable button.
    |   |    ├── CustomNavComponents     // Directory for custom NavLink/button for header.
    |   |    ├── GoToTopComponent        // Directory for go to top button component.
    |   |    ├── IconComponent           // Directory for complicated svg icons.
    |   |    ├── LogoComponent           // Directory for custom logo.
    |   |    ├── ModalComponent          // Directory for custom modal for shopping cart or CRUD products.
    |   |    ├── Notification            // Directory for custom notification - still in progress.
    |   |    ├── ProductCardComponent    // Directory for single product card component
    |   |    ├── SpinnerComponent        // Directory for loading icon effect.
    |   |    └── TransitionEffect        // Directory transition effect when changing route/page.
    ├── constants                        // Directory for constant route and status.
    |   ├── Route.ts                     // Constants for using routes of the project.
    |   └── Status.ts                    // Constants for status when working with redux.
    ├── data                             // Directory for mock data cateGory data and images for homepage data.
    ├── hooks                            // Custom hooks for managing state and logic.
    │   └── useThemeSwitcher.ts          // Custom hook for setting up dark mode theme switcher.
    ├── misc                             // Directory for declaring types of data in project.
    ├── pages                            // Components representing different pages of the application.
    │   ├── AdminDashboard               // Directory for admin dashboard page component.
    │   ├── Cart                         // Directory for cart page component and modal cart component.
    │   ├── Catalog                      // Directory for catalog page.
    │   ├── Home                         // Directory for homepage component.
    │   ├── Login                        // Directory for login component.
    │   └── Product                      // Directory for single product details component.
    ├── redux                            // Redux-related files for state management.
    |   ├── features                     // Redux slice files for managing specific parts of the state.
    |   |    ├── auth                    // Redux slice, service and test for managing authentication state.
    |   |    ├── cart                    // Redux slice, service and test for managing the cart state.
    |   |    └── product                 // Redux slice, service and test for managing the product state.
    │   └── utils                        // Directory for Redux store configurations.
    |   |    ├── axiosConfig.ts          // Config the axios with the used API
    |   |    ├── hook.ts                 // Hook of store like useAppDispatch, useAppSelector
    |   |    └── store.ts                // Redux store.
    ├── requests                         // Directory for manual testing with API.
    ├── routes                           // Directory for creating browser router for the whole app.
    └── shared                           // Directory for mock server for testing purpose.
```

#### Data Flow

- The application follows a Redux architecture for managing the state. Actions are dispatched from components, which trigger corresponding reducers to update the state. The updated state is then reflected in the UI using React's re-rendering mechanism.

### Testing

- Testing libraries/frameworks: Jest, React Testing Library
- Run tests using the command npm test or yarn test.
- The tests are structured into unit tests with reducers, covering different aspects of the application.
- Unit testing progress is still in the progress.

### Deployment

- To deploy the project to a server, follow these general steps:

  1.  Set up a hosting platform (e.g., Netlify, Vercel, AWS, etc.).
  2.  Configure the deployment settings, such as specifying the build command and environment variables.
  3.  Connect the hosting platform to the Git repository to enable automatic deployments based on commits or pull requests.
  4.  Trigger the deployment process, and the hosting platform will build and deploy the application.
