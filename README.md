# Synchrnonize Ecommerce

Synchronize project is a merchandise ecommerce where will be the base for selling fashion, jellewry products for Synchronize Recording Studio.

The demo version is currently using the [fakestoreapi](https://fakestoreapi.com/) for placing the products in needed places with tech-stack for front-end included: TypeScript, React, React Router, Framer Motion, and tailwind.

Checkout the demo deployment via [Synchronize](https://synchronize-ecommerce-fcsi-7z3b0x6xc.vercel.app/)

## Table of Contents

- Introduction
- Table of Contents
- Getting Started

  - Prerequisites
  - Installation
  - Setting up the Environment

- Features
- Architecture & Design

  - Folder Structure
  - Data Flow
  - Component Structure

- Testing
- Deployment
- Contributing

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

- Git command: Git clone https://github.com/tripplen23/synchronize-ecommerce.git
- Navigate to the project directory: cd fs17-Frontend-project.
- Install the project dependencies: npm i or yarn.

### Scripts

- Start the development server: npm start or yarn start
- Build the production-ready bundle: npm run build or yarn build
- Run the tests: npm test or yarn test

## Features

- User authentication. (Optimize for Google login needed)

![alt text](./readmeImg/image.png)

- Categories, sort product by price, product detail.

![alt text](./readmeImg/image-1.png)
![alt text](./readmeImg/image-2.png)

- Shopping cart

![alt text](./readmeImg/image-3.png)
![alt text](./readmeImg/image-4.png)

- Admin dashboard

![alt text](./readmeImg/image-5.png)

## Architecture & Design

### Folder Structure

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

### Data Flow

- The main logic of the app is implemented in the slice files (for example: productSlice, cartSlice, authSlice, etc). The slice files are connected to the service files (for example: productService, cartService and authService, etc) which play the role as the bridges between the API and the redux store. The redux store after being processed all the logic with the API will be implemented in the application through the the hooks of useAppSelector for selecting the state and the useAppDispatch for triggering the state to the redux store.

![alt text](./readmeImg/image-6.png)

## Testing

- Testing libraries/frameworks: Jest, React Testing Library
- Run tests using the command npm test or yarn test.
- The tests are structured into unit tests with reducers, covering different aspects of the application.
- For further development, this is neccessary to implement more test cases.

## Deployment

- To deploy the project to a server, follow these general steps:

  1.  Set up a hosting platform (e.g., Netlify, Vercel, AWS, etc.).
  2.  Configure the deployment settings, such as specifying the build command and environment variables.
  3.  Connect the hosting platform to the Git repository to enable automatic deployments based on commits or pull requests.
  4.  Trigger the deployment process, and the hosting platform will build and deploy the application.
