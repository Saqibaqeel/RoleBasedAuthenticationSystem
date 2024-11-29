# Role-Based Access Control (RBAC)

## Project Overview

The **RoleBaedAuthenticationSystem** project is a web application designed to manage and display security-related listings. Users can view, create, edit, and delete listings based on their role. The project includes a **User Authentication System** using **JWT (JSON Web Tokens)**, which provides secure access to certain routes and actions within the application.

In this project, users are classified into two roles:
1. **User** - Can view listings and create new ones.
2. **Admin** - Has additional permissions to edit and delete listings.

The project follows the basic principles of **role-based access control (RBAC)**, where the permissions granted to the users depend on their role (either User or Admin).

### Features:
- **JWT Authentication**: The app uses JWT tokens for secure authentication and user authorization.
- **Role-Based Access**: The app differentiates between users and admins, allowing admins to perform additional actions like editing or deleting listings.
- **CRUD Operations for Listings**: Users and admins can create, read, update, and delete listings.

### Technologies Used:
- **Node.js** - Server-side JavaScript runtime.
- **Express.js** - Web framework for Node.js to build the API and routes.
- **MongoDB** - NoSQL database for storing listing data.
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB, used to interact with the database.
- **JWT (JSON Web Tokens)** - For user authentication and authorization.
- **EJS** - Templating engine to render views on the client side.
- **Bootstrap** - Frontend framework for styling the application.

### Key Features:
1. **User Registration & Login**: Users can sign up, log in, and receive a JWT token for authentication.
2. **Listings Management**: Admins can edit and delete listings, while regular users can only create and view them.
3. **Role-Based Permissions**: Routes are protected and only accessible based on the user's role. Admins can perform administrative tasks, while regular users can only interact with their listings.
4. **Custom Error Handling**: The application includes a custom error handler that catches and formats errors for better debugging. If a user tries to access a restricted route, a **403 Forbidden** error is thrown.

### Future Enhancements:
- **Joi Validation**: 
  - The application will later implement **Joi validation** for request data (e.g., listing titles, descriptions, and prices) to ensure data integrity and improve error handling. 
  - Currently, due to time constraints and some bugs that need fixing, Joi validation has not yet been added but will be incorporated in future versions of the application.


