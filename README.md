

# CoursePlanner

CoursePlanner is a web application designed to help university students plan their courses for each semester in advance. The application consists of a Django-based backend and a React frontend, providing a seamless experience for students to organize their study plans effectively.

## Project Background Overview

CoursePlanner was created to address the need for university students to efficiently plan their courses for each semester. The goal is to help students stay organized, meet prerequisite requirements, and manage their academic workload effectively. This tool provides an easy-to-use interface that integrates seamlessly with university course catalogs, allowing students to make informed decisions when planning their studies. With a modern tech stack including Django and React, CoursePlanner ensures both backend reliability and a responsive frontend experience.

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

## Backend Startup Instructions

1. **If there is no `venv` folder**: Run `virtualenv venv` to create a virtual environment.
2. **Configure the environment**: Make sure to activate the virtual environment in the bottom right corner.
3. **Install dependencies**: Run `pip install -r requirements.txt`.
4. **Migrate the database**: Execute `python manage.py migrate` to import data into `db.sqlite`.
5. **Create an admin user**: Run `python manage.py createsuperuser` to set up an admin account.
6. **Start the backend server**: Use the command `python manage.py runserver 8001` to launch the backend on port 8001.
7. **Backend admin interface**: Access it at `127.0.0.1:8001/admin` with the username `admin` and password `123456`.
8. **API documentation**: Available at `127.0.0.1:8001/docs`.

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


## Change Logs

### v1.4.0 - Nov 3, 2024
**Added**
- Backend Connection for Search Page: Search page now connected to backend for real-time data access.
- Filter and Search Functionality: Completed filter and search features for search page.
- Subject Display: Added display of subject details on the main page.
- Component Integration: Merged new components for enhanced UI coherence.
- Redux State Management: Finalized interaction with Redux to manage state.

### v1.3.1 - Nov 2, 2024
**Added**
- Button UI Completion: Finished button UI with styling for consistency.

### v1.3.0 - Nov 1, 2024
**Added**
- Main Page Button: Added button to main page for eligibility and enrollment options.
- Eligibility & Enrollment Button: Implemented basic eligibility and enrollment button functionality.

### v1.2.0 - Oct 31, 2024
**Added**
- Checklist Animation: Added expand and collapse animations for checklists.
- Information Redirect Button: Button now redirects users to an external URL for more information.

### v1.1.1 - Oct 30, 2024
**Added**
- Dynamic Search Cards: Created dynamic search cards with complete UI for responsive interactions.
- Collapsible Checklist: Added collapsible checklist for organized display.
- Campus Filter: Enhanced filtering with campus-specific options.
- Hover Animation: Added hover animation to "Add Subject" button.
- Close Button Animation: Close button now features hover effects and animations.
- Return Button: Button added to allow return to main page.

### v1.1.0 - Oct 29, 2024
**Added**
- Basic Checklist: Introduced basic checklist for easier task management.
- Subject Card Linking: Added subject card that links to search page.

### v1.0.3 - Oct 28, 2024
**Added**
- Filter Feature: Added filter option for better search functionality.

### v1.0.2 - Oct 27, 2024
**Added**
- Search Page Prototype: Completed search page prototype, prepared for backend linkage.
**Completed**
- Full integration of the React frontend with the Django backend.
**Synchronized**
- Frontend and backend communication for seamless data flow.
**Enhanced**
- User interface to interact with the backend for course searches and updates.

### v1.0.1 - Oct 26, 2024
**Added**
- Checklist Feature: Introduced checklist component for organized task tracking.
**Integrated**
- The search module with course addition and update interfaces.
**Added**
- API endpoints to support adding and modifying course data.
**Refined**
- Backend processes to handle course data efficiently and ensure smooth updates.

### v1.0.0 - Oct 8, 2024
**Added**
- Footer Component: Footer completed with essential links and information.
- Subheader Component: Completed subheader for improved navigation.
**Developed**
- Backend module for course search using basic CRUD operations.
**Implemented**
- Simple endpoints for querying course data.
**Tested**
- Initial functionality to ensure accurate search results.
**Major Release**
- Full implementation of course planning and management features.
- Integrated React frontend with Django backend for seamless data handling.
- Added advanced course search and filter functionality.
- Implemented course eligibility check to verify prerequisites before selection.
- Improved UI/UX design for better user interaction, including responsive design.
- Full documentation added for both API and user guide.
**New Features**
- Admin dashboard for course and user management.
- Backend integration with API documentation available at `/docs`.

### v0.7.0 - Oct 5, 2024
**New Features**
- Introduced the search and filter functionality in the backend.
- Added support for dynamic routing with React Router.
- Enhanced course data model to include semester and course level attributes.
**Improvements**
- Optimized frontend build using Vite for faster loading times.
- Refined database migration scripts to streamline setup.
**Bug Fixes**
- Fixed issue with course data not rendering properly on the frontend.
**Known Issues**
- The search filter does not auto-refresh; manual page refresh required.
- Minor layout issues on smaller mobile screens.

### v0.3.0 - Sep 19, 2024
**Initial Implementation**
- Set up the basic project structure with Django for the backend and React for the frontend.
- Configured ESLint for code quality checks and Tailwind CSS for styling.
- Initial course planning interface created with basic add and remove functionality.
**Features**
- Frontend prototype completed.
- Basic backend API endpoints for course data retrieval.
**Bug Fixes**
- Fixed initial setup issues related to dependency installation.
**Limitations**
- Basic search functionality implemented but lacks advanced filtering options.
- No course eligibility checks at this stage.


## Key Algorithm

### Course Eligibility Check Algorithm
The course eligibility check algorithm ensures that students meet all prerequisites before adding a course to their plan. The algorithm works as follows:
1. **Input**: Course code and the list of completed courses.
2. **Process**:
   - Retrieve the prerequisites for the selected course from the database.
   - Compare the prerequisites with the list of completed courses.
3. **Output**: A boolean value indicating whether the student is eligible to enroll in the course.
4. **Complexity**: The algorithm runs in O(n) time, where n is the number of prerequisites.

### Search and Filter Algorithm
The search and filter algorithm allows users to find courses based on keywords and semester availability:
1. **Input**: Keywords and filter criteria (e.g., semester, course level).
2. **Process**:
   - Search the course database using a case-insensitive match for the provided keywords.
   - Filter the results based on selected criteria.
3. **Output**: A list of courses that match the search and filter conditions.
4. **Complexity**: The algorithm runs in O(m * log(m)) time, where m is the number of courses.


## Description of Key Classes and the Application's Layers

### 1. Application Layers Overview
The application is organized into a multi-layered architecture to separate concerns and enhance maintainability. The main layers include:

- **Presentation Layer**: Handles user interaction and displays data (e.g., React components).
- **Business Logic Layer**: Contains the core logic for course planning and eligibility checks (e.g., Python classes in the Django views).
- **Data Access Layer**: Manages communication with the database and data retrieval (e.g., Django models).
- **API Layer**: Facilitates communication between the frontend and backend through RESTful API endpoints (e.g., Django REST framework views and serializers).

### 2. Key Classes

#### a. `Course`
- **Location**: `blog/models.py`
- **Description**: Represents a university course with attributes such as `course_code`, `title`, `credits`, and `prerequisites`.
- **Responsibilities**:
  - Defines the structure of the course data in the database.
  - Establishes relationships with other classes (e.g., prerequisites).
- **Methods**:
  - `get_prerequisites()`: Returns a list of prerequisites for the course.

#### b. `CourseSerializer`
- **Location**: `blog/serializers.py`
- **Description**: Converts `Course` model instances to JSON format and vice versa.
- **Responsibilities**:
  - Ensures data is correctly formatted when sent to and from the API.
  - Handles data validation for incoming requests.

#### c. `CourseViewSet`
- **Location**: `blog/views.py`
- **Description**: Provides endpoints for the frontend to interact with course data.
- **Responsibilities**:
  - Implements CRUD operations for course management.
  - Manages filter and search functionalities.
- **Methods**:
  - `list()`: Retrieves a list of courses based on filters.
  - `retrieve()`: Fetches details of a specific course.

### 3. Frontend Components

#### a. `CourseList`
- **Location**: `handbook-ui-react/src/components/CourseList.jsx`
- **Description**: Displays a list of courses with search and filter options.
- **Responsibilities**:
  - Renders course data received from the backend.
  - Integrates with the Redux store for state management.

#### b. `CourseDetails`
- **Location**: `handbook-ui-react/src/components/CourseDetails.jsx`
- **Description**: Shows detailed information for a selected course.
- **Responsibilities**:
  - Provides an interface for students to view course details and prerequisites.

### 4. Layer Interactions
- **Frontend and API Layer**: The React frontend interacts with the API layer through HTTP requests, fetching course data and submitting user inputs.
- **API and Business Logic Layer**: The API layer calls the business logic layer to handle complex operations like course eligibility checks.
- **Business Logic and Data Access Layer**: The business logic layer interacts with the data access layer to query and update the database using Django models.


## Detected Bugs

- **Course search does not update in real-time**: The course search filter needs a manual page refresh to display updated results.
- **Login page styling issue on smaller screens**: Elements are overlapping on devices with a screen width below 400px.
- **API documentation link issue**: The `/docs` endpoint sometimes returns a 404 error due to incorrect routing configuration.

## Traceability Matrix

The following traceability matrix outlines the relationship between user stories and their corresponding test cases to ensure that all functionalities are adequately tested and verified.

| User Story ID | User Story Description |
|---------------|------------------------|
| US1           | As a user, I want to select my study type before I start planning my course |
| US2           | As a user, I want to log in to the system using the Unimelb account |
| US3           | As a user, I want to be informed of important information before planning my course |
| US4           | As a user, I want to filter and search for subjects |
| US5           | As a user, I want to check if my selected subjects break the course rules |
| US6           | As a user, I want to add changes to my course plan when planning |
| US7           | As a user, I want to go directly to enrolment after planning my course |
| US8           | As a user, I want to view prerequisites for each subject |
| US9           | As a user, I want to receive suggestions based on my previous choices |
| US10          | As a user, I want to export my course plan as a PDF |
| US11          | As a user, I want to compare different course plans side by side |
| US12          | As a user, I want to manage the list of available courses and view other students' lesson plans and reviews |
| US13          | As a user, I want to receive regular reminders and updates about my course selections |
| US14          | As an administrator, I want to import existing course planning templates for students |
| US15          | As an administrator, I want to add and remove subjects in the database |

| Test Case ID | Test Case Description |
|--------------|-----------------------|
| TC1          | Verify that the user can select their study type and save the information to display relevant course options |
| TC2          | Verify that the user can log in with their Unimelb account and retain study plan progress upon re-login |
| TC3          | Verify that the user is informed of all necessary details before proceeding with course planning |
| TC4          | Verify that the user can filter and search for subjects based on criteria (e.g., subject level, field of study) |
| TC5          | Verify that the system flags rule violations in the selected study plan |
| TC6          | Verify that the user can modify their study plan by adding or removing subjects |
| TC7          | Verify that the system redirects the user to the enrolment page after completing their study plan |
| TC8          | Verify that the system displays prerequisites for each selected subject |
| TC9          | Verify that the system provides course suggestions based on the user's prior selections |
| TC10         | Verify that the user can export their course plan as a PDF |
| TC11         | Verify that the system allows users to view and compare multiple course plans side by side |
| TC12         | Verify that the user can view the list of courses and access other students' lesson plans and reviews |
| TC13         | Verify that the user receives timely reminders and updates regarding course selections |
| TC14         | Verify that administrators can import course planning templates for student reference |
| TC15         | Verify that administrators can add and remove courses in the database to keep course options updated |

## Description of Database Structure

This section provides an overview of the database used in the project, detailing the purpose of each component and the transitions made during the development process.

### Database Overview
Initially, the local environment for project development and deployment was based on **MySQL**, which provided a robust relational database structure ideal for maintaining data integrity and managing complex relationships. While MySQL was effective, certain limitations became apparent as the project evolved, particularly related to data portability and handover capabilities in a local development context. We found that Django's built-in mechanisms for simpler data storage were well-suited for our needs at this stage.

To enhance development efficiency and facilitate better collaboration among team members, we opted to replace **MySQL** with a set of **CSV files** for the local development environment. These CSV files now function as the database, integrated with Django for local testing. This shift has provided greater flexibility, allowing team members to easily share data and streamline the development and handover processes.

### Description of Each CSV File

- **`courses_structure.csv`**: This file holds data on the structure of each course, detailing requirements, compulsory subjects, and elective subjects. It aids in understanding the learning paths and academic requirements for various courses.
- **`majors_minors_structure.csv`**: Contains data on the structure of each major or minor, including compulsory and elective course codes. This file is key for outlining the specific structure of majors and minors.
- **`courses_info.csv`**: Includes detailed information for each course, such as the course name, code, location, duration, credit points, and a link to the course page. This file is essential for displaying comprehensive course details.
- **`subject_info.csv`**: Stores data related to individual subjects within courses, including subject name, code, primary details, credit points, and URLs. It is crucial for presenting detailed subject-level information.
- **`subject_eligibility.csv`**: Holds eligibility criteria for subjects, covering prerequisites, corequisites, and non-allowed subjects. The fields include subject code, prerequisites, corequisites, and non-allowed subjects. This file is essential for determining if a student meets the enrollment criteria for specific subjects.
- **`course_majors_minors_specialisations.csv`**: Contains details about the majors, minors, and specializations associated with specific courses, including course code, specialization name, and URLs for more information. This file aids in showcasing and navigating different academic focus areas within courses.

### Benefits of Using CSV Files
Switching to **CSV files** has streamlined the development process, making it especially suitable for a distributed team that needs rapid iteration and straightforward data access. This approach has been effective for local development, ensuring a smooth workflow while maintaining the flexibility needed for future scalability and handover planning.
