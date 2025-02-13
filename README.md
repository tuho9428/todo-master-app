# TodoMaster App

A full-stack Todo application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, task management, and a modern UI.

## Features

- 🔐 User Authentication (Register/Login)
- ✅ Create, Read, Update, Delete Todos
- 🎯 Mark tasks as complete/incomplete
- 💫 Modern and responsive UI
- 🔄 Real-time updates
- 🎨 Material-UI components

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)

## Environment Setup

1. Create a `.env` file in the `/server` directory with the following variables:

```env
MONGO_URI=`your_MONGO_URI_here`
JWT=`your_jwt_secret_here`
NODE_ENV=`your_NODE_ENV_here`
JWT_LIFETIME=1d
```

Note: Replace `your_jwt_secret_here` with a secure secret key for JWT token generation.

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/todo-master.git
cd todo-master
```

## Running the Application

To start both the server and client concurrently:

```bash
npm start
```

This command will:

- Install dependencies for both the server and client applications.
- Start the backend server on port 3000
- Start the frontend development server on port 5173
- Run both servers concurrently

The application will be available at:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

## Project Structure

```
todo-master/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── store/       # Redux store and slices
│   │   └── ...
├── server/              # Backend Node.js/Express application
│   ├── controllers/     # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── ...
└── package.json        # Project dependencies and scripts
```

## Available Scripts

In the project directory, you can run:

- `npm start` - Runs both client and server
- `npm run server` - Runs only the backend server
- `npm run client` - Runs only the frontend client
- `npm run install-all` - Installs dependencies for both client and server

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user

### Todos

- `GET /api/todos` - Get all todos for logged-in user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

### User

- `GET /api/user` - Get user information

## Technologies Used

### Frontend

- React
- Redux Toolkit
- Material-UI
- React Router
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the component library
- React-Hot-Toast for notifications
- Tailwind CSS for utility classes
