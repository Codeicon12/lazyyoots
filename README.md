# Lazy Yoots E-commerce Platform

A full-stack e-commerce application with admin panel for managing products and orders.

## Features

- **Admin Panel**: Manage products, categories, and orders
- **Shop Frontend**: Browse and purchase products
- **Authentication**: Secure admin login with JWT
- **File Uploads**: Product image management with security validation
- **Order Management**: Track and update order status
- **Security**: Rate limiting, CORS, helmet security headers, input sanitization, and file upload validation
- **Database**: Automated migrations for schema management
- **Logging**: Structured logging for debugging and monitoring
- **Configuration**: Environment variable validation

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Frontend**: HTML/CSS/JavaScript
- **Authentication**: JWT, bcrypt
- **File Uploads**: Multer

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd lazy-yoots
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your configuration:
   - `PORT`: Port to run the server on (default: 3000)
   - `NODE_ENV`: Environment (development/production)
   - `JWT_SECRET`: Secret key for JWT tokens
   - `ALLOWED_ORIGINS`: Comma-separated list of allowed origins

4. Start the application:
   ```bash
   npm start
   ```

   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

## Default Admin Credentials

- **Username**: admin
- **Password**: admin123

*Important: Change the default password after first login in production*

## API Endpoints

### Admin API (`/api/admin`)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/products` - Get all products (admin only)
- `POST /api/admin/products` - Add new product (admin only)
- `PUT /api/admin/products/:id` - Update product (admin only)
- `DELETE /api/admin/products/:id` - Delete product (admin only)
- `GET /api/admin/orders` - Get all orders (admin only)
- `PUT /api/admin/orders/:id` - Update order status (admin only)

### Shop API (`/api/shop`)
- `GET /api/shop/products` - Get all available products
- `GET /api/shop/products/:id` - Get product by ID
- `GET /api/shop/products/category/:category` - Get products by category
- `GET /api/shop/categories` - Get all categories
- `POST /api/shop/orders` - Create new order

### Other Endpoints
- `GET /health` - Health check endpoint
- `/uploads/` - Static file serving for product images

## Deployment

### Deploy to Heroku

1. Create a new Heroku app
2. Connect to your GitHub repository
3. Set environment variables in Heroku dashboard
4. Deploy the branch

### Deploy to Railway

1. Create a new Railway project
2. Connect to your GitHub repository
3. Set environment variables
4. Deploy

### Deploy to VPS

1. Clone the repository on your server
2. Install Node.js and dependencies
3. Set up environment variables
4. Use PM2 to run the application in production:
   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name "lazy-yoots"
   pm2 startup
   pm2 save
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Application Configuration
PORT=3000
NODE_ENV=production

# Security
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

## Database

The application uses SQLite for simplicity. The database file is created automatically as `backend/database.sqlite`.

## Security Features

- Rate limiting (100 requests per 15 minutes per IP)
- Helmet security headers
- Input validation and sanitization
- Password hashing with bcrypt
- JWT-based authentication
- CORS configuration
- File upload validation (type, size, extension)
- SQL injection prevention
- XSS prevention through input sanitization
- Environment variable validation

## File Uploads

Product images are stored in the `backend/uploads/` directory. Make sure this directory has write permissions.

## Improvements

This application has been enhanced with several improvements:

### Database Migrations
- Automated schema management through migration system
- Version-controlled database changes
- Proper initialization of tables and default data

### Error Handling and Logging
- Centralized error handling middleware
- Structured logging to files with rotation
- Detailed error information in development mode
- Secure error messages in production

### Environment Configuration
- Validation of required environment variables
- Proper handling of different environments (development, production, test)
- Secure configuration management

### Security Enhancements
- Input sanitization to prevent XSS attacks
- File upload validation (type, size, extension)
- SQL injection prevention
- Enhanced authentication and authorization

### API Documentation
- Comprehensive API documentation in `API.md`
- Clear request/response examples
- Error code explanations

## Running the Application

1. Make sure you have installed all dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Start the application:
   ```bash
   npm start
   ```
   Or for development:
   ```bash
   npm run dev
   ```

## Production Considerations

- Use a strong JWT secret
- Configure ALLOWED_ORIGINS to only include your frontend domains
- Set NODE_ENV to 'production'
- Use a reverse proxy like Nginx
- Implement proper logging
- Regular database backups
- Use PM2 or similar for process management

## Support

For support, please open an issue in the repository.