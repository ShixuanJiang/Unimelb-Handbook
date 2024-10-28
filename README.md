# Unimelb-UpdatingHandbook-CoursePlanner

The Handbook CoursePlanner is a web application designed to help university students plan their courses for each semester in advance. The application consists of a Django-based backend and a React frontend, providing a seamless experience for students to organize their study plans effectively.

## Project Structure

### Root Directory
- `.gitignore`: Specifies files and directories to ignore in version control (e.g., `node_modules`, logs).
- `eslint.config.js`: ESLint configuration for code quality checks, including React and Hooks plugins.
- `index.html`: Entry point for the React application, defining the basic structure of the HTML page.
- `package.json`: Lists dependencies, scripts, and metadata for the project.
- `postcss.config.js`: Configures PostCSS with Tailwind CSS and Autoprefixer.
- `tailwind.config.js`: Tailwind CSS configuration file for customizing themes, fonts, and colors.
- `vite.config.js`: Vite configuration for fast development and build optimization.

### `blog/` - Backend
The `blog` directory contains the Django backend that manages course data and handles API requests.

- **Models**: Define the data structure for courses and student course plans.
- **Serializers**: Convert data between Django models and JSON format.
- **Views**: Handle the logic for managing courses and provide endpoints for the frontend.
- **Filters**: Implement search and filter functionalities for course data.
- **URL Configuration**: Define routes for accessing backend services.

### `handbook-ui-react/` - Frontend
The `handbook-ui-react` directory houses the React frontend, where students can interact with the CoursePlanner interface to manage their course selections.

- **`src/App.css`**: Defines global styles for the application, such as header and footer layouts.
- **`src/App.jsx`**: Main React component that sets up routing for the app's pages.
- **`src/index.css`**: Includes base styles and integrates Tailwind CSS.
- **`src/main.jsx`**: Entry point for React, rendering the `App` component into the root DOM element.
- **`src/subjects.json`**: Contains sample course data for use within the application.

### Additional Directories
- **`django_introduction/`**: Main Django project folder, includes settings, routing, and deployment configurations.

## Features

1. **Plan Courses**: Students can plan and organize their courses for upcoming semesters.
2. **Modern Frontend Development**: Utilizes React and Vite for a fast and responsive user interface.
3. **Tailwind CSS**: Simplifies styling with utility-first CSS, ensuring a clean and consistent design.
4. **Code Quality**: Integrated with ESLint for maintaining clean and readable code.
5. **Dynamic Routing**: Manages multiple pages through React Router, providing seamless navigation.
6. **Django Integration**: Backend services are handled through a connected Django application, providing data management and API endpoints.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or above)
- npm (v6 or above)
- Python (v3.10 or above for Django)

### Installation

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd CoursePlanner
    ```

2. **Install Node.js dependencies**:
    ```bash
    npm install
    ```

3. **Set up the Django backend**:
    ```bash
    cd django_introduction
    python -m venv venv
    source venv/bin/activate # On Windows, use `venv\Scripts\activate`
    pip install -r requirements.txt
    python manage.py migrate
    ```

4. **Run the development servers**:
    - **Frontend**:
        ```bash
        npm run dev
        ```
    - **Backend**:
        ```bash
        python manage.py runserver
        ```

5. **Access the app**:
   Open `http://localhost:3000` for the React frontend.
   The Django backend will be available on `http://localhost:8000`.

## Scripts

- **`npm run dev`**: Runs the React development server.
- **`npm run build`**: Builds the React project for production.
- **`npm run lint`**: Runs ESLint for code quality checks.
- **`python manage.py runserver`**: Starts the Django backend server.

## Project Configuration

### ESLint
The project uses ESLint to enforce coding standards, ensuring consistency throughout the codebase. The configuration is set up to handle React components, Hooks, and standard JavaScript code.

### Tailwind CSS
Tailwind CSS is configured to customize themes and utility classes, providing a flexible and scalable styling solution.

### Django Integration
The backend services are managed via Django, including models, views, and API endpoints for handling course data. Ensure that the backend is running to interact with the frontend.

## Contributing

Contributions are welcome! Please create a new branch for each feature or bug fix and open a pull request with a detailed description of changes.

## License

This project is licensed under the MIT License. See `LICENSE` for more details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Django](https://www.djangoproject.com/)
