# VRV Security Assesment

A web application for managing listings with authentication, user roles, and Admin rroles.

## Features

- **Listings Management**: Users can view and add listings. Admins can manage all listings.
- **User Roles**: There are two types of users:
  - **User**: Can create and view listings, but can only edit/delete their own listings.
  - **Admin**: Has full control over all listings (can edit, delete, and create listings for any user).
- **Authentication**: Users need to register and login to access certain features like creating listings. JWT (JSON Web Token) is used for authentication.
  
## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building the server and API routes.
- **MongoDB**: Database to store user and listing information.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **EJS**: Templating engine to render dynamic HTML pages.
- **JWT (JSON Web Token)**: Used for handling user authentication and managing sessions.
- **Flash Messages**: For displaying notifications such as success or error messages.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/vrvSecurity.git
##note I will  implement joi validation latter due to getting error when i add validation
