
## Progress Log

### Initial Setup

✅ **Created `server.js` in the `/src` folder**: This is where the server is initialized and started.

✅ **Updated `package.json`**: Configured `nodemon` to spin up on `server.js`.

### Application Structure

✅ **Created `app` folder**: Contains the main application logic, including routes and other crucial components.

✅ **Created `router` folder**: Defines all the routes.

✅ **Created `controller` folder**: Contains all the controller functions.

✅ **Created `model` folder**: Defines the user schema and model.

### Middleware and Error Handling

✅ **Updated `app` folder**: Added an error handler middleware to handle all errors.

✅ **Installed `morgan`**: Logs incoming requests and added it to the middleware.

✅ **Added `xss-clean` package**: Filters XSS requests (note: this package is out of date).

✅ **Added `express-rate-limit`**: Limits the number of requests that can be sent in a particular time frame.

✅ **Added `http-errors`**: Generates and handles HTTP errors.

✅ **Added `dotenv`**: Manages environment variables.

### Environment Configuration

✅ **Created `.env` file**: Stores crucial details like MongoDB connection string.

✅ **Created `secret.js` in `src`**: Manages the `.env` file and makes the data available to all project files.

### Database Configuration

✅ **Created `config/db.js` in `src`**: Manages the connection to the database using Mongoose and calls the function in `app.js`.

### Routes and Services

✅ **Added `getUser` route**: Includes pagination, search, and limiting functionality.

✅ **Added `getUserById` service**: Created a route to get a particular user by ID.

