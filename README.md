Library Management System

Overview

This project is a Library Management System built with a backend powered by Symfony (PHP) and a frontend using React (JavaScript/TypeScript). The system enables users to manage books, handle reservations, and perform administrative tasks.

Features

Book Management: Add, update, and remove books.

User Reservations: Users can reserve books and cancel reservations.

Authentication: Login and user management.

RESTful API: Backend provides a REST API for frontend consumption.

Entity Relations: Books and reservations are linked through a relational database.

Tech Stack

Backend

Symfony Framework: Used for handling routes, controllers, and database interactions.

Doctrine ORM: Used for database interactions with entities like Book and Reservation.

PHP: Programming language for the backend.

Frontend

React: For building the user interface.

TypeScript

Tailwind CSS

PostgreSQL

Composer:

Yarn

Symfony CLI

PHP 8.1 or higher

Composer

Node.js and Yarn

PostgreSQL

Symfony CLI


Setup

Install Backend Dependencies:

composer install

Install Frontend Dependencies:

cd frontend
yarn install


Set database connection details in .env:

DATABASE_URL="postgresql://username:password@127.0.0.1:5432/api"

Run Database Migrations:

php bin/console doctrine:migrations:migrate

Start the Backend Server:

symfony serve

Start the Frontend Server:

cd frontend
yarn start

Debugging Tips

Use php bin/console debug:router to verify route registration.

Check the Symfony profiler at /api/_profiler for request/response details.

Contributing

Fork the repository.

Create a feature branch: git checkout -b feature/your-feature-name

Commit changes: git commit -m 'Add your feature'

Push to branch: git push origin feature/your-feature-name

Open a pull request.

License

This project is licensed under the MIT License. See LICENSE for details.
