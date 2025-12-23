const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { globalErrorHandler } = require('./utils/errorHandler');
const ConfigValidator = require('./utils/config');

// Validate configuration before starting the app
ConfigValidator.validate();

const app = express();
const PORT = ConfigValidator.getPort();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:", "http:"],
      scriptSrc: ["'self'", "https:", "http:"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      connectSrc: ["'self'", "https:", "http:"]
    },
  },
})); // Sets security headers

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use('/api/', limiter); // Apply rate limiting to API routes

// Enable CORS for all routes
app.use(cors({
  origin: ConfigValidator.getAllowedOrigins(),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

// Additional security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from the root directory (for HTML files)
app.use(express.static(path.join(__dirname, '..')));

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/shop', (req, res) => {
  res.sendFile(path.join(__dirname, '../shop.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin.html'));
});

// API Routes
app.use('/api/admin', adminRoutes);  // Admin routes with authentication
app.use('/api/shop', shopRoutes);    // Shop routes (public access)

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handling middleware (should be last)
app.use(globalErrorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Admin API available at: http://localhost:${PORT}/api/admin`);
  console.log(`Shop API available at: http://localhost:${PORT}/api/shop`);
});

module.exports = server;