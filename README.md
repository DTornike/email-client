# Client Project README

## Overview
This is the client-side project for the email management application. The project is built using React, TypeScript, Vite, and Material UI, providing a modern and responsive user interface for managing emails.

## Prerequisites
To run this project locally, you need to have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

### 1. Clone the Repository
First, clone the repository to your local machine:

```sh
git clone <repository-url>
```

Replace `<repository-url>` with the actual URL of the repository.

### 2. Navigate to the Project Directory
Change into the project directory:

```sh
cd email_client
```

### 3. Install Dependencies
Install the project dependencies using npm or yarn:

```sh
# Using npm
npm install

# Or using yarn
yarn install
```

### 4. Configure Environment Variables
Create a `.env` file in the root of the project to configure the required environment variables. Here is an example of what the `.env` file might look like:

```env
VITE_API_URL=http://127.0.0.1:8000/api
VITE_IMAGE_URL=http://127.0.0.1:8000
```

### 5. Run the Project
Start the development server:

```sh
# Using npm
npm run dev

# Or using yarn
yarn dev
```

The project should now be running locally at [http://localhost:5173/](http://localhost:5173/).

### 6. Build for Production
To build the project for production, run:

```sh
# Using npm
npm run build

# Or using yarn
yarn build
```

This will create a production-ready build in the `dist` folder.

### 7. Preview Production Build
To preview the production build locally, run:

```sh
# Using npm
npm run preview

# Or using yarn
yarn preview
```

## Available Scripts
- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the project for production.

## Folder Structure
- **`src/`**: Contains the source code for the project.
    - **`components/`**: Reusable UI components.
    - **`features/`**: Feature-specific components like `ViewEmailModal` and `AttachmentPreview`.
    - **`pages/`**: Different pages of the application.
    - **`services/`**: API service methods.
    - **`models/`**: TypeScript types and interfaces used in the project.
    - **`utils/`**: Utils such as store/hooks/helpers.

## Important Notes
- Ensure that the backend API is up and running before starting the client, and that the `VITE_API_URL` in your `.env` file points to the correct API endpoint.
- The project uses [Vite](https://vitejs.dev/) as the build tool for faster builds and Hot Module Replacement (HMR).

## License
This project is licensed under the MIT License.

