# Library Management System

## Overview
This project is a **Library Management System** built with a backend powered by Symfony (PHP) and a frontend using React (JavaScript/TypeScript). The system enables users to manage books, handle reservations, and perform administrative tasks.
Website is deployed on https://flulibrary.netlify.app/ but backend is not deployed, you can run the project locally following the instructions below.

## Features
- **Book Management**: Add, update, and remove books.
- **User Reservations**: Users can reserve books and cancel reservations.
- **Authentication**: Login and user management.
- **RESTful API**: Backend provides a REST API for frontend consumption.
- **Entity Relations**: Books and reservations are linked through a relational database.

## Tech Stack

### Frontend
- **React**
- **TypeScript**
- **Tailwind CSS**
- 
### Needed for Backend
- **Symfony Framework**
- **Doctrine ORM**
- **PHP**
- **PostgreSQL**
- **Composer**
- **Symfony CLI**

## Installation

### Prerequisites
- PHP 8.1 or higher
- Composer
- Node.js
- PostgreSQL
- Symfony CLI

### Setup
1. **Clone the Repositories**:
   Frontend:
   ```bash
   git clone <repository-url>
   cd library-management-frontend
   ```

   Backend:
   ```bash
   git clone <repository-url>
   cd library-management
   ```

1. **Install Backend Dependencies**:
   ```bash
   composer install
   ```

2. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install install
   ```

3. **Configure Environment Variables**:
   - Set database connection details in `.env` if using .env:
     ```env
     DATABASE_URL="postgresql://username:password@127.0.0.1:5432/api"
     ```

4. **Run Database Migrations**:
   ```bash
   php bin/console doctrine:migrations:migrate
   ```

5. **Start the Backend Server**:
   ```bash
   symfony serve
   ```

6. **Start the Frontend Server**:
   ```bash
   cd frontend
   yarn start
   ```

## Known Issues
- Ensure route paths match exactly between frontend and backend.
- Handle potential CORS issues by configuring Symfony appropriately.

## License
This project is licensed under the MIT License. See `LICENSE` for details.
