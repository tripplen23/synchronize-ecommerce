# Frontend project

This repository for the Frontend project to build an e-commerce website.

## Requirements

### Basic requirements

The Front end project must use TypeScript and Redux toolkit.

1. Use the API endpoint `https://fakestoreapi.com/`.

2. Create at lease 4 pages (can be more if you want): Page for all products, product page, profile page (only available if user logins), and cart page (cart page could be a page or a modal)

3. Create Redux store for following features:

   - product reducer: get all products, find a single products, filter products by categories, sort products by price. Create, update and delete a product (enable update & delete features only for admin of the webapp)
   - user reducer: register and login
   - cart reducer: add product to cart, remove products, update products's quantity in cart

4. When adding routers to your application, set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.

5. Styling: must have responsive

6. Implement unit testing for the reducers

7. **Deploy** the application and rewrite README file.

### Additional features:

- Use Context API to switch theme
- Use pagination when fetching/displaying all the products
- Implement performance optimization where applicable

## Grading (1-5)

1: Late submission or not complete basic requirements

2: Basic requirement + Presentation

3: Folder structure + follow convention(naming convention ,loading, error) + some additional features

4: All additional features + reusable logic + custom hook

5: UI-UX (for example: send alert when user add same product) + styling (animation or transition, scroll to top) + advanced feature (google log in)

## Deadline

- Presentation: **7/3** and **8/3/ 2024**
- Submitting Front-end project **10am 8/3/2024**
