# Todo List Application

This is a full-stack Todo List application built with a Ruby on Rails backend (`todo_api`) and a React frontend (`todo_client`). 

## Project Structure

- **todo_api**: The backend Rails API application.
- **todo_client**: The frontend React application.

## Backend (`todo_api`)

### Models
- `Todo`: Represents a todo item with attributes `title`, `description`, and `is_completed`.

### Controllers
- `Api::V1::TodosController`: Manages CRUD operations for todos.

### Tests
- Uses RSpec for testing.
- Request specs cover API endpoints for creating, updating, deleting, and fetching todos.

### Setup

1. **Install Dependencies**:
    ```sh
    bundle install
    ```

2. **Database Setup**:
    ```sh
    rails db:create
    rails db:migrate
    ```

3. **Run Tests**:
    ```sh
    rspec
    ```

4. **Start the Server**:
    ```sh
    rails server
    ```

## Frontend (`todo_client`)

This project is a modern web application built using Vite, React, and TypeScript. It leverages various technologies and tools to provide a fast and efficient development experience.

## Technologies Used

- **Vite**: A build tool that provides a fast development environment.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Material-UI (MUI)**: A popular React UI framework for building user interfaces.
- **React Hot Toast**: A toast notification library for React.
- **Prettier**: A code formatter to ensure consistent code style.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (version 14.x or later)
- npm (version 6.x or later)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables. Use the provided `.env.example` file as a reference.

### Running the Project Locally

1. Start the development server:
   ```sh
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` to see the application running.

### Building the Project

To build the project for production, run:
```sh
npm run build
```

The build artifacts will be stored in the `dist` directory.

## Project Structure

Here is an overview of the project structure:

```
.
├── public/                 # Public assets
├── src/                    # Source files
│   ├── components/         # React components
│   ├── context/            # Context providers
│   ├── hooks/              # Custom hooks
│   ├── styles/             # CSS and Tailwind styles
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main application component
│   ├── index.tsx           # Entry point
│   └── ...
├── .env                    # Environment variables
├── .eslintrc.cjs           # ESLint configuration
├── .prettierrc             # Prettier configuration
├── index.html              # HTML template
├── package.json            # npm configuration
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # TypeScript configuration for node
└── vite.config.ts          # Vite configuration
```

## React Components

### `src/components`

- **DeleteConfirmationModal.tsx**: A modal that appears to confirm the deletion of a to-do item.
- **Filters.tsx**: Provides filtering options for the to-do list.
- **TodoComponent.tsx**: The main component that includes the form, filters, and to-do list.
- **TodoForm.tsx**: A form for adding and editing to-do items.
- **TodoMenu.tsx**: A menu with options to edit or delete a to-do item.
- **TodoTable.tsx**: Displays the list of to-do items in a table format.

### `src/context`

- **TodoContext.tsx**: Provides the context for managing to-do items and their state.

### `src/hooks`

- **useTodos.ts**: Custom hook for managing the to-do list's state and actions.

### `src/App.tsx`

The main application component that sets up the routes and renders the page components.
