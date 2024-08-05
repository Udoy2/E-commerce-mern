# E-commerce mern

A mern application

## Project Structure

The project is organized as follows:

- **src**
  - **server.js**: Initializes and starts the server.
  - **app**: Contains the main application logic.
    - **router**: Defines all the routes.
    - **controller**: Contains all the controller functions.
    - **model**: Defines the user schema and model.
  - **config**
    - **db.js**: Manages the database connection using Mongoose.
  - **middleware**
    - **errorHandler.js**: Handles all the errors.
- **.env**: Stores crucial environment variables like MongoDB connection string.
- **secret.js**: Manages the .env file and makes the data available to all project files.

## Setup Instructions

1. **Install Dependencies**: Run `npm install` to install the required packages.
2. **Start the Server**: Use `npm run dev` to start the server with nodemon.

## Key Packages Used

- **morgan**: Logs incoming requests.
- **xss-clean**: Filters XSS requests (note: this package is out of date).
- **express-rate-limit**: Limits the number of requests that can be sent in a particular time frame.
- **http-errors**: Generates and handles HTTP errors.
- **dotenv**: Manages environment variables.

## Routes

- **GET /users**: Retrieves users with pagination, search, and limiting functionality.
- **GET /users/:id**: Retrieves a particular user by ID.

## Environment Variables

Make sure to set the following variables in the `.env` file:

- `MONGODB_URI`: Your MongoDB connection string.

---

